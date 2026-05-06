import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { SecurityArchitecturePage } from "@/components/landing/SecurityArchitecturePage";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SecurityPage" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#020617] font-sans selection:bg-cyan-500/30">
      <LandingNavbar />
      <SecurityArchitecturePage />
    </div>
  );
}
