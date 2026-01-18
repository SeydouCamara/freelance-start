"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { QuestionnaireState, QuestionnaireResponses } from "./types";
import { questions, getVisibleQuestions } from "@/data/questions";

// Initial state
const initialResponses: QuestionnaireResponses = {
  hasMission: null,
  hasStructure: null,
  currentSituation: null,
  wantsKeepARE: null,
  expectedRevenue: null,
  expenseLevel: null,
};

const initialState: QuestionnaireState = {
  currentStep: 0,
  responses: initialResponses,
  direction: 1,
  isComplete: false,
};

// Actions
type Action =
  | { type: "SET_RESPONSE"; field: keyof QuestionnaireResponses; value: unknown }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; step: number }
  | { type: "RESET" }
  | { type: "COMPLETE" }
  | { type: "LOAD_STATE"; state: QuestionnaireState };

// Reducer
function questionnaireReducer(
  state: QuestionnaireState,
  action: Action
): QuestionnaireState {
  switch (action.type) {
    case "SET_RESPONSE":
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.field]: action.value,
        },
      };

    case "NEXT_STEP": {
      const visibleQuestions = getVisibleQuestions(state.responses);
      const nextStep = Math.min(state.currentStep + 1, visibleQuestions.length);
      const isComplete = nextStep >= visibleQuestions.length;
      return {
        ...state,
        currentStep: nextStep,
        direction: 1,
        isComplete,
      };
    }

    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
        direction: -1,
        isComplete: false,
      };

    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: action.step,
        direction: action.step > state.currentStep ? 1 : -1,
        isComplete: false,
      };

    case "RESET":
      return initialState;

    case "COMPLETE":
      return {
        ...state,
        isComplete: true,
      };

    case "LOAD_STATE":
      return action.state;

    default:
      return state;
  }
}

// Context
interface QuestionnaireContextValue {
  state: QuestionnaireState;
  visibleQuestions: typeof questions;
  currentQuestion: (typeof questions)[0] | null;
  totalSteps: number;
  progress: number;
  setResponse: (field: keyof QuestionnaireResponses, value: unknown) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

const QuestionnaireContext = createContext<QuestionnaireContextValue | null>(
  null
);

// Storage key
const STORAGE_KEY = "freelancestart_questionnaire";

// Provider
export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(questionnaireReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD_STATE", state: parsed });
      }
    } catch {
      // Ignore errors
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore errors
    }
  }, [state]);

  // Computed values
  const visibleQuestions = getVisibleQuestions(state.responses);
  const currentQuestion = visibleQuestions[state.currentStep] || null;
  const totalSteps = visibleQuestions.length;
  const progress =
    totalSteps > 0 ? (state.currentStep / totalSteps) * 100 : 0;

  // Check if current question is answered
  const canGoNext = currentQuestion
    ? state.responses[currentQuestion.id as keyof QuestionnaireResponses] !== null
    : false;
  const canGoPrev = state.currentStep > 0;

  // Actions
  const setResponse = useCallback(
    (field: keyof QuestionnaireResponses, value: unknown) => {
      dispatch({ type: "SET_RESPONSE", field, value });
    },
    []
  );

  const nextStep = useCallback(() => {
    dispatch({ type: "NEXT_STEP" });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: "PREV_STEP" });
  }, []);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: "GO_TO_STEP", step });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore errors
    }
  }, []);

  const value: QuestionnaireContextValue = {
    state,
    visibleQuestions,
    currentQuestion,
    totalSteps,
    progress,
    setResponse,
    nextStep,
    prevStep,
    goToStep,
    reset,
    canGoNext,
    canGoPrev,
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

// Hook
export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error(
      "useQuestionnaire must be used within a QuestionnaireProvider"
    );
  }
  return context;
}
