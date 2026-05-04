"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { 
  BarChart3, Users, Clock, ShieldAlert, HeartPulse, Search, 
  ArrowRight, Play, Eye, Zap, Camera, ShieldCheck, Activity
} from "lucide-react";
import Link from "next/link";

function SolutionCard({ 
  index, 
  title, 
  desc, 
  icon: Icon 
}: { 
  index: number, 
  title: string, 
  desc: string, 
  icon: any 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2rem] blur opacity-0 group-hover:opacity-10 transition duration-500"></div>
      
      <div className="relative h-full bg-[#0B1F33]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col gap-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
        
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-7 h-7 text-cyan-400" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight">{title}</h3>
          <div className="space-y-2">
            {desc.split(',').map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                <div className="w-1 h-1 rounded-full bg-cyan-400/50" />
                {item.trim()}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">Vision_Module_{index + 1}</span>
           <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-[#0B1F33] transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
           </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AIVisionSection() {
  const t = useTranslations('AIVision');

  const solutions = [
    { title: t('card1_title'), desc: t('card1_desc'), icon: BarChart3 },
    { title: t('card2_title'), desc: t('card2_desc'), icon: Users },
    { title: t('card3_title'), icon: Clock, desc: t('card3_desc') },
    { title: t('card4_title'), icon: ShieldAlert, desc: t('card4_desc') },
    { title: t('card5_title'), icon: HeartPulse, desc: t('card5_desc') },
    { title: t('card6_title'), icon: Search, desc: t('card6_desc') },
  ];

  return (
    <section id="ai-vision" className="py-24 lg:py-32 bg-[#0B1F33] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-3xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[12px] font-bold uppercase tracking-widest mb-6"
            >
              <Camera className="w-4 h-4" /> Professional AI Vision
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-8 tracking-tight leading-[1.1]">
              {t('title')}
            </h2>
            <p className="text-xl text-white/70 font-medium leading-relaxed max-w-2xl">
              {t('subtitle')}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-6">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Infrastructure</span>
                <span className="text-xs font-bold text-white flex items-center gap-2">
                   <ShieldCheck className="w-4 h-4 text-cyan-400" /> AirGapX Vault Enabled
                </span>
             </div>
             <div className="h-12 w-px bg-white/10" />
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Processing</span>
                <span className="text-xs font-bold text-white flex items-center gap-2">
                   <Activity className="w-4 h-4 text-blue-400" /> Edge AI Real-time
                </span>
             </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {solutions.map((sol, i) => (
            <SolutionCard key={i} index={i} {...sol} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-block p-[1.5px] rounded-[1.5rem] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_50px_rgba(37,99,235,0.4)] transition-all group"
           >
              <Link
                href="#demo"
                className="flex items-center gap-4 px-12 py-5 rounded-[1.4rem] bg-[#0B1F33] text-white font-bold text-lg hover:bg-transparent transition-colors"
              >
                <Play className="w-6 h-6 fill-white" />
                {t('cta')}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
           </motion.div>
           
           <p className="mt-8 text-sm text-slate-500 font-medium italic">
             {t('footer_note')}
           </p>
        </div>

      </div>
    </section>
  );
}
