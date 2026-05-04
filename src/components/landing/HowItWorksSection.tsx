"use client";

import { 
  MessageSquare, BrainCircuit, Activity, Globe, Send, ShieldCheck, Play, ArrowRight, Zap, Database, 
  Layers, Filter, FileText, Share2, Target, CheckCircle2, Cpu, ShieldAlert, TrendingUp, Sparkles,
  Search, BarChart3, Fingerprint, Lock, RefreshCcw
} from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

// ── Components ───────────────────────────────────────────

function MetricBadge({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
      <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{label}:</span>
      <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-tighter">{value}</span>
    </div>
  );
}

function StepCard({ 
  index, 
  title, 
  desc, 
  icon: Icon, 
  metrics,
  hasTooltip = false
}: { 
  index: number, 
  title: string, 
  desc: string, 
  icon: any,
  metrics: { label: string, value: string }[],
  hasTooltip?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`}></div>
      
      <div className="relative h-full bg-[#0B1220]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest">STAGE_{index + 1}</span>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
          <p className="text-slate-400 text-xs leading-relaxed font-medium">{desc}</p>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {metrics.map((m, i) => (
            <MetricBadge key={i} label={m.label} value={m.value} />
          ))}
        </div>

        {/* Lead Intel Preview Tooltip (Step 6) */}
        {hasTooltip && isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-full left-0 right-0 mb-4 z-30 pointer-events-none"
          >
             <div className="bg-[#0f172a] border border-white/10 rounded-xl p-4 shadow-2xl ring-1 ring-white/5">
                <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-2">
                   <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Lead Snapshot</span>
                      <span className="text-[8px] text-slate-500 font-bold uppercase">Status: Ready to Close</span>
                   </div>
                </div>
                <div className="space-y-1.5">
                   <div className="flex justify-between text-[9px] font-bold"><span className="text-slate-500 uppercase">Intent:</span> <span className="text-emerald-400">98% (Purchase)</span></div>
                   <div className="flex justify-between text-[9px] font-bold"><span className="text-slate-500 uppercase">Budget:</span> <span className="text-white">฿650,000+</span></div>
                   <div className="flex justify-between text-[9px] font-bold"><span className="text-slate-500 uppercase">Summary:</span> <span className="text-slate-300">Interested in SUV 2024 (Loan)</span></div>
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0f172a] border-r border-b border-white/10 rotate-45 -mt-1.5" />
             </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Section ─────────────────────────────────────────

export function HowItWorksSection() {
  const t = useTranslations('HowItWorks');
  const containerRef = useRef(null);

  const steps = [
    { 
      icon: Layers, 
      title: t('step1_title'), 
      desc: t('step1_desc'),
      metrics: [{ label: "Input", value: "LINE/FB/CRM" }, { label: "Delay", value: "0.0s" }]
    },
    { 
      icon: Search, 
      title: t('step2_title'), 
      desc: t('step2_desc'),
      metrics: [{ label: "Engine", value: "Reasoning V2" }, { label: "Time", value: "0.8s" }]
    },
    { 
      icon: Filter, 
      title: t('step3_title'), 
      desc: t('step3_desc'),
      metrics: [{ label: "Scoring", value: "Dynamic" }, { label: "Intent", value: "High" }]
    },
    { 
      icon: FileText, 
      title: t('step4_title'), 
      desc: t('step4_desc'),
      metrics: [{ label: "Quote", value: "Automated" }, { label: "Accuracy", value: "100%" }]
    },
    { 
      icon: Database, 
      title: t('step5_title'), 
      desc: t('step5_desc'),
      metrics: [{ label: "Sync", value: "CRM" }, { label: "Secured", value: "AirGapX" }]
    },
    { 
      icon: Target, 
      title: t('step6_title'), 
      desc: t('step6_desc'),
      metrics: [{ label: "Alert", value: "Human Team" }, { label: "Win-Rate", value: "+45%" }],
      hasTooltip: true
    },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-[#070B14] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Cpu className="w-3.5 h-3.5" /> Engine Workflow
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Autonomous <span className="bg-[linear-gradient(90deg,#22D3EE,#60A5FA)] bg-clip-text text-transparent">Sales Engine</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Pipeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 relative">
          {/* Sequential Path Animation (Abstract Visualization) */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
             <svg className="w-full h-full opacity-10" viewBox="0 0 1200 800" fill="none">
                <motion.path 
                  d="M100 200 L500 200 L500 400 L900 400 L900 600" 
                  stroke="url(#gradient)" 
                  strokeWidth="2" 
                  strokeDasharray="10 10"
                  animate={{ strokeDashoffset: [-100, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                   <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop stopColor="#2563EB" />
                      <stop offset="1" stopColor="#06B6D4" />
                   </linearGradient>
                </defs>
             </svg>
          </div>

          {steps.map((step, i) => (
            <StepCard 
              key={i} 
              index={i} 
              {...step}
            />
          ))}
        </div>

        {/* Security & Summary Layer */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-12 text-center">
            
            {/* AirGapX Security Badge */}
            <div className="flex flex-col items-center gap-3">
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] shadow-xl">
                  <Lock className="w-3.5 h-3.5 text-blue-500" /> Secured by <span className="text-white">AirGapX™ Vault</span>
               </div>
               <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Private AI Infrastructure • Enterprise Data Sovereignty</p>
            </div>

            {/* Final Impact Summary */}
            <div className="space-y-8">
               <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white font-black text-xl md:text-2xl tracking-tighter italic opacity-80">
                  <span className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-yellow-400" /> Maximize Revenue.</span>
                  <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <span className="flex items-center gap-2"><RefreshCcw className="w-5 h-5 text-cyan-400" /> Minimize Response.</span>
                  <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <span className="flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-rose-500" /> Zero Lost Ops.</span>
               </div>

               <Link
                href="#demo"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[linear-gradient(90deg,#2563EB,#06B6D4,#8B5CF6)] hover:brightness-110 text-white rounded-[1.25rem] font-black text-lg transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-[0_0_40px_rgba(34,211,238,0.4)] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] animate-pulse" />
                <Play className="w-6 h-6 fill-white" />
                {t('cta_button')}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
