"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Background blur */}
      <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-md border-b border-sage/10" />

      <div className="relative container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="w-6 h-6 text-sage transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-sage/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display text-xl text-cream">
              Freelance<span className="text-sage">Start</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#comment-ca-marche"
              className="text-cream-muted hover:text-cream transition-colors text-sm"
            >
              Comment ca marche
            </Link>
            <Link
              href="/#avantages"
              className="text-cream-muted hover:text-cream transition-colors text-sm"
            >
              Avantages
            </Link>
            <Link
              href="/#partenaires"
              className="text-cream-muted hover:text-cream transition-colors text-sm"
            >
              Partenaires
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/questionnaire" className="btn btn-primary btn-sm">
              Commencer gratuitement
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-cream"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal-light border-b border-sage/10"
          >
            <nav className="container-main py-4 flex flex-col gap-4">
              <Link
                href="/#comment-ca-marche"
                onClick={() => setIsMenuOpen(false)}
                className="text-cream-muted hover:text-cream transition-colors py-2"
              >
                Comment ca marche
              </Link>
              <Link
                href="/#avantages"
                onClick={() => setIsMenuOpen(false)}
                className="text-cream-muted hover:text-cream transition-colors py-2"
              >
                Avantages
              </Link>
              <Link
                href="/#partenaires"
                onClick={() => setIsMenuOpen(false)}
                className="text-cream-muted hover:text-cream transition-colors py-2"
              >
                Partenaires
              </Link>
              <div className="pt-2 border-t border-sage/10">
                <Link
                  href="/questionnaire"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Commencer gratuitement
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
