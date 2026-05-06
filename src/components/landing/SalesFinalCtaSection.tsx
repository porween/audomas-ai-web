"use client";

import { Play, ArrowRight, Zap, Fingerprint, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function SalesFinalCtaSection() {
  const t = useTranslations('FinalCta');
  return (
    <section className="py-24 lg:py-32 bg-[#0B1F33] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            {t('title')}
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            {t('subtitle')}
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row sm:gap-5">
            <Link href="#live-demo" className="btn-audomas-primary-lg group w-full sm:w-auto">
              <Play className="h-6 w-6 fill-white" />
              {t("cta_demo")}
            </Link>
            <Link href="#pricing" className="btn-audomas-secondary-lg group w-full sm:w-auto">
              <Zap className="h-6 w-6 text-sky-400" />
              {t("cta_try")}
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="pt-16 flex flex-wrap items-center justify-center gap-8 opacity-40">
             <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-[0.3em]">
                <Fingerprint className="w-4 h-4 text-blue-500" /> {t('secured_log')}
             </div>
             <div className="w-1 h-1 rounded-full bg-slate-800" />
             <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-[0.3em]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> {t('airgap_storage')}
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
