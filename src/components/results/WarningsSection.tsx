"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface WarningsSectionProps {
  warnings: string[];
}

export function WarningsSection({ warnings }: WarningsSectionProps) {
  if (warnings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card p-6 bg-charcoal-dark border-warning/20"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-warning" />
        </div>
        <h3 className="font-display text-lg text-cream">Points d&apos;attention</h3>
      </div>

      <ul className="space-y-3">
        {warnings.map((warning, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="flex items-start gap-3"
          >
            <span className="w-5 h-5 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-warning text-xs font-bold">{i + 1}</span>
            </span>
            <span className="text-cream-muted text-sm">{warning}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
