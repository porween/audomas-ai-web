import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { SalesAgentHeroSection } from "@/components/landing/SalesAgentHeroSection";
import { SystemFlowSection } from "@/components/landing/SystemFlowSection";
import { AIVisionSection } from "@/components/landing/AIVisionSection";
import { InfrastructureSecuritySection } from "@/components/landing/InfrastructureSecuritySection";
import { AiSalesVsLegacySection } from "@/components/landing/AiSalesVsLegacySection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { LiveDemoSection } from "@/components/landing/LiveDemoSection";
import { EnterpriseTrustSection } from "@/components/landing/EnterpriseTrustSection";
import { SalesUseCaseSection } from "@/components/landing/SalesUseCaseSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { SalesFinalCtaSection } from "@/components/landing/SalesFinalCtaSection";
import { HeritageOfExcellence } from "@/components/landing/HeritageOfExcellence";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-blue-500/30">
      <LandingNavbar />
      <main className="flex flex-col w-full pt-[72px]">
        <SalesAgentHeroSection />
        <SystemFlowSection />
        <AIVisionSection />
        <InfrastructureSecuritySection />
        <AiSalesVsLegacySection />
        <HowItWorksSection />
        <BeforeAfterSection />
        <LiveDemoSection />
        <EnterpriseTrustSection />
        <SalesUseCaseSection />
        <PricingSection />
        <HeritageOfExcellence />
        <SalesFinalCtaSection />
      </main>
    </div>
  );
}
