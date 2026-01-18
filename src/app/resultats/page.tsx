"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Share2, RefreshCw } from "lucide-react";
import type { QuestionnaireResponses, Recommendation } from "@/lib/types";
import { generateRecommendation } from "@/lib/recommendation-engine";
import {
  StatusRecommendation,
  StatusComparison,
  WarningsSection,
  ChecklistSection,
  PartnersGrid,
} from "@/components/results";

export default function ResultatsPage() {
  const router = useRouter();
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get responses from sessionStorage
    const stored = sessionStorage.getItem("questionnaire_responses");

    if (!stored) {
      // No responses, redirect to questionnaire
      router.push("/questionnaire");
      return;
    }

    try {
      const responses: QuestionnaireResponses = JSON.parse(stored);

      // Generate recommendation
      const result = generateRecommendation(responses);
      setRecommendation(result);
    } catch {
      // Invalid data, redirect
      router.push("/questionnaire");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Handle share
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ma recommandation FreelanceStart",
          text: `Mon statut recommande : ${recommendation?.recommendedStatus.toUpperCase()}`,
          url,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      alert("Lien copie dans le presse-papier !");
    }
  };

  // Handle restart
  const handleRestart = () => {
    sessionStorage.removeItem("questionnaire_responses");
    localStorage.removeItem("freelancestart_questionnaire");
    router.push("/questionnaire");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-2 border-sage/30 border-t-sage rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cream-muted">Analyse en cours...</p>
        </motion.div>
      </div>
    );
  }

  if (!recommendation) {
    return null;
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

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="btn btn-ghost btn-sm"
                title="Partager"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Partager</span>
              </button>
              <button
                onClick={handleRestart}
                className="btn btn-ghost btn-sm"
                title="Recommencer"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Recommencer</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/questionnaire"
            className="inline-flex items-center gap-2 text-cream-muted hover:text-cream transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Modifier mes reponses
          </Link>

          {/* Page title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl text-cream mb-2">
              Votre recommandation
            </h1>
            <p className="text-cream-muted">
              Basee sur vos reponses, voici le statut ideal pour votre situation
            </p>
          </motion.div>

          {/* Recommendation card */}
          <div className="mb-8">
            <StatusRecommendation
              status={recommendation.recommendedStatus}
              scores={recommendation.statusScores}
              reasoning={recommendation.reasoning}
            />
          </div>

          {/* Warnings */}
          <div className="mb-8">
            <WarningsSection warnings={recommendation.warnings} />
          </div>

          {/* Status comparison */}
          <div className="mb-8">
            <StatusComparison
              scores={recommendation.statusScores}
              recommended={recommendation.recommendedStatus}
            />
          </div>

          {/* Checklist */}
          <div className="mb-12">
            <ChecklistSection
              actions={recommendation.priorityActions}
              estimatedTimeline={recommendation.estimatedTimeline}
            />
          </div>

          {/* Divider */}
          <div className="divider mb-12" />

          {/* Partners */}
          <PartnersGrid recommendedStatus={recommendation.recommendedStatus} />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-cream-muted mb-4">
              Creez un compte pour sauvegarder vos resultats et suivre votre
              progression
            </p>
            <Link href="/auth/login" className="btn btn-primary">
              Creer mon compte gratuit
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-sage/10 py-8">
        <div className="container-main text-center">
          <p className="text-cream-dark text-sm">
            &copy; {new Date().getFullYear()} FreelanceStart. Tous droits
            reserves.
          </p>
        </div>
      </footer>
    </div>
  );
}
