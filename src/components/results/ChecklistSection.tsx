"use client";

import { motion } from "framer-motion";
import { ListChecks, Circle, Clock } from "lucide-react";

interface ChecklistSectionProps {
  actions: string[];
  estimatedTimeline: string;
}

export function ChecklistSection({
  actions,
  estimatedTimeline,
}: ChecklistSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center">
            <ListChecks className="w-5 h-5 text-sage" />
          </div>
          <div>
            <h3 className="font-display text-lg text-cream">
              Prochaines etapes
            </h3>
            <p className="text-cream-muted text-sm">
              Votre checklist personnalisee
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-cream-muted text-sm">
          <Clock className="w-4 h-4" />
          <span>~{estimatedTimeline}</span>
        </div>
      </div>

      <ul className="space-y-3">
        {actions.map((action, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-charcoal hover:bg-charcoal-dark transition-colors"
          >
            <Circle className="w-5 h-5 text-sage/50 flex-shrink-0 mt-0.5" />
            <span className="text-cream-muted text-sm">{action}</span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-6 pt-6 border-t border-sage/10">
        <p className="text-cream-dark text-sm text-center">
          Creez un compte pour sauvegarder votre progression et acceder a des
          offres partenaires exclusives
        </p>
      </div>
    </motion.div>
  );
}
