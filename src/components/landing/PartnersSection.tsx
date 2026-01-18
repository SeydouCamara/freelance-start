"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Shine", category: "Banque Pro" },
  { name: "Qonto", category: "Banque Pro" },
  { name: "Blank", category: "Banque Pro" },
  { name: "Dougs", category: "Comptabilite" },
  { name: "Indy", category: "Comptabilite" },
  { name: "Legalstart", category: "Juridique" },
  { name: "Hiscox", category: "Assurance" },
  { name: "Jump", category: "Portage" },
];

export function PartnersSection() {
  return (
    <section id="partenaires" className="py-20 md:py-32">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="badge badge-sage mb-4"
          >
            Partenaires
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl text-cream mb-4"
          >
            Des partenaires de confiance
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cream-muted max-w-2xl mx-auto"
          >
            Nous avons selectionne les meilleurs services pour accompagner votre
            lancement. Offres exclusives via FreelanceStart.
          </motion.p>
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card p-6 flex flex-col items-center justify-center text-center hover:border-sage/30 transition-all"
            >
              {/* Placeholder for logo */}
              <div className="w-16 h-16 rounded-xl bg-charcoal-dark flex items-center justify-center mb-4">
                <span className="text-2xl font-display text-sage">
                  {partner.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-semibold text-cream text-sm mb-1">
                {partner.name}
              </h3>
              <p className="text-cream-dark text-xs">{partner.category}</p>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-cream-dark text-sm mt-8"
        >
          Des partenariats nous permettent de vous proposer des offres exclusives.
          <br />
          Nous ne recommandons que des services que nous utilisons nous-memes.
        </motion.p>
      </div>
    </section>
  );
}
