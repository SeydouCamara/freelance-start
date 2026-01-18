import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-dark border-t border-sage/10">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-sage" />
              <span className="font-display text-lg text-cream">
                Freelance<span className="text-sage">Start</span>
              </span>
            </Link>
            <p className="text-cream-muted text-sm leading-relaxed">
              L&apos;accompagnateur intelligent pour lancer votre activite freelance
              en toute serenite.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-cream mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-cream-muted hover:text-sage text-sm transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/questionnaire" className="text-cream-muted hover:text-sage text-sm transition-colors">
                  Questionnaire
                </Link>
              </li>
              <li>
                <Link href="/#comment-ca-marche" className="text-cream-muted hover:text-sage text-sm transition-colors">
                  Comment ca marche
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="font-semibold text-cream mb-4">Ressources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/guide-statuts" className="text-cream-muted hover:text-sage text-sm transition-colors">
                  Guide des statuts
                </Link>
              </li>
              <li>
                <Link href="/simulateur" className="text-cream-muted hover:text-sage text-sm transition-colors">
                  Simulateur revenus
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-cream-muted hover:text-sage text-sm transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-cream mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/legal/mentions-legales" className="text-cream-muted hover:text-sage text-sm transition-colors">
                  Mentions legales
                </Link>
              </li>
              <li>
                <Link href="/legal/politique-confidentialite" className="text-cream-muted hover:text-sage text-sm transition-colors">
                  Politique de confidentialite
                </Link>
              </li>
              <li>
                <Link href="/legal/cgv" className="text-cream-muted hover:text-sage text-sm transition-colors">
                  CGV
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-sage/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream-dark text-sm">
            &copy; {currentYear} FreelanceStart. Tous droits reserves.
          </p>
          <p className="text-cream-dark text-xs">
            Made with <span className="text-sage">&#9829;</span> for freelancers
          </p>
        </div>
      </div>
    </footer>
  );
}
