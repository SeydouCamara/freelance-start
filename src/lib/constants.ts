// === COLORS ===
export const COLORS = {
  charcoal: '#211f1f',
  charcoalLight: '#2d2b2b',
  charcoalDark: '#171616',
  sage: '#c3eda1',
  sageLight: '#d4f4bc',
  sageDark: '#9ad175',
  cream: '#fffcec',
  creamMuted: '#c5c2b8',
  creamDark: '#8a877e',
  success: '#4ade80',
  warning: '#fbbf24',
  error: '#f87171',
  info: '#60a5fa',
  micro: '#fbbf24',
  eurl: '#60a5fa',
  sasu: '#c3eda1',
} as const;

// === STATUS INFO ===
export const STATUS_INFO = {
  micro: {
    name: 'Micro-entreprise',
    fullName: 'Micro-entreprise (Auto-entrepreneur)',
    icon: '⚡',
    color: COLORS.micro,
    maxRevenue: 77700,
    canKeepARE: false,
    canDeductExpenses: false,
    socialChargesRate: 0.22,
    advantages: [
      'Comptabilite ultra-simplifiee',
      'Declaration trimestrielle ou mensuelle',
      'Pas de TVA si < 36 800 EUR',
      'Creation rapide (24-48h)',
      'Pas de capital minimum',
    ],
    disadvantages: [
      'Plafond CA 77 700 EUR (services)',
      'Pas de deduction de charges',
      'Pas compatible ARE maintien',
      'Responsabilite illimitee',
      'Credibilite limitee pour gros clients',
    ],
  },
  eurl: {
    name: 'EURL',
    fullName: 'Entreprise Unipersonnelle a Responsabilite Limitee',
    icon: '🏢',
    color: COLORS.eurl,
    maxRevenue: null,
    canKeepARE: true,
    canDeductExpenses: true,
    socialChargesRate: 0.45,
    advantages: [
      'Deduction des charges reelles',
      'Credibilite aupres des clients',
      'Protection patrimoine personnel',
      'Pas de plafond de CA',
      'Choix IR ou IS',
    ],
    disadvantages: [
      'Comptabilite complete obligatoire',
      'Cotisations sociales elevees (~45%)',
      'Formalites de creation plus longues',
      'Couts de gestion annuels',
      'Capital minimum 1 EUR (mais 1000 EUR recommande)',
    ],
  },
  sasu: {
    name: 'SASU',
    fullName: 'Societe par Actions Simplifiee Unipersonnelle',
    icon: '🚀',
    color: COLORS.sasu,
    maxRevenue: null,
    canKeepARE: true,
    canDeductExpenses: true,
    socialChargesRate: 0.65,
    advantages: [
      'Compatible ARE a 100%',
      'Statut assimile salarie',
      'Flexibilite remuneration (dividendes)',
      'Meilleure couverture sociale',
      'Credibilite maximale',
      'Facilite pour lever des fonds',
    ],
    disadvantages: [
      'Cotisations sur salaire tres elevees (~65%)',
      'Complexite administrative',
      'Expert-comptable quasi obligatoire',
      'Couts de creation plus eleves',
      'Dividendes soumis a flat tax (30%)',
    ],
  },
} as const;

// === PARTNER CATEGORIES ===
export const PARTNER_CATEGORIES = {
  bank: {
    label: 'Banque Pro',
    icon: '🏦',
  },
  accounting: {
    label: 'Comptabilite',
    icon: '📊',
  },
  insurance: {
    label: 'Assurance',
    icon: '🛡️',
  },
  legal: {
    label: 'Juridique',
    icon: '⚖️',
  },
  portage: {
    label: 'Portage Salarial',
    icon: '🤝',
  },
  other: {
    label: 'Autre',
    icon: '📦',
  },
} as const;

// === CHECKLIST CATEGORIES ===
export const CHECKLIST_CATEGORIES = {
  administrative: 'Demarches administratives',
  banking: 'Banque et finances',
  insurance: 'Assurances',
  accounting: 'Comptabilite',
  legal: 'Juridique',
  commercial: 'Commercial',
} as const;

// === POCKETBASE CONFIG ===
export const POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://37.27.247.194:8094';

// === APP CONFIG ===
export const APP_CONFIG = {
  name: 'FreelanceStart',
  description: 'Accompagnateur intelligent pour creer son activite freelance',
  url: 'https://freelancestart.fr',
  twitter: '@freelancestart',
} as const;

// === REVENUE THRESHOLDS ===
export const REVENUE_THRESHOLDS = {
  micro_services: 77700,
  micro_commerce: 188700,
  tva_franchise: 36800,
} as const;

// === ARE INFO ===
export const ARE_INFO = {
  arce_percentage: 0.60, // 60% du reliquat ARE en capital
  are_daily_max: 274.80, // Plafond journalier ARE 2024
} as const;
