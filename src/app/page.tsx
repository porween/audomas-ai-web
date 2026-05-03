import { SalesAgentHeroSection } from "@/components/landing/SalesAgentHeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { BeforeAfterSection } from "@/components/landing/BeforeAfterSection";
import { LiveDemoSection } from "@/components/landing/LiveDemoSection";
import { EnterpriseTrustSection } from "@/components/landing/EnterpriseTrustSection";
import { SalesUseCaseSection } from "@/components/landing/SalesUseCaseSection";
import { SalesFinalCtaSection } from "@/components/landing/SalesFinalCtaSection";

export default function Home() {
  return (
    <div className="bg-[#020617] min-h-screen text-slate-50 font-sans selection:bg-blue-500/30">
      <main className="flex flex-col w-full">
        <SalesAgentHeroSection />
        <HowItWorksSection />
        <BeforeAfterSection />
        <LiveDemoSection />
        <EnterpriseTrustSection />
        <SalesUseCaseSection />
        <SalesFinalCtaSection />
      </main>
    </div>
  );
}
