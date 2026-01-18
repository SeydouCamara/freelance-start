"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  canGoNext: boolean;
  canGoPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  isLastStep: boolean;
}

export function NavigationButtons({
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
  isLastStep,
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between gap-4 mt-8">
      {/* Previous button */}
      <motion.button
        onClick={onPrev}
        disabled={!canGoPrev}
        whileHover={canGoPrev ? { scale: 1.02 } : {}}
        whileTap={canGoPrev ? { scale: 0.98 } : {}}
        className={`
          btn btn-ghost
          ${
            canGoPrev
              ? "text-cream-muted hover:text-cream"
              : "text-cream-dark cursor-not-allowed opacity-50"
          }
        `}
      >
        <ArrowLeft className="w-4 h-4" />
        Precedent
      </motion.button>

      {/* Next button */}
      <motion.button
        onClick={onNext}
        disabled={!canGoNext}
        whileHover={canGoNext ? { scale: 1.02 } : {}}
        whileTap={canGoNext ? { scale: 0.98 } : {}}
        className={`
          btn
          ${
            canGoNext
              ? "btn-primary"
              : "bg-charcoal-light text-cream-dark cursor-not-allowed border-charcoal-light"
          }
        `}
      >
        {isLastStep ? "Voir mes resultats" : "Suivant"}
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
