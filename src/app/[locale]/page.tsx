import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { SalesAgentHeroSection } from "@/components/landing/SalesAgentHeroSection";
import { SystemFlowSection } from "@/components/landing/SystemFlowSection";
import { AIVisionSection } from "@/components/landing/AIVisionSection";
import { ChatbotVsAiSection } from "@/components/landing/ChatbotVsAiSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { LiveDemoSection } from "@/components/landing/LiveDemoSection";
import { EnterpriseTrustSection } from "@/components/landing/EnterpriseTrustSection";
import { SalesUseCaseSection } from "@/components/landing/SalesUseCaseSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { SalesFinalCtaSection } from "@/components/landing/SalesFinalCtaSection";

export default function Home() {
  return (
    <div className="bg-[linear-gradient(135deg,#0b1220_0%,#0f1b35_50%,#0a2540_100%)] min-h-screen text-slate-50 font-sans selection:bg-blue-500/30">
      <LandingNavbar />
      <main className="flex flex-col w-full pt-[72px]">
        <SalesAgentHeroSection />
        <SystemFlowSection />
        <AIVisionSection />
        <ChatbotVsAiSection />
        <HowItWorksSection />
        <BeforeAfterSection />
        <LiveDemoSection />
        <EnterpriseTrustSection />
        <SalesUseCaseSection />
        <PricingSection />
        <SalesFinalCtaSection />
      </main>
    </div>
  );
}
