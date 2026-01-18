import type { Question, QuestionnaireResponses } from "@/lib/types";

export const questions: Question[] = [
  {
    id: "hasMission",
    question: "As-tu deja un client ou une mission ?",
    description:
      "Si tu as deja signe un contrat ou une mission imminente, cela peut influencer l'urgence de creation.",
    options: [
      {
        value: true,
        label: "Oui, j'ai deja un client",
        description: "Mission signee ou en cours de negociation",
        icon: "briefcase",
      },
      {
        value: false,
        label: "Non, pas encore",
        description: "Je prepare mon lancement",
        icon: "search",
      },
    ],
    type: "single",
  },
  {
    id: "hasStructure",
    question: "As-tu deja une structure juridique ?",
    description:
      "Si tu as deja cree une entreprise, les recommandations seront differentes.",
    options: [
      {
        value: true,
        label: "Oui, j'ai deja une structure",
        description: "Micro-entreprise, EURL, SASU ou autre",
        icon: "building",
      },
      {
        value: false,
        label: "Non, je pars de zero",
        description: "Je n'ai aucune structure existante",
        icon: "rocket",
      },
    ],
    type: "single",
  },
  {
    id: "currentSituation",
    question: "Quelle est ta situation actuelle ?",
    description:
      "Ta situation determine les aides et optimisations possibles (ARE, ACRE, etc.).",
    options: [
      {
        value: "salarie",
        label: "Salarie",
        description: "Je suis actuellement en CDI ou CDD",
        icon: "user",
      },
      {
        value: "chomage",
        label: "Demandeur d'emploi",
        description: "Je touche ou vais toucher des allocations chomage",
        icon: "briefcase",
      },
      {
        value: "etudiant",
        label: "Etudiant",
        description: "Je suis encore en etudes",
        icon: "graduation-cap",
      },
      {
        value: "autre",
        label: "Autre situation",
        description: "RSA, reconversion, independant...",
        icon: "more-horizontal",
      },
    ],
    type: "single",
  },
  {
    id: "wantsKeepARE",
    question: "Souhaites-tu conserver tes allocations chomage (ARE) ?",
    description:
      "En SASU sans te verser de salaire, tu peux garder 100% de tes ARE. En micro-entreprise, tes ARE sont reduites proportionnellement a ton CA.",
    options: [
      {
        value: true,
        label: "Oui, je veux garder mes ARE",
        description: "Conserver mes allocations le plus longtemps possible",
        icon: "shield",
      },
      {
        value: false,
        label: "Non, je prefere l'ARCE",
        description: "Recevoir 60% de mes droits en capital pour investir",
        icon: "banknote",
      },
    ],
    type: "single",
    conditional: {
      field: "currentSituation",
      value: "chomage",
    },
  },
  {
    id: "expectedRevenue",
    question: "Quel est ton chiffre d'affaires previsionnel annuel ?",
    description:
      "Le seuil de 77 700 EUR est important : au-dela, la micro-entreprise n'est plus possible pour les services.",
    options: [
      {
        value: "less_than_35k",
        label: "Moins de 35 000 EUR",
        description: "Debut d'activite, temps partiel",
        icon: "trending-up",
      },
      {
        value: "35k_to_77k",
        label: "Entre 35 000 et 77 700 EUR",
        description: "Activite a temps plein",
        icon: "bar-chart",
      },
      {
        value: "more_than_77k",
        label: "Plus de 77 700 EUR",
        description: "Activite importante ou gros contrats",
        icon: "rocket",
      },
    ],
    type: "single",
  },
  {
    id: "expenseLevel",
    question: "Quel niveau de charges/frais prevois-tu ?",
    description:
      "En micro-entreprise, tu ne peux pas deduire tes charges. Si tu as beaucoup de frais, une societe (EURL/SASU) peut etre plus avantageuse.",
    options: [
      {
        value: "low",
        label: "Peu de frais",
        description: "< 20% du CA (freelance conseil, dev...)",
        icon: "minimize",
      },
      {
        value: "medium",
        label: "Frais moderes",
        description: "20-40% du CA (materiel, deplacements...)",
        icon: "minus",
      },
      {
        value: "high",
        label: "Beaucoup de frais",
        description: "> 40% du CA (sous-traitance, stock...)",
        icon: "maximize",
      },
    ],
    type: "single",
  },
];

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getVisibleQuestions(
  responses: QuestionnaireResponses
): Question[] {
  return questions.filter((question) => {
    if (!question.conditional) return true;
    const { field, value } = question.conditional;
    const responseValue = responses[field as keyof QuestionnaireResponses];
    return responseValue === value;
  });
}
