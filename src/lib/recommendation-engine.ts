import type {
  QuestionnaireResponses,
  LegalStatus,
  StatusScores,
  Recommendation,
} from "./types";
import { STATUS_INFO } from "./constants";

/**
 * Calculate status scores based on questionnaire responses
 */
export function calculateStatusScores(
  responses: QuestionnaireResponses
): StatusScores {
  const scores = {
    micro: 50,
    eurl: 50,
    sasu: 50,
  };

  // === CRITERE 1: Situation chomage + ARE ===
  if (responses.currentSituation === "chomage") {
    if (responses.wantsKeepARE === true) {
      // SASU permet de garder 100% ARE (pas de salaire = pas de reduction)
      scores.sasu += 40;
      // EURL possible mais plus complexe (gerant minoritaire)
      scores.eurl += 10;
      // Micro-entreprise = perte ARE proportionnelle au CA
      scores.micro -= 30;
    } else if (responses.wantsKeepARE === false) {
      // ARCE = recevoir capital, tous les statuts OK
      scores.micro += 10;
      scores.eurl += 10;
      scores.sasu += 5;
    }
  }

  // === CRITERE 2: CA Previsionnel ===
  if (responses.expectedRevenue === "more_than_77k") {
    // Micro impossible au-dela du seuil (77 700 EUR services)
    scores.micro = 0; // Eliminatoire
    scores.eurl += 20;
    scores.sasu += 20;
  } else if (responses.expectedRevenue === "35k_to_77k") {
    // Micro encore viable mais attention au seuil
    scores.micro += 10;
    scores.eurl += 15;
    scores.sasu += 15;
  } else if (responses.expectedRevenue === "less_than_35k") {
    // CA faible = micro souvent optimal (simplicite)
    scores.micro += 25;
    scores.eurl -= 5;
    scores.sasu -= 10;
  }

  // === CRITERE 3: Niveau de charges ===
  if (responses.expenseLevel === "high") {
    // Beaucoup de charges = deduction necessaire
    scores.micro -= 25;
    scores.eurl += 25;
    scores.sasu += 20;
  } else if (responses.expenseLevel === "medium") {
    // Charges moderees
    scores.micro -= 10;
    scores.eurl += 10;
    scores.sasu += 5;
  } else if (responses.expenseLevel === "low") {
    // Peu de charges = micro avantageux (pas besoin de deduire)
    scores.micro += 15;
  }

  // === CRITERE 4: Mission immediate ===
  if (responses.hasMission === true) {
    // Urgence = simplicite de creation
    scores.micro += 10; // Creation rapide (24-48h)
    scores.eurl -= 5;
    scores.sasu -= 5;
  }

  // === CRITERE 5: Structure existante ===
  if (responses.hasStructure === true) {
    // Deja une structure = probablement pas micro
    scores.micro -= 20;
  }

  // === Normaliser les scores (0-100) ===
  const normalizedScores: StatusScores = {
    micro: Math.max(0, Math.min(100, Math.round(scores.micro))),
    eurl: Math.max(0, Math.min(100, Math.round(scores.eurl))),
    sasu: Math.max(0, Math.min(100, Math.round(scores.sasu))),
  };

  return normalizedScores;
}

/**
 * Determine the recommended status
 */
export function getRecommendedStatus(scores: StatusScores): LegalStatus {
  let recommended: LegalStatus = "micro";
  let maxScore = scores.micro;

  if (scores.eurl > maxScore) {
    recommended = "eurl";
    maxScore = scores.eurl;
  }
  if (scores.sasu > maxScore) {
    recommended = "sasu";
  }

  return recommended;
}

/**
 * Generate reasoning for the recommendation
 */
export function generateReasoning(
  responses: QuestionnaireResponses,
  recommended: LegalStatus
): string[] {
  const reasoning: string[] = [];

  // ARE reasoning
  if (
    responses.currentSituation === "chomage" &&
    responses.wantsKeepARE === true
  ) {
    if (recommended === "sasu") {
      reasoning.push(
        "La SASU vous permet de conserver 100% de vos allocations chomage (ARE) en ne vous versant pas de salaire."
      );
    } else if (recommended === "eurl") {
      reasoning.push(
        "L'EURL permet de conserver partiellement vos ARE, mais c'est plus complexe qu'en SASU."
      );
    }
  }

  if (
    responses.currentSituation === "chomage" &&
    responses.wantsKeepARE === false
  ) {
    reasoning.push(
      "Avec l'ARCE, vous recevez 60% de vos droits restants en capital pour investir dans votre activite."
    );
  }

  // CA reasoning
  if (responses.expectedRevenue === "more_than_77k") {
    reasoning.push(
      "Votre CA previsionnel depasse le seuil de la micro-entreprise (77 700 EUR). Une societe est necessaire."
    );
  } else if (
    responses.expectedRevenue === "less_than_35k" &&
    recommended === "micro"
  ) {
    reasoning.push(
      "Avec un CA modere, la micro-entreprise offre la simplicite administrative ideale pour demarrer."
    );
  }

  // Charges reasoning
  if (responses.expenseLevel === "high") {
    reasoning.push(
      "Vos charges importantes pourront etre deduites de votre resultat, reduisant ainsi votre imposition."
    );
  } else if (responses.expenseLevel === "low" && recommended === "micro") {
    reasoning.push(
      "Avec peu de charges, l'abattement forfaitaire de la micro-entreprise est souvent plus avantageux."
    );
  }

  // Mission urgente
  if (responses.hasMission === true && recommended === "micro") {
    reasoning.push(
      "La micro-entreprise peut etre creee en 24-48h, ideal pour demarrer rapidement votre mission."
    );
  }

  // Fallback
  if (reasoning.length === 0) {
    const statusName = STATUS_INFO[recommended].name;
    reasoning.push(
      `Le statut ${statusName} correspond le mieux a votre profil et vos objectifs.`
    );
  }

  return reasoning;
}

/**
 * Generate warnings for the recommendation
 */
export function generateWarnings(
  responses: QuestionnaireResponses,
  recommended: LegalStatus
): string[] {
  const warnings: string[] = [];

  // Micro-entreprise warnings
  if (recommended === "micro") {
    if (responses.expectedRevenue === "35k_to_77k") {
      warnings.push(
        "Attention : surveillez le seuil de 77 700 EUR. En cas de depassement, vous devrez changer de statut."
      );
    }
    if (responses.currentSituation === "chomage" && responses.wantsKeepARE) {
      warnings.push(
        "En micro-entreprise, vos ARE seront reduites proportionnellement a votre chiffre d'affaires."
      );
    }
    if (responses.expenseLevel === "medium") {
      warnings.push(
        "Vos charges ne seront pas deductibles. Verifiez que l'abattement forfaitaire reste avantageux."
      );
    }
  }

  // EURL warnings
  if (recommended === "eurl") {
    warnings.push(
      "Les cotisations sociales en EURL representent environ 45% du benefice. Anticipez cette charge."
    );
    warnings.push(
      "Un expert-comptable est fortement recommande pour gerer la comptabilite complete."
    );
  }

  // SASU warnings
  if (recommended === "sasu") {
    warnings.push(
      "Si vous vous versez un salaire, les cotisations seront elevees (~65%). Privilegiez les dividendes."
    );
    warnings.push(
      "Les dividendes sont soumis a la flat tax (30%) ou au bareme de l'IR si plus avantageux."
    );
  }

  return warnings;
}

/**
 * Generate priority actions checklist
 */
export function generatePriorityActions(
  responses: QuestionnaireResponses,
  recommended: LegalStatus
): string[] {
  const actions: string[] = [];

  // Common first steps
  if (responses.currentSituation === "chomage") {
    actions.push("Informer Pole Emploi de votre projet de creation");
    if (responses.wantsKeepARE === true) {
      actions.push("Demander le maintien de vos ARE");
    } else {
      actions.push("Demander l'ARCE (versement en capital)");
    }
    actions.push("Verifier votre eligibilite a l'ACRE (exoneration charges)");
  }

  // Status-specific actions
  if (recommended === "micro") {
    actions.push("Creer votre micro-entreprise sur autoentrepreneur.urssaf.fr");
    actions.push("Ouvrir un compte bancaire dedie (obligatoire si CA > 10k)");
  } else {
    actions.push("Rediger les statuts de votre societe");
    actions.push("Deposer le capital social (1 EUR minimum)");
    actions.push("Immatriculer votre societe au greffe");
    actions.push("Ouvrir un compte bancaire professionnel");
  }

  // Common actions
  actions.push("Souscrire une assurance RC Pro");
  actions.push("Choisir un outil de facturation");

  if (recommended !== "micro") {
    actions.push("Trouver un expert-comptable");
  }

  return actions;
}

/**
 * Estimate timeline for setup
 */
export function estimateTimeline(recommended: LegalStatus): string {
  switch (recommended) {
    case "micro":
      return "1-2 jours";
    case "eurl":
      return "2-4 semaines";
    case "sasu":
      return "2-4 semaines";
    default:
      return "2-4 semaines";
  }
}

/**
 * Main function: Generate complete recommendation
 */
export function generateRecommendation(
  responses: QuestionnaireResponses
): Recommendation {
  const statusScores = calculateStatusScores(responses);
  const recommendedStatus = getRecommendedStatus(statusScores);
  const reasoning = generateReasoning(responses, recommendedStatus);
  const warnings = generateWarnings(responses, recommendedStatus);
  const priorityActions = generatePriorityActions(responses, recommendedStatus);
  const estimatedTimeline = estimateTimeline(recommendedStatus);

  // Generate share token (simple random string)
  const shareToken = Math.random().toString(36).substring(2, 10);

  return {
    recommendedStatus,
    statusScores,
    reasoning,
    warnings,
    priorityActions,
    estimatedTimeline,
    shareToken,
  };
}
