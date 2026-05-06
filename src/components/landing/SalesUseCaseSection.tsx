"use client";

import { useTranslations } from "next-intl";
import { 
  MessageCircle, 
  MessageSquare, 
  Share2, 
  Smartphone, 
  Globe, 
  Stethoscope, 
  CarFront, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Zap,
  ArrowRightLeft,
  DollarSign,
  Briefcase,
  ShieldCheck,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function SalesUseCaseSection() {
  const t = useTranslations('UseCase');

  const useCases = [
    {
      id: "clinic",
      title: t('clinic_title'),
      description: "Automated booking and inquiry management for premium health and beauty services.",
      icon: Stethoscope,
      theme: "purple",
      gradient: "from-fuchsia-600 to-pink-600",
      glowColor: "bg-fuchsia-500",
      borderColor: "group-hover:border-fuchsia-500/50",
      flow: t.raw('clinic_flow') as string[],
      before: t('clinic_before'),
      after: t('clinic_after'),
      result: t('clinic_result'),
      revenue: t('clinic_revenue')
    },
    {
      id: "car",
      title: t('car_title'),
      description: "High-ticket sales lead qualification and automated installment plan calculation.",
      icon: CarFront,
      theme: "orange",
      gradient: "from-orange-500 to-amber-500",
      glowColor: "bg-orange-500",
      borderColor: "group-hover:border-orange-500/50",
      flow: t.raw('car_flow') as string[],
      before: t('car_before'),
      after: t('car_after'),
      result: t('car_result'),
      revenue: t('car_revenue')
    },
    {
      id: "sme",
      title: t('sme_title'),
      description: "Direct-to-consumer sales automation with personalized product recommendations.",
      icon: Smartphone,
      theme: "green",
      gradient: "from-emerald-500 to-cyan-500",
      glowColor: "bg-emerald-500",
      borderColor: "group-hover:border-emerald-500/50",
      flow: t.raw('sme_flow') as string[],
      before: t('sme_before'),
      after: t('sme_after'),
      result: t('sme_result'),
      revenue: t('sme_revenue')
    },
    {
      id: "enterprise",
      title: t('enterprise_title'),
      description: "B2B sales workflow automation with CRM synchronization and audit compliance.",
      icon: Briefcase,
      theme: "blue",
      gradient: "from-blue-600 to-indigo-600",
      glowColor: "bg-blue-500",
      borderColor: "group-hover:border-blue-500/50",
      flow: t.raw('enterprise_flow') as string[],
      before: t('enterprise_before'),
      after: t('enterprise_after'),
      result: t('enterprise_result'),
      revenue: t('enterprise_revenue')
    }
  ];

  return (
    <section id="solutions" className="py-24 lg:py-40 bg-[#060B18] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(29,78,216,0.15),transparent_60%)]" />
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[800px] h-[800px] bg-indigo-500/5 blur-[160px] rounded-full pointer-events-none translate-x-1/2" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Cpu className="w-3.5 h-3.5" />
            Solutions Ecosystem
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight"
          >
            {t('title')}
          </motion.h2>
          
          {/* Channel Coverage Strip (Premium Redesign) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-col lg:flex-row items-center gap-6 lg:gap-10 bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-10 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Share2 className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">{t('channels')}</span>
            </div>
            
            <div className="h-px w-20 bg-white/10 lg:h-6 lg:w-px" />

            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-300">
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
                  <MessageCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">LINE</span>
              </div>
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-9 h-9 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Facebook</span>
              </div>
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-9 h-9 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20 group-hover:bg-pink-500/20 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all">
                  <Share2 className="w-5 h-5 text-pink-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Instagram</span>
              </div>
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">TikTok</span>
              </div>
              <div className="flex items-center gap-2.5 group cursor-default">
                <div className="w-9 h-9 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all">
                  <Globe className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Website</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {useCases.map((useCase, idx) => (
            <motion.div 
              key={useCase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-700 pointer-events-none`} />
              
              <div className={`relative h-full bg-[#0F172A]/40 backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] p-8 lg:p-10 transition-all duration-500 hover:scale-[1.02] hover:border-white/20 group-hover:shadow-[0_20px_80px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col`}>
                {/* Decorative Inner Glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 ${useCase.glowColor} opacity-[0.08] blur-[80px] rounded-full group-hover:opacity-20 transition-opacity duration-700`} />
                
                {/* Header */}
                <div className="flex items-center gap-6 mb-10">
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                    className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex shrink-0 items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] group-hover:border-white/20 transition-all relative overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <useCase.icon className={`w-8 h-8 text-white relative z-10`} />
                    <div className={`absolute inset-0 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]`} />
                  </motion.div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase leading-none">{useCase.title}</h3>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">{useCase.description}</p>
                  </div>
                </div>

                {/* Sales Flow Visual (Modern List) */}
                <div className="mb-10 space-y-5">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Automation Protocol</div>
                  {useCase.flow.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-4 group/step">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black z-10 transition-all duration-500 ${sIdx === 3 ? `bg-gradient-to-br ${useCase.gradient} text-white shadow-lg` : "bg-white/5 text-slate-500 border border-white/10 group-hover/step:text-white group-hover/step:border-white/20"}`}>
                        {sIdx + 1}
                      </div>
                      <span className={`text-[13px] font-bold tracking-tight transition-colors duration-500 ${sIdx === 3 ? "text-white" : "text-slate-400 group-hover/step:text-slate-200"}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Comparison Section (Glass Cards) */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 relative overflow-hidden group/before">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 blur-2xl rounded-full" />
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500/60" />
                      <span className="text-[9px] font-black text-rose-500/40 uppercase tracking-[0.2em]">Manual Legacy</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{useCase.before}</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 relative overflow-hidden group/after">
                    <div className={`absolute top-0 right-0 w-16 h-16 ${useCase.glowColor} opacity-10 blur-2xl rounded-full`} />
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-3.5 h-3.5 text-white/60" />
                      <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Audomas AI</span>
                    </div>
                    <p className="text-[11px] text-slate-200 font-bold leading-relaxed">{useCase.after}</p>
                  </div>
                </div>

                {/* Result Section (Premium Banner) */}
                <div className="mt-auto pt-8 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Business Outcome</span>
                    </div>
                    <span className="text-lg font-black text-white tracking-tight">{useCase.result}</span>
                  </div>
                  <div className={`px-5 py-3 rounded-xl bg-gradient-to-br ${useCase.gradient} shadow-lg relative group/price overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/price:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-2 relative z-10">
                      <DollarSign className="w-4 h-4 text-white/80" />
                      <span className="text-lg font-black text-white tabular-nums tracking-tighter">{useCase.revenue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Improved CTA Section (Ultra Premium) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-blue-600/10 blur-[140px] rounded-full -z-10 pointer-events-none" />
          
          <h3 className="text-2xl md:text-4xl font-black text-white mb-10 max-w-4xl mx-auto leading-tight [text-wrap:balance]">
            {t('killer_line')}
          </h3>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="#live-demo"
              className="btn-audomas-primary-lg !text-[12px] font-black uppercase tracking-[0.2em]"
            >
              <Zap className="h-4 w-4 text-sky-100" />
              {t("cta_action")}
            </Link>
            <Link
              href="#pricing"
              className="btn-audomas-secondary-lg group !text-[12px] font-black uppercase tracking-[0.2em]"
            >
              {t("cta_pricing", { defaultValue: "View Pricing" })}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>

          <div className="mt-16 flex items-center justify-center gap-10 opacity-30">
            <ShieldCheck className="w-6 h-6 text-white" />
            <div className="h-px w-20 bg-white" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Enterprise Ready</span>
            <div className="h-px w-20 bg-white" />
            <Globe className="w-6 h-6 text-white" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

