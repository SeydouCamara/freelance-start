"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface QuestionCardProps {
  question: string;
  description?: string;
  children: ReactNode;
  currentStep: number;
  direction: 1 | -1;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

export function QuestionCard({
  question,
  description,
  children,
  currentStep,
  direction,
}: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentStep}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="w-full"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-sage/10 via-sage/5 to-transparent rounded-2xl blur-xl opacity-50" />

          {/* Card */}
          <div className="relative bg-charcoal-light rounded-2xl p-6 md:p-8 border border-sage/10">
            {/* Question */}
            <h2 className="font-display text-2xl md:text-3xl text-cream mb-3">
              {question}
            </h2>

            {/* Description */}
            {description && (
              <p className="text-cream-muted mb-8 max-w-2xl">{description}</p>
            )}

            {/* Options */}
            <div className="space-y-3">{children}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
