"use client";

import { motion } from "framer-motion";
import { MessageSquare, Brain, Users, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Repondez au questionnaire",
    description:
      "6 questions simples pour comprendre votre situation : emploi actuel, droits au chomage, CA prevu...",
    color: "sage",
  },
  {
    icon: Brain,
    title: "Recevez votre recommandation",
    description:
      "Notre algorithme analyse vos reponses et vous recommande le statut optimal : Micro, EURL ou SASU.",
    color: "sage",
  },
  {
    icon: Users,
    title: "Passez a l'action",
    description:
      "Checklist personnalisee et partenaires de confiance pour creer votre structure rapidement.",
    color: "sage",
  },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-20 md:py-32">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge badge-sage mb-4"
          >
            Comment ca marche
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl text-cream mb-4"
          >
            3 etapes pour trouver votre statut
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cream-muted max-w-2xl mx-auto"
          >
            Un parcours simple et rapide pour vous guider vers le meilleur choix
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-sage/30 to-transparent z-0" />
              )}

              <div className="card p-8 relative z-10 h-full">
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-sage text-charcoal font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-sage/10 flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-sage" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl text-cream mb-3">
                  {step.title}
                </h3>
                <p className="text-cream-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href="/questionnaire" className="btn btn-primary group">
            Commencer maintenant
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
