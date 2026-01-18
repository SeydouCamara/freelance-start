"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import type { LegalStatus, StatusScores } from "@/lib/types";
import { STATUS_INFO } from "@/lib/constants";

interface StatusRecommendationProps {
  status: LegalStatus;
  scores: StatusScores;
  reasoning: string[];
}

export function StatusRecommendation({
  status,
  scores,
  reasoning,
}: StatusRecommendationProps) {
  const info = STATUS_INFO[status];
  const score = scores[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-charcoal-light border border-sage/20"
    >
      {/* Header with glow */}
      <div className="relative p-6 md:p-8 border-b border-sage/10">
        <div className="absolute inset-0 bg-gradient-to-r from-sage/10 to-transparent" />

        <div className="relative flex flex-col md:flex-row md:items-center gap-4">
          {/* Icon and badge */}
          <div className="flex items-center gap-4">
            <div className="text-5xl">{info.icon}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-sage" />
                <span className="text-sage text-xs font-semibold uppercase tracking-wider">
                  Recommandation
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-cream">
                {info.name}
              </h2>
              <p className="text-cream-muted text-sm">{info.fullName}</p>
            </div>
          </div>

          {/* Score */}
          <div className="md:ml-auto text-left md:text-center bg-charcoal rounded-xl p-4">
            <div className="text-3xl md:text-4xl font-bold text-sage">
              {score}%
            </div>
            <div className="text-xs text-cream-muted">Score compatibilite</div>
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div className="p-6 md:p-8">
        <h3 className="font-semibold text-cream mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-sage" />
          Pourquoi ce statut ?
        </h3>
        <ul className="space-y-3">
          {reasoning.map((reason, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="text-cream-muted flex items-start gap-3"
            >
              <ArrowRight className="w-4 h-4 text-sage mt-1 flex-shrink-0" />
              <span>{reason}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
