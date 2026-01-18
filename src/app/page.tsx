import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  HowItWorks,
  BenefitsSection,
  PartnersSection,
  CTASection,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <BenefitsSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
