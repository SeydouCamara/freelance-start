"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({
  progress,
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Step indicator */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-cream-muted text-sm">
          Question {currentStep + 1} sur {totalSteps}
        </span>
        <span className="text-sage text-sm font-medium">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
