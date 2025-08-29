import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import PortfolioSection from '@/components/PortfolioSection';
import RequirementsSection from '@/components/RequirementsSection';
import PricingSection from '@/components/PricingSection';
import GradientGlow from '@/components/GradientGlow';
import SectionSeparator from '@/components/SectionSeparator';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      <SectionSeparator />
      
      <div className="relative">
        <GradientGlow />
        <ServicesSection />
      </div>
      
      <SectionSeparator />
      
      <div className="relative">
        <GradientGlow intensity="light" />
        <ProcessSection />
      </div>
      
      <SectionSeparator />
      
      <div className="relative">
        <GradientGlow intensity="medium" />
        <RequirementsSection />
      </div>
      
      <SectionSeparator />
      
      <div className="relative">
        <GradientGlow intensity="strong" />
        <PricingSection />
      </div>
      
      <SectionSeparator />
      
      <div className="relative">
        <GradientGlow intensity="light" />
        <PortfolioSection />
      </div>
      
      <Footer />
    </main>
  );
}
