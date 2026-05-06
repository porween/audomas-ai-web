import { Layers, MessageSquareOff, BrainCircuit, CheckCircle2, TrendingUp, X } from "lucide-react";
import { useTranslations } from "next-intl";

export function AiSalesVsLegacySection() {
  const t = useTranslations("AiSalesVsLegacy");

  return (
    <section className="relative overflow-hidden border-b border-cyan-500/10 bg-[#020617]/50 py-24 backdrop-blur-md lg:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-1/2 bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="guardian-text text-3xl font-bold md:text-4xl">{t("title")}</h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="glass-enterprise relative overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/45 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,212,255,0.08)]">
            <div className="absolute left-0 top-0 h-1 w-full bg-slate-600/50" />
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-600/80 bg-slate-900/60">
                <Layers className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300">{t("bot_title")}</h3>
            </div>

            <ul className="mb-8 space-y-5">
              <li className="flex items-start gap-3">
                <MessageSquareOff className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                <span className="text-slate-400">{t("bot_1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500/70" />
                <span className="text-slate-400">{t("bot_2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500/70" />
                <span className="text-slate-400">{t("bot_3")}</span>
              </li>
            </ul>
            <div className="border-t border-white/10 pt-6">
              <p className="font-bold text-slate-500">{t("summary_bot")}</p>
            </div>
          </div>

          <div className="glass-enterprise relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#020617]/55 p-8 shadow-[0_0_40px_rgba(0,212,255,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,212,255,0.18)]">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-sky-500 to-cyan-400" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-[100px]" />

            <div className="relative z-10 mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 shadow-lg shadow-sky-900/40">
                <BrainCircuit className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t("ai_title")}</h3>
            </div>

            <ul className="relative z-10 mb-8 space-y-5">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />
                <span className="font-medium text-slate-200">{t("ai_1")}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />
                <span className="font-medium text-slate-200">{t("ai_2")}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-400" />
                <span className="font-medium text-slate-200">{t("ai_3")}</span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <span className="font-bold text-white">{t("ai_4")}</span>
              </li>
            </ul>
            <div className="relative z-10 border-t border-white/10 pt-6">
              <p className="text-lg font-bold text-sky-400">{t("summary_ai")}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <div className="glass-enterprise inline-block rounded-2xl border border-red-500/20 bg-[#020617]/70 px-6 py-4 shadow-[0_0_30px_rgba(239,68,68,0.08)] transition-transform duration-300 hover:-translate-y-0.5">
            <p className="text-lg font-bold text-red-400 md:text-xl">{t("killer_line")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
