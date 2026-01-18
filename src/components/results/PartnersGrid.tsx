"use client";

import { motion } from "framer-motion";
import { ExternalLink, Gift } from "lucide-react";
import type { LegalStatus } from "@/lib/types";
import { PARTNER_CATEGORIES } from "@/lib/constants";

// Temporary partner data (will come from PocketBase later)
const partners = [
  {
    id: "1",
    name: "Shine",
    slug: "shine",
    category: "bank" as const,
    description: "Compte pro 100% en ligne avec comptabilite integree",
    features: ["Compte pro gratuit", "Facturation incluse", "Support reactif"],
    specialOffer: "2 mois offerts",
    affiliateUrl: "https://shine.fr",
  },
  {
    id: "2",
    name: "Qonto",
    slug: "qonto",
    category: "bank" as const,
    description: "La neobanque des entrepreneurs et PME",
    features: ["Carte Metal", "Multi-comptes", "Integrations comptables"],
    affiliateUrl: "https://qonto.com",
  },
  {
    id: "3",
    name: "Dougs",
    slug: "dougs",
    category: "accounting" as const,
    description: "Expert-comptable en ligne pour freelances et TPE",
    features: [
      "Comptabilite automatisee",
      "Conseils fiscaux",
      "App mobile",
    ],
    specialOffer: "1er mois offert",
    affiliateUrl: "https://dougs.fr",
  },
  {
    id: "4",
    name: "Indy",
    slug: "indy",
    category: "accounting" as const,
    description: "Comptabilite automatisee pour independants",
    features: ["Declaration automatique", "Synchronisation bancaire", "Gratuit"],
    affiliateUrl: "https://indy.fr",
  },
  {
    id: "5",
    name: "Hiscox",
    slug: "hiscox",
    category: "insurance" as const,
    description: "Assurance RC Pro adaptee aux freelances",
    features: ["Devis en 3 min", "Attestation immediate", "Prix competitifs"],
    affiliateUrl: "https://hiscox.fr",
  },
  {
    id: "6",
    name: "Legalstart",
    slug: "legalstart",
    category: "legal" as const,
    description: "Creation de societe en ligne simple et rapide",
    features: ["Statuts sur-mesure", "Accompagnement complet", "Prix fixes"],
    specialOffer: "-20% creation",
    affiliateUrl: "https://legalstart.fr",
  },
];

interface PartnersGridProps {
  recommendedStatus: LegalStatus;
}

export function PartnersGrid({ recommendedStatus }: PartnersGridProps) {
  // Filter partners based on status (show all for now, but could filter)
  const filteredPartners = partners;

  // For micro, hide legal partners (no need for statuts)
  const displayPartners =
    recommendedStatus === "micro"
      ? filteredPartners.filter((p) => p.category !== "legal")
      : filteredPartners;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="mb-6">
        <h3 className="font-display text-xl text-cream mb-2">
          Partenaires recommandes
        </h3>
        <p className="text-cream-muted text-sm">
          Des services selectionnes pour accompagner votre lancement
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayPartners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            className="card p-5 hover:border-sage/30 transition-all group"
          >
            {/* Special offer badge */}
            {partner.specialOffer && (
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-sage/20 text-sage text-xs font-semibold">
                <Gift className="w-3 h-3" />
                {partner.specialOffer}
              </div>
            )}

            {/* Category badge */}
            <div className="text-xs text-cream-dark uppercase tracking-wider mb-3">
              {PARTNER_CATEGORIES[partner.category].icon}{" "}
              {PARTNER_CATEGORIES[partner.category].label}
            </div>

            {/* Logo placeholder */}
            <div className="w-12 h-12 rounded-xl bg-charcoal flex items-center justify-center mb-3">
              <span className="text-xl font-display text-sage">
                {partner.name.charAt(0)}
              </span>
            </div>

            {/* Name & Description */}
            <h4 className="font-semibold text-cream mb-1">{partner.name}</h4>
            <p className="text-cream-muted text-sm mb-3 line-clamp-2">
              {partner.description}
            </p>

            {/* Features */}
            <ul className="space-y-1 mb-4">
              {partner.features.slice(0, 2).map((feature, i) => (
                <li
                  key={i}
                  className="text-xs text-cream-dark flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-sage" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={partner.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm w-full group-hover:bg-sage/10"
            >
              Decouvrir
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-cream-dark text-xs mt-6">
        Ces liens sont des liens d&apos;affiliation. Nous pouvons recevoir une
        commission si vous souscrivez.
      </p>
    </motion.div>
  );
}
