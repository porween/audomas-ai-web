"use client";

import { MessageSquare, BrainCircuit, Filter, BookOpen, Database, Bell, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export function SystemFlowSection() {
  const t = useTranslations('SystemFlow');

  const flowSteps = useMemo(() => [
    {
      id: 1,
      icon: MessageSquare,
      label: t('step1_label'),
      sub: t('step1_sub'),
      color: "text-green-400",
      bg: "bg-green-500/10 border-green-500/25",
      glow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]",
      dotColor: "bg-green-400",
    },
    {
      id: 2,
      icon: BrainCircuit,
      label: t('step2_label'),
      sub: t('step2_sub'),
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/25",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      dotColor: "bg-blue-400",
    },
    {
      id: 3,
      icon: Filter,
      label: t('step3_label'),
      sub: t('step3_sub'),
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/25",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
      dotColor: "bg-purple-400",
    },
    {
      id: 4,
      icon: BookOpen,
      label: t('step4_label'),
      sub: t('step4_sub'),
      color: "text-cyan-400",
      bg: "bg-cyan-500/10 border-cyan-500/25",
      glow: "shadow-[0_0_20px_rgba(34,211,238,0.15)]",
      dotColor: "bg-cyan-400",
    },
    {
      id: 5,
      icon: Database,
      label: t('step5_label'),
      sub: t('step5_sub'),
      color: "text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/25",
      glow: "shadow-[0_0_20px_rgba(251,146,60,0.15)]",
      dotColor: "bg-orange-400",
    },
    {
      id: 6,
      icon: Bell,
      label: t('step6_label'),
      sub: t('step6_sub'),
      color: "text-yellow-400",
      bg: "bg-yellow-500/10 border-yellow-500/25",
      glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]",
      dotColor: "bg-yellow-400",
    },
  ], [t]);
  return (
    <section className="relative py-20 lg:py-28 bg-[linear-gradient(180deg,#07111F_0%,#0A1525_100%)] border-b border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/6 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e293b]/80 border border-slate-700 text-slate-400 text-xs font-semibold mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {t('badge')}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {t("title_part1")}
            <span className="guardian-text">{t("title_part2")}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Flow — Desktop: horizontal pipeline */}
        <div className="hidden lg:block relative mb-12">
          {/* Pipeline connector line */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-green-500/30 via-cyan-500/40 to-yellow-500/30 z-0">
            <div className="h-full w-full bg-gradient-to-r from-green-400/60 via-cyan-400/60 to-yellow-400/60 animate-[pulse_3s_ease-in-out_infinite] opacity-70" />
          </div>

          <div className="grid grid-cols-6 gap-3 relative z-10">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center group">
                  {/* Icon node */}
                  <div
                    className={`w-[104px] h-[104px] rounded-2xl border ${step.bg} ${step.glow} flex flex-col items-center justify-center gap-2 relative transition-transform duration-300 group-hover:-translate-y-1.5`}
                  >
                    {/* Step number */}
                    <div className={`absolute -top-3 -right-3 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-black ${step.color}`}>
                      {step.id}
                    </div>
                    <Icon className={`w-7 h-7 ${step.color}`} />
                    {/* Pulsing dot */}
                    <span className={`w-1.5 h-1.5 rounded-full ${step.dotColor} animate-pulse`} />
                  </div>

                  {/* Arrow between nodes */}
                  {index < flowSteps.length - 1 && (
                    <div className="absolute" style={{ display: "none" }} />
                  )}

                  {/* Label below */}
                  <div className="mt-4 text-center">
                    <div className={`text-sm font-bold ${step.color} mb-0.5`}>{step.label}</div>
                    <div className="text-[11px] text-slate-500 leading-tight max-w-[100px] mx-auto">{step.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow overlays between nodes */}
          <div className="absolute top-[52px] left-0 right-0 flex items-center justify-between px-[calc(100%/12)] pointer-events-none z-20" style={{ transform: "translateY(-50%)" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <ArrowRight key={i} className="w-5 h-5 text-slate-600" />
            ))}
          </div>
        </div>

        {/* Flow — Mobile: vertical steps */}
        <div className="lg:hidden space-y-0 relative mb-12">
          {/* Vertical line */}
          <div className="absolute left-[2.2rem] top-0 bottom-0 w-px bg-gradient-to-b from-green-500/40 via-cyan-500/40 to-yellow-500/40 z-0" />

          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative z-10 flex items-start gap-4 pb-7 last:pb-0">
                {/* Icon */}
                <div className={`w-[4.4rem] h-[4.4rem] rounded-xl border ${step.bg} ${step.glow} flex items-center justify-center shrink-0 relative`}>
                  <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] font-black ${step.color}`}>{step.id}</div>
                  <Icon className={`w-6 h-6 ${step.color}`} />
                </div>
                {/* Text */}
                <div className="pt-2">
                  <div className={`text-sm font-bold ${step.color}`}>{step.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{step.sub}</div>
                </div>
                {/* Arrow */}
                {index < flowSteps.length - 1 && (
                  <div className="absolute left-[2rem] bottom-2 text-slate-700">
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M4 0v10M0 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom result bar */}
        <div className="max-w-3xl mx-auto bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(59,130,246,0.08))] border border-cyan-500/20 rounded-2xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-5 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
          <div className="text-center md:text-left">
            <div className="text-white font-bold text-base mb-1">{t('result_title')}</div>
            <div className="text-slate-400 text-sm">{t('result_desc')}</div>
          </div>
          <div className="flex gap-6 shrink-0">
            <div className="text-center">
              <div className="text-2xl font-black text-cyan-400">24/7</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t('result_auto')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-green-400">&lt;2s</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t('result_resp')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white">0</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">{t('result_lost')}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
