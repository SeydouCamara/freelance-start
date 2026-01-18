import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FreelanceStart | Accompagnateur intelligent pour creer son activite freelance",
  description:
    "Decouvrez le meilleur statut juridique pour votre activite freelance. Questionnaire personnalise, recommandations sur-mesure et partenaires de confiance.",
  keywords: [
    "freelance",
    "auto-entrepreneur",
    "micro-entreprise",
    "SASU",
    "EURL",
    "creation entreprise",
    "statut juridique",
    "ARE",
    "chomage",
  ],
  authors: [{ name: "FreelanceStart" }],
  openGraph: {
    title: "FreelanceStart | Lancez votre activite freelance",
    description:
      "Trouvez le statut juridique ideal pour votre projet freelance en quelques minutes.",
    url: "https://freelancestart.fr",
    siteName: "FreelanceStart",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreelanceStart | Lancez votre activite freelance",
    description:
      "Trouvez le statut juridique ideal pour votre projet freelance en quelques minutes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
