"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const benefits = [
  "Questionnaire personnalise",
  "Recommandation sur-mesure",
  "100% gratuit",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
      </div>

      <div className="container-main relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 border border-sage/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-sage" />
            <span className="text-sage text-sm font-medium">
              Accompagnateur intelligent
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-tight mb-6"
          >
            Lancez votre activite{" "}
            <span className="text-gradient">freelance</span>
            <br />
            en toute serenite
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-cream-muted text-lg md:text-xl max-w-2xl mx-auto mb-8"
          >
            Decouvrez le statut juridique ideal pour votre situation en quelques
            minutes. Micro-entreprise, EURL ou SASU ? On vous guide.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-cream-muted text-sm"
              >
                <CheckCircle className="w-4 h-4 text-sage" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/questionnaire" className="btn btn-primary btn-lg group">
              Trouver mon statut ideal
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/#comment-ca-marche" className="btn btn-secondary btn-lg">
              Comment ca marche ?
            </Link>
          </motion.div>

          {/* Trust indicator */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-cream-dark text-sm"
          >
            Deja plus de <span className="text-sage font-semibold">1 000+</span>{" "}
            freelances accompagnes
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-sage/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-sage" />
        </motion.div>
      </motion.div>
    </section>
  );
}
