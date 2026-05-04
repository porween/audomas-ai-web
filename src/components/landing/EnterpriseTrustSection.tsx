"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { 
  ShieldCheck, Lock, Database, FileCheck, ExternalLink, 
  ShieldAlert, Server, Zap, Cpu, Search, Fingerprint, Activity
} from "lucide-react";
import Link from "next/link";

// ── Components ───────────────────────────────────────────

function ImmutableBadge({ label }: { label: string }) {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function SecurityCard({ 
  index, 
  title, 
  desc, 
  icon: Icon, 
  cta, 
  href,
  isPremier = false,
  hasBadge = false,
  badgeText = ""
}: { 
  index: number, 
  title: string, 
  desc: string, 
  icon: any,
  cta?: string,
  href?: string,
  isPremier?: boolean,
  hasBadge?: boolean,
  badgeText?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`relative group ${isPremier ? "lg:col-span-1" : ""}`}
    >
      {/* Dynamic Scan Line Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-1/2 w-full z-10 pointer-events-none"
        animate={{ y: ["0%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className={`relative h-full bg-[#050b1a]/80 backdrop-blur-3xl border ${isPremier ? "border-cyan-500/30 ring-1 ring-cyan-500/20" : "border-white/5"} rounded-[2rem] p-8 overflow-hidden transition-all duration-500 group-hover:border-cyan-500/40 shadow-2xl`}>
        
        {/* Background Animation for Premier Card */}
        {isPremier && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-cyan-500/5 blur-[100px] animate-pulse-slow" />
             <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl" />
          </div>
        )}

        {hasBadge && <ImmutableBadge label={badgeText} />}

        <div className="relative z-20 flex flex-col h-full gap-6">
          <div className={`w-14 h-14 rounded-2xl ${isPremier ? "bg-cyan-500/10 border-cyan-500/20" : "bg-white/5 border-white/10"} flex items-center justify-center border transition-transform duration-500 group-hover:scale-110`}>
            {isPremier ? (
              <div className="relative">
                <Icon className="w-7 h-7 text-cyan-400 relative z-10" />
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-cyan-400"
                  animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
            ) : (
              <Icon className="w-7 h-7 text-slate-300 group-hover:text-cyan-400 transition-colors" />
            )}
          </div>

          <div>
            <h3 className={`text-xl font-bold mb-3 tracking-tight ${isPremier ? "text-cyan-400" : "text-white group-hover:text-cyan-400 transition-colors"}`}>
              {title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {desc}
            </p>
          </div>

          {cta && href && (
            <div className="mt-auto pt-6">
               <Link 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#050b1a] rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-[0_10px_30px_rgba(34,211,238,0.3)]"
              >
                 {cta} <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {!cta && (
            <div className="mt-auto pt-6 flex items-center gap-2.5">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Enterprise_Class_Secured</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
export function EnterpriseTrustSection() {
  const t = useTranslations('EnterpriseTrust');

  const securityFeatures = [
    { 
      isPremier: true,
      icon: ShieldCheck, 
      title: t('card_airgap_title'), 
      desc: t('card_airgap_desc'),
      cta: t('card_airgap_cta'),
      href: "https://airgapx.com"
    },
    { 
      icon: Search, 
      title: t('card_audit_title'), 
      desc: t('card_audit_desc'),
      hasBadge: true,
      badgeText: t('immutable_indicator')
    },
    { 
      icon: Lock, 
      title: t('card_infra_title'), 
      desc: t('card_infra_desc') 
    },
    { 
      icon: Database, 
      title: t('card_sovereignty_title'), 
      desc: t('card_sovereignty_desc') 
    },
  ];

  return (
    <section id="security" className="py-24 lg:py-32 bg-gradient-to-b from-[#0B1F33] via-[#050b1a] to-[#0B1F33] relative overflow-hidden">
      
      {/* Unified Security Shield Overlay (Visual Effect) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
         <div className="absolute inset-0 grid grid-cols-6 opacity-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-r border-cyan-500/20" />
            ))}
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[12px] font-black uppercase tracking-[0.2em] mb-6 shadow-2xl"
          >
            <ShieldAlert className="w-4 h-4" /> Cyber-Security Architecture
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            {t('title')}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 relative">
          {securityFeatures.map((feature, i) => (
            <SecurityCard 
              key={i} 
              index={i} 
              {...feature}
            />
          ))}
        </div>

        {/* Trust Signal & Infrastructure Badge */}
        <div className="flex flex-col items-center gap-8 border-t border-white/5 pt-16">
           <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 shadow-xl ring-1 ring-white/5">
                 <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Server className="w-4 h-4 text-emerald-400" />
                 </div>
                 <span className="text-[11px] font-black text-white uppercase tracking-[0.15em]">{t('trust_signal')}</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Audomas AI • Infrastructure Hardening V4.2</p>
           </div>

           <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-700">
              <div className="flex items-center gap-2 text-white font-black text-xs tracking-tighter"><Zap className="w-4 h-4 text-yellow-500" /> SOC 2 TYPE II</div>
              <div className="flex items-center gap-2 text-white font-black text-xs tracking-tighter"><Fingerprint className="w-4 h-4 text-cyan-400" /> GDPR/PDPA READY</div>
              <div className="flex items-center gap-2 text-white font-black text-xs tracking-tighter"><Cpu className="w-4 h-4 text-rose-500" /> ISO/IEC 27001</div>
              <div className="flex items-center gap-2 text-white font-black text-xs tracking-tighter"><Activity className="w-4 h-4 text-emerald-400" /> SLA 99.9%</div>
           </div>
        </div>

      </div>
    </section>
  );
}
