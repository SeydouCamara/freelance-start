"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import {
  QuestionnaireProvider,
  useQuestionnaire,
} from "@/lib/questionnaire-context";
import {
  ProgressBar,
  QuestionCard,
  OptionButton,
  NavigationButtons,
} from "@/components/questionnaire";
import type { QuestionnaireResponses } from "@/lib/types";

function QuestionnaireContent() {
  const router = useRouter();
  const {
    state,
    currentQuestion,
    totalSteps,
    progress,
    setResponse,
    nextStep,
    prevStep,
    canGoNext,
    canGoPrev,
  } = useQuestionnaire();

  // Redirect to results when complete
  useEffect(() => {
    if (state.isComplete) {
      // Store responses in sessionStorage for results page
      sessionStorage.setItem(
        "questionnaire_responses",
        JSON.stringify(state.responses)
      );
      router.push("/resultats");
    }
  }, [state.isComplete, state.responses, router]);

  // Handle option selection
  const handleOptionClick = (value: unknown) => {
    if (currentQuestion) {
      setResponse(
        currentQuestion.id as keyof QuestionnaireResponses,
        value
      );
    }
  };

  // Get current response value
  const currentValue = currentQuestion
    ? state.responses[currentQuestion.id as keyof QuestionnaireResponses]
    : null;

  // Check if this is the last step
  const isLastStep = state.currentStep === totalSteps - 1;

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-cream-muted">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-sage/10">
        <div className="container-main">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sage" />
              <span className="font-display text-lg text-cream">
                Freelance<span className="text-sage">Start</span>
              </span>
            </Link>

            {/* Close button */}
            <Link
              href="/"
              className="p-2 text-cream-muted hover:text-cream transition-colors"
            >
              <X className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <ProgressBar
              progress={progress}
              currentStep={state.currentStep}
              totalSteps={totalSteps}
            />
          </div>

          {/* Question card */}
          <QuestionCard
            question={currentQuestion.question}
            description={currentQuestion.description}
            currentStep={state.currentStep}
            direction={state.direction}
          >
            {currentQuestion.options.map((option) => (
              <OptionButton
                key={String(option.value)}
                label={option.label}
                description={option.description}
                icon={option.icon}
                selected={currentValue === option.value}
                onClick={() => handleOptionClick(option.value)}
              />
            ))}
          </QuestionCard>

          {/* Navigation */}
          <NavigationButtons
            canGoNext={canGoNext}
            canGoPrev={canGoPrev}
            onNext={nextStep}
            onPrev={prevStep}
            isLastStep={isLastStep}
          />

          {/* Help text */}
          <p className="text-center text-cream-dark text-sm mt-8">
            Vos reponses sont sauvegardees automatiquement
          </p>
        </div>
      </main>
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    <QuestionnaireProvider>
      <QuestionnaireContent />
    </QuestionnaireProvider>
  );
}
