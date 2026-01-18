"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import type { LegalStatus, StatusScores } from "@/lib/types";
import { STATUS_INFO } from "@/lib/constants";

interface StatusComparisonProps {
  scores: StatusScores;
  recommended: LegalStatus;
}

const comparisonPoints = [
  { key: "creation", label: "Rapidite de creation" },
  { key: "simplicity", label: "Simplicite administrative" },
  { key: "are", label: "Compatible ARE 100%" },
  { key: "deduction", label: "Deduction des charges" },
  { key: "credibility", label: "Credibilite clients" },
  { key: "protection", label: "Protection patrimoine" },
];

const statusComparison: Record<
  string,
  Record<LegalStatus, "yes" | "no" | "partial">
> = {
  creation: { micro: "yes", eurl: "partial", sasu: "partial" },
  simplicity: { micro: "yes", eurl: "no", sasu: "no" },
  are: { micro: "no", eurl: "partial", sasu: "yes" },
  deduction: { micro: "no", eurl: "yes", sasu: "yes" },
  credibility: { micro: "partial", eurl: "yes", sasu: "yes" },
  protection: { micro: "no", eurl: "yes", sasu: "yes" },
};

function ComparisonIcon({ value }: { value: "yes" | "no" | "partial" }) {
  switch (value) {
    case "yes":
      return (
        <div className="w-6 h-6 rounded-full bg-sage/20 flex items-center justify-center">
          <Check className="w-4 h-4 text-sage" />
        </div>
      );
    case "no":
      return (
        <div className="w-6 h-6 rounded-full bg-error/20 flex items-center justify-center">
          <X className="w-4 h-4 text-error" />
        </div>
      );
    case "partial":
      return (
        <div className="w-6 h-6 rounded-full bg-warning/20 flex items-center justify-center">
          <Minus className="w-4 h-4 text-warning" />
        </div>
      );
  }
}

export function StatusComparison({
  scores,
  recommended,
}: StatusComparisonProps) {
  const statuses: LegalStatus[] = ["micro", "eurl", "sasu"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card overflow-hidden"
    >
      <div className="p-6 border-b border-sage/10">
        <h3 className="font-display text-xl text-cream">
          Comparaison des statuts
        </h3>
        <p className="text-cream-muted text-sm mt-1">
          Apercu des avantages de chaque option
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sage/10">
              <th className="text-left p-4 text-cream-muted text-sm font-normal">
                Critere
              </th>
              {statuses.map((status) => (
                <th
                  key={status}
                  className={`p-4 text-center ${
                    status === recommended ? "bg-sage/5" : ""
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{STATUS_INFO[status].icon}</span>
                    <span
                      className={`text-sm font-semibold ${
                        status === recommended ? "text-sage" : "text-cream"
                      }`}
                    >
                      {STATUS_INFO[status].name}
                    </span>
                    <span className="text-xs text-cream-muted">
                      {scores[status]}%
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonPoints.map((point, index) => (
              <tr
                key={point.key}
                className={index < comparisonPoints.length - 1 ? "border-b border-sage/5" : ""}
              >
                <td className="p-4 text-cream-muted text-sm">{point.label}</td>
                {statuses.map((status) => (
                  <td
                    key={status}
                    className={`p-4 text-center ${
                      status === recommended ? "bg-sage/5" : ""
                    }`}
                  >
                    <div className="flex justify-center">
                      <ComparisonIcon
                        value={statusComparison[point.key][status]}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden p-4 space-y-4">
        {statuses.map((status) => (
          <div
            key={status}
            className={`p-4 rounded-xl ${
              status === recommended
                ? "bg-sage/10 border border-sage/20"
                : "bg-charcoal"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{STATUS_INFO[status].icon}</span>
              <div>
                <span
                  className={`font-semibold ${
                    status === recommended ? "text-sage" : "text-cream"
                  }`}
                >
                  {STATUS_INFO[status].name}
                </span>
                <span className="text-cream-muted text-sm ml-2">
                  {scores[status]}%
                </span>
              </div>
              {status === recommended && (
                <span className="badge badge-sage ml-auto">Recommande</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {comparisonPoints.map((point) => (
                <div key={point.key} className="flex items-center gap-2">
                  <ComparisonIcon value={statusComparison[point.key][status]} />
                  <span className="text-xs text-cream-muted">{point.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
