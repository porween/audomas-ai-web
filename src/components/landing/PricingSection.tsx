"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { 
  Check, ArrowRight, Zap, TrendingUp, ShieldCheck, 
  HeartPulse, Car, ShoppingBag, Crown, Sparkles, Building2
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type SolutionId = "clinic" | "car" | "retail";

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
        <Check className="w-3 h-3 text-cyan-400" />
      </div>
      <span className="text-[13px] text-slate-300 font-medium group-hover:text-white transition-colors leading-tight">{text}</span>
    </div>
  );
}

function PricingCard({ 
  plan, 
  price, 
  features, 
  isRecommended = false, 
  roiMsg,
  priceSuffix,
  t 
}: { 
  plan: string, 
  price: string, 
  features: string[], 
  isRecommended?: boolean, 
  roiMsg: string,
  priceSuffix: string,
  t: any 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {isRecommended && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
           <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full shadow-lg border border-white/20">
              {t('recommended')}
           </div>
        </div>
      )}

      <div className={`relative h-full bg-[#0b1220]/80 backdrop-blur-3xl border ${isRecommended ? "border-cyan-500/40 ring-1 ring-cyan-500/20" : "border-white/5"} rounded-[2.5rem] p-10 flex flex-col transition-all duration-500 group-hover:border-cyan-500/40 shadow-2xl overflow-hidden`}>
        
        {/* Background Decorative */}
        <div className={`absolute top-0 right-0 w-32 h-32 ${isRecommended ? "bg-cyan-500/10" : "bg-blue-500/5"} blur-3xl pointer-events-none`} />
        
        <div className="mb-8">
           <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{plan}</span>
              {isRecommended && <Sparkles className="w-5 h-5 text-yellow-400" />}
           </div>
           <div className="flex items-baseline gap-1.5">
              {price !== "Custom" && <span className="text-sm font-bold text-slate-400">฿</span>}
              <span className={`${price.length > 6 ? "text-[2.5rem]" : "text-[3.5rem]"} font-black text-white leading-none tracking-tighter`}>{price}</span>
              {price !== "Custom" && <span className="text-sm font-bold text-slate-500">{priceSuffix}</span>}
           </div>
        </div>

        <div className="space-y-4 mb-10 flex-1">
           {features.map((f, i) => (
             <FeatureItem key={i} text={f} />
           ))}
        </div>

        <div className="pt-8 border-t border-white/5 mt-auto">
           <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">
                 <TrendingUp className="w-3 h-3" /> VALUE PROPOSITION
              </div>
              <p className="text-[12px] text-white/70 font-bold leading-tight">{roiMsg}</p>
           </div>

           <Link 
            href="#demo"
            className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${isRecommended ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:scale-[1.03] active:scale-[0.97]" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"}`}
           >
              {t('cta')} <ArrowRight className="w-4 h-4" />
           </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function PricingSection() {
  const t = useTranslations('Pricing');
  const [activeSolution, setActiveSolution] = useState<SolutionId>("clinic");

  const solutions = [
    { id: "clinic", label: t('tab_clinic'), icon: HeartPulse },
    { id: "car",    label: t('tab_car'),    icon: Car },
    { id: "retail", label: t('tab_retail'), icon: ShoppingBag },
  ];

  const plans = {
    clinic: [
      { plan: t('plan_starter'), price: t('starter_price_clinic'), features: (t.raw('features.starter') as string[]) },
      { plan: t('plan_growth'),  price: t('growth_price_clinic'),  features: (t.raw('features.growth') as string[]), isRecommended: true },
      { plan: t('plan_pro'),     price: t('pro_price_clinic'),     features: (t.raw('features.pro') as string[]) },
    ],
    car: [
      { plan: t('plan_starter'), price: "14,900", features: (t.raw('features.starter') as string[]) },
      { plan: t('plan_growth'),  price: "29,900",  features: (t.raw('features.growth') as string[]), isRecommended: true },
      { plan: t('plan_pro'),     price: "69,000+", features: (t.raw('features.pro') as string[]) },
    ],
    retail: [
      { plan: t('plan_starter'), price: "12,900", features: (t.raw('features.starter') as string[]) },
      { plan: t('plan_growth'),  price: "24,900",  features: (t.raw('features.growth') as string[]), isRecommended: true },
      { plan: t('plan_pro'),     price: "59,000+", features: (t.raw('features.pro') as string[]) },
    ]
  };

  // Add Enterprise to each solution if needed, or keep it separate.
  const enterprisePlan = {
    plan: t('plan_enterprise'),
    price: t('enterprise_price'),
    features: (t.raw('features.enterprise') as string[]),
    isRecommended: false
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-[#0B1F33] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Crown className="w-4 h-4" /> Investment & Growth
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            {t('title')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Solution Switcher */}
        <div className="flex justify-center mb-20">
           <div className="inline-flex p-1.5 rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
              {solutions.map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => setActiveSolution(sol.id as SolutionId)}
                  className={`flex items-center gap-3 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 ${activeSolution === sol.id ? "bg-white text-[#0B1F33] shadow-xl scale-[1.02]" : "text-slate-400 hover:text-white"}`}
                >
                  <sol.icon className={`w-4 h-4 ${activeSolution === sol.id ? "text-blue-600" : "text-slate-500"}`} />
                  {sol.label}
                </button>
              ))}
           </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           <AnimatePresence mode="wait">
              {[...plans[activeSolution], enterprisePlan].map((plan, i) => (
                <PricingCard 
                  key={`${activeSolution}-${plan.plan}`}
                  roiMsg={t('roi_forecast')}
                  priceSuffix={t('price_suffix')}
                  t={t}
                  {...plan} 
                />
              ))}
           </AnimatePresence>
        </div>

        {/* Setup Fee Note */}
        <div className="text-center mb-24">
           <p className="text-slate-500 text-sm font-medium">
              * {t('setup_fee')}
           </p>
        </div>

        {/* Feature Groups / Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-20 border-t border-white/5">
           <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-2">
                 <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg">{t('feature1_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t('feature1_desc')}</p>
           </div>
           <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-2">
                 <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-white font-bold text-lg">{t('feature2_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t('feature2_desc')}</p>
           </div>
           <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-2">
                 <Building2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-white font-bold text-lg">{t('feature3_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t('feature3_desc')}</p>
           </div>
           <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-2">
                 <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-bold text-lg">{t('feature4_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t('feature4_desc')}</p>
           </div>
        </div>

      </div>
    </section>
  );
}
