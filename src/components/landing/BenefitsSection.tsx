"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Wallet,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Optimisation ARE",
    description:
      "Conservez 100% de vos allocations chomage avec le bon statut. La SASU permet de ne pas se verser de salaire.",
    highlight: "Jusqu'a 24 mois d'ARE preserves",
  },
  {
    icon: Wallet,
    title: "Fiscalite optimisee",
    description:
      "Micro-entreprise pour demarrer leger, societe pour deduire vos charges. On vous guide vers le choix optimal.",
    highlight: "Economisez jusqu'a 30% d'impots",
  },
  {
    icon: Clock,
    title: "Gain de temps",
    description:
      "Plus besoin de passer des heures sur les forums. Obtenez une recommandation claire en 5 minutes.",
    highlight: "5 min vs 5 heures de recherche",
  },
  {
    icon: TrendingUp,
    title: "Partenaires de confiance",
    description:
      "Banque pro, comptable, assurance... Tous nos partenaires sont selectionnes pour leur qualite de service.",
    highlight: "Offres exclusives negociees",
  },
];

const mistakes = [
  "Creer une micro sans savoir qu'on perd ses ARE",
  "Choisir EURL alors que SASU etait plus avantageux",
  "Payer trop de charges faute de bonne structure",
  "Perdre du temps en demarches inutiles",
];

export function BenefitsSection() {
  return (
    <section id="avantages" className="py-20 md:py-32 bg-charcoal-light/30">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge badge-sage mb-4"
          >
            Avantages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl text-cream mb-4"
          >
            Evitez les erreurs couteuses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cream-muted max-w-2xl mx-auto"
          >
            Le mauvais statut peut vous couter des milliers d&apos;euros. Notre
            accompagnement vous aide a faire le bon choix des le depart.
          </motion.p>
        </div>

        {/* Two columns layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-sage/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-sage" />
                </div>
                <h3 className="font-semibold text-cream mb-2">{benefit.title}</h3>
                <p className="text-cream-muted text-sm mb-3">
                  {benefit.description}
                </p>
                <div className="inline-flex items-center gap-1 text-sage text-xs font-medium">
                  <CheckCircle className="w-3 h-3" />
                  {benefit.highlight}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mistakes to avoid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-8 bg-charcoal-dark border-warning/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <h3 className="font-display text-xl text-cream">
                Erreurs a eviter
              </h3>
            </div>

            <p className="text-cream-muted text-sm mb-6">
              Chaque annee, des milliers de freelances font ces erreurs par
              manque d&apos;information :
            </p>

            <ul className="space-y-4">
              {mistakes.map((mistake, index) => (
                <motion.li
                  key={mistake}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-warning text-xs font-bold">
                      {index + 1}
                    </span>
                  </span>
                  <span className="text-cream-muted text-sm">{mistake}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-sage/10">
              <p className="text-cream text-sm font-medium">
                Notre questionnaire vous aide a eviter ces pieges en quelques
                minutes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
