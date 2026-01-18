// === QUESTIONNAIRE TYPES ===

export type CurrentSituation = 'salarie' | 'chomage' | 'etudiant' | 'autre';
export type ExpectedRevenue = 'less_than_35k' | '35k_to_77k' | 'more_than_77k';
export type ExpenseLevel = 'low' | 'medium' | 'high';
export type LegalStatus = 'micro' | 'eurl' | 'sasu';

export interface QuestionnaireResponses {
  hasMission: boolean | null;
  hasStructure: boolean | null;
  existingStructure?: string;
  currentSituation: CurrentSituation | null;
  wantsKeepARE: boolean | null;
  expectedRevenue: ExpectedRevenue | null;
  expenseLevel: ExpenseLevel | null;
}

export interface QuestionnaireState {
  currentStep: number;
  responses: QuestionnaireResponses;
  direction: 1 | -1;
  isComplete: boolean;
}

// === RECOMMENDATION TYPES ===

export interface StatusScores {
  micro: number;
  eurl: number;
  sasu: number;
}

export interface StatusDetails {
  name: string;
  fullName: string;
  maxRevenue: number | null;
  canKeepARE: boolean;
  canDeductExpenses: boolean;
  socialChargesRate: number;
  advantages: string[];
  disadvantages: string[];
}

export interface Recommendation {
  id?: string;
  recommendedStatus: LegalStatus;
  statusScores: StatusScores;
  reasoning: string[];
  warnings: string[];
  priorityActions: string[];
  estimatedTimeline: string;
  shareToken?: string;
}

// === PARTNER TYPES ===

export type PartnerCategory = 'bank' | 'accounting' | 'insurance' | 'legal' | 'portage' | 'other';

export interface Partner {
  id: string;
  name: string;
  slug: string;
  category: PartnerCategory;
  description: string;
  shortDescription: string;
  logo: string;
  logoLight?: string;
  primaryColor: string;
  affiliateUrl: string;
  defaultAffiliateCode: string;
  features: string[];
  pricing?: string;
  specialOffer?: string;
  isActive: boolean;
  sortOrder: number;
}

// === USER TYPES ===

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  referralCode?: string;
  completedOnboarding: boolean;
  created: string;
  updated: string;
}

// === PROGRESS TYPES ===

export type ChecklistItemStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';

export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  estimatedTime?: string;
  link?: string;
  status: ChecklistItemStatus;
  completedAt?: string;
  notes?: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  recommendationId: string;
  checklistProgress: ChecklistItem[];
  completionPercentage: number;
  lastActivityAt: string;
}

// === AFFILIATE TYPES ===

export interface AffiliateClick {
  id: string;
  partnerId: string;
  userId?: string;
  sessionId: string;
  affiliateCode: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  converted: boolean;
  convertedAt?: string;
  created: string;
}

// === API TYPES ===

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// === QUESTION TYPES ===

export interface QuestionOption {
  value: string | boolean;
  label: string;
  description?: string;
  icon?: string;
}

export interface Question {
  id: string;
  question: string;
  description?: string;
  options: QuestionOption[];
  type: 'single' | 'multiple';
  conditional?: {
    field: keyof QuestionnaireResponses;
    value: string | boolean;
  };
}
