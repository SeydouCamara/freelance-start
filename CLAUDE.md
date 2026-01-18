# FreelanceStart - Accompagnateur Freelance

## Description
Web app d'accompagnement intelligent pour creer son activite freelance. Questionnaire interactif qui guide vers le meilleur statut juridique (Micro/EURL/SASU), puis recommande des partenaires affilies (banque, comptable, assurance).

## Stack Technique
- **Framework**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + Framer Motion 12
- **Backend**: PocketBase sur Hetzner VPS (37.27.247.194:8094)
- **Auth**: Magic link via PocketBase
- **Hebergement**: Vercel

## URLs
- **Production**: https://freelancestart.fr (a configurer)
- **Dev**: http://localhost:3000
- **PocketBase Admin**: http://37.27.247.194:8094/_/
- **Repo**: https://github.com/SeydouCamara/freelance-start

## Commandes

```bash
# Developpement
npm run dev

# Build production
npm run build

# Lancer en production
npm start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Structure du Projet

```
src/
├── app/
│   ├── layout.tsx              # Layout racine + metadata
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Design system complet
│   ├── questionnaire/          # Questionnaire multi-etapes
│   ├── resultats/              # Resultats + partenaires
│   ├── dashboard/              # Dashboard utilisateur
│   ├── auth/                   # Login/Verify magic link
│   └── api/                    # API routes
├── components/
│   ├── layout/                 # Header, Footer
│   ├── landing/                # HeroSection, HowItWorks, etc.
│   ├── questionnaire/          # QuestionCard, OptionButton
│   ├── results/                # StatusRecommendation, PartnerCard
│   ├── dashboard/              # ProgressOverview, ChecklistItem
│   └── ui/                     # Composants generiques
├── lib/
│   ├── types.ts                # Types TypeScript
│   ├── constants.ts            # Constantes app
│   ├── pocketbase.ts           # Client PocketBase
│   ├── recommendation-engine.ts # Moteur recommandation
│   ├── auth-context.tsx        # Context auth
│   └── questionnaire-context.tsx # Context questionnaire
└── data/
    ├── questions.ts            # Definition questions
    └── status-matrix.ts        # Matrice decision
```

## Design System (Pulsr.io inspired)

### Palette de couleurs
| Nom | Code | Usage |
|-----|------|-------|
| Charcoal | #211f1f | Fond principal |
| Charcoal Light | #2d2b2b | Fond eleve (cards) |
| Charcoal Dark | #171616 | Fond profond |
| Sage | #c3eda1 | Accent principal |
| Sage Light | #d4f4bc | Hover |
| Cream | #fffcec | Texte principal |
| Cream Muted | #c5c2b8 | Texte secondaire |

### Typographies (Google Fonts)
- **Display**: Poppins (titres, brand)
- **Body**: Inter (texte, navigation)

### Classes CSS utilitaires
```css
.btn-primary     /* Sage, hover vers light */
.btn-secondary   /* Transparent avec bordure sage */
.btn-ghost       /* Transparent */
.card            /* Card avec bordure sage/10 */
.input           /* Champs de formulaire */
.badge-sage      /* Badge sage */
```

## Moteur de Recommandation

### Matrice de decision
| Critere | Micro | EURL | SASU |
|---------|-------|------|------|
| Chomage + garder ARE | -30 | +10 | +40 |
| CA > 77K | 0 | +20 | +20 |
| Beaucoup de frais | -25 | +25 | +20 |
| Mission urgente | +10 | -5 | -5 |
| CA < 35K | +25 | -5 | -10 |

### Logique
1. Score de base: 50 pour chaque statut
2. Application des modificateurs selon reponses
3. Normalisation 0-100
4. Generation reasoning[] et warnings[]

## Collections PocketBase

### users (auth native)
- email, verified, firstName, lastName, referralCode, completedOnboarding

### questionnaire_responses
- user (relation), responses (JSON), sessionId, completedAt

### recommendations
- user, questionnaireResponse (relation), recommendedStatus, statusScores, reasoning[], warnings[]

### partners
- name, slug, category, logo, affiliateUrl, defaultAffiliateCode, features[], specialOffer

### user_progress
- user, recommendation (relations), checklistProgress[], completionPercentage

### affiliate_clicks
- user, partner (relations), sessionId, affiliateCode, converted

## Variables d'Environnement

```env
# PocketBase
NEXT_PUBLIC_POCKETBASE_URL=http://37.27.247.194:8094

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

## Business Model
- **Affiliation**: Shine, Qonto, Dougs, Legalstart, Hiscox, Jump (50-300EUR/inscription)
- **Fintech**: Partenariat avance de frais (5-10% commission)

## TODOs
- [x] Setup projet + design system
- [x] Landing page
- [x] Questionnaire multi-etapes (6 questions, animations, localStorage)
- [x] Moteur de recommandation (scoring Micro/EURL/SASU)
- [x] Page resultats (comparaison, warnings, checklist, partenaires)
- [ ] Auth magic link PocketBase
- [ ] Dashboard utilisateur
- [ ] Tracking affiliations
- [ ] Deploiement Vercel

## Status
- **Version**: 0.2.0
- **Stage**: Development (MVP Semaine 1-2)
- **Revenue**: 0 EUR/mois

## Changelog

### v0.2.0 (18/01/2026)
- Questionnaire interactif 6 questions avec cards animees (Framer Motion)
- Context provider avec persistence localStorage
- Moteur de recommandation avec matrice de scoring
- Page resultats complete: recommandation, comparaison statuts, warnings, checklist
- Grille partenaires affilies

### v0.1.0 (18/01/2026)
- Setup initial Next.js 16 + TypeScript + Tailwind 4
- Design system inspire Pulsr.io (dark mode)
- Landing page complete
