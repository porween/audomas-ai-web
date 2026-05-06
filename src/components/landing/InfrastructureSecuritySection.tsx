"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import { Video, Server, Workflow, BellRing, ChevronRight, Shield, Lock, Fingerprint } from "lucide-react";

const MIDNIGHT = "#020617";
const ELECTRIC_CYAN = "#00D4FF";
const NEON_GREEN = "#39FF14";

const sectionFont = {
  fontFamily: 'var(--font-urbanist), "Inter", ui-sans-serif, system-ui, sans-serif',
} as const;

const glass =
  "rounded-[1.75rem] border border-[#00D4FF]/18 bg-[#020617]/55 backdrop-blur-2xl " +
  "shadow-[inset_0_1px_0_0_rgba(0,212,255,0.14),0_12px_40px_rgba(0,0,0,0.45)]";

/** Stylized “camera frame”: full RGB vs depth anonymizer (PDPA-safe). */
function PrivacyComparisonPanels() {
  const t = useTranslations("InfraSecurity");

  const frameClass =
    "relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[#050a14] sm:min-h-[220px]";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={frameClass}>
        <div
          className="border-b border-white/[0.08] px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
          style={sectionFont}
        >
          {t("privacy_rgb_label")}
        </div>
        <div className="relative flex flex-1 items-end justify-center pb-6 pt-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(180deg, rgba(30,58,95,0.35) 0%, rgba(15,23,42,0.8) 100%)`,
            }}
          />
          <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(0,212,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.12)_1px,transparent_1px)] [background-size:14px_14px]" />
          {/* Person — sharp facial detail (illustrative) */}
          <div className="relative z-[1] flex flex-col items-center">
            <div
              className="relative z-[2] h-14 w-14 shrink-0 rounded-full border-2 border-white/35 shadow-lg"
              style={{
                background: `radial-gradient(circle at 35% 30%, #fcd9b6 0%, #c4a574 45%, #8b6914 100%)`,
                boxShadow: `inset 0 -4px 8px rgba(0,0,0,0.25)`,
              }}
            >
              <span className="absolute left-[28%] top-[38%] h-1 w-1 rounded-full bg-black/55" />
              <span className="absolute right-[28%] top-[38%] h-1 w-1 rounded-full bg-black/55" />
              <span className="absolute bottom-[28%] left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-black/35" />
            </div>
            <div className="-mt-1 h-24 w-[4.25rem] rounded-b-xl rounded-t-sm border border-white/25 bg-slate-600/90 shadow-md" />
          </div>
          <p
            className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-medium text-slate-500"
            style={sectionFont}
          >
            {t("privacy_rgb_hint")}
          </p>
        </div>
      </div>

      <div className={frameClass}>
        <div
          className="border-b border-white/[0.08] px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#00D4FF]"
          style={sectionFont}
        >
          {t("privacy_anon_label")}
        </div>
        <div className="relative flex flex-1 items-end justify-center pb-6 pt-8">
          <div
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              background: `radial-gradient(ellipse 80% 70% at 50% 100%, rgba(0,212,255,0.12), transparent 55%), linear-gradient(180deg, rgba(15,23,42,0.5), rgba(2,6,23,0.95))`,
            }}
          />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.1)_1px,transparent_1px)] [background-size:14px_14px]" />
          {/* Depth strip — AI still “sees” structure */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 opacity-90"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(0,212,255,0.25) 20%, rgba(57,255,20,0.2) 50%, rgba(0,212,255,0.22) 80%, transparent)`,
            }}
          />
          <div className="relative z-[1] mx-auto flex h-[168px] w-[7.5rem] items-end justify-center pb-1">
            {/* Full-person detection box — AI still operational */}
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 h-[155px] w-[5.75rem] -translate-x-1/2 rounded-lg border-2 border-[#22c55e]"
              style={{ boxShadow: `0 0 16px rgba(34,197,94,0.35)` }}
            />
            <span
              className="pointer-events-none absolute left-1/2 top-1 z-[4] -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#22c55e]"
              style={{
                background: "rgba(2,6,23,0.85)",
                boxShadow: `0 0 12px rgba(34,197,94,0.4)`,
              }}
            >
              {t("privacy_ai_track")}
            </span>
            <div className="relative flex flex-col items-center">
              <div className="relative">
                <div
                  className="relative z-[2] h-14 w-14 shrink-0 rounded-full border-2 border-white/20"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, #fcd9b6 0%, #c4a574 45%, #8b6914 100%)`,
                    filter: "blur(10px)",
                    opacity: 0.85,
                  }}
                />
                <div
                  className="absolute inset-0 z-[3] rounded-full border border-[#39FF14]/40 bg-slate-950/25 backdrop-blur-[2px]"
                  style={{ boxShadow: `inset 0 0 20px rgba(2,6,23,0.6)` }}
                />
              </div>
              <div className="-mt-1 h-24 w-[4.25rem] rounded-b-xl rounded-t-sm border border-slate-500/50 bg-slate-700/80 shadow-md" />
            </div>
          </div>
          <div className="absolute right-3 top-3 z-[5]">
            <span
              className="inline-flex items-center gap-1 rounded-full border border-[#39FF14]/35 bg-[#39FF14]/[0.12] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#39FF14]"
              style={{ textShadow: `0 0 10px ${NEON_GREEN}` }}
            >
              <Fingerprint className="h-3 w-3" strokeWidth={2} />
              {t("privacy_pdpa_badge")}
            </span>
          </div>
          <p
            className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-medium text-slate-500"
            style={sectionFont}
          >
            {t("privacy_anon_hint")}
          </p>
        </div>
      </div>
    </div>
  );
}

function FlowStep({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center">
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#00D4FF]/35 bg-[#00D4FF]/[0.08]"
        style={{ boxShadow: `0 0 20px rgba(0,212,255,0.15), inset 0 1px 0 rgba(0,212,255,0.2)` }}
      >
        <Icon className="h-7 w-7 text-[#00D4FF]" strokeWidth={1.35} style={{ filter: `drop-shadow(0 0 6px ${ELECTRIC_CYAN})` }} />
      </div>
      <p className="max-w-[9.5rem] text-xs font-semibold leading-snug text-slate-200 sm:text-sm" style={sectionFont}>
        {label}
      </p>
    </div>
  );
}

export function InfrastructureSecuritySection() {
  const t = useTranslations("InfraSecurity");

  const flow: { icon: LucideIcon; key: "flow_cctv" | "flow_edge" | "flow_n8n" | "flow_alerts" }[] = [
    { icon: Video, key: "flow_cctv" },
    { icon: Server, key: "flow_edge" },
    { icon: Workflow, key: "flow_n8n" },
    { icon: BellRing, key: "flow_alerts" },
  ];

  return (
    <section
      id="infrastructure-security"
      className="relative overflow-hidden py-24 lg:py-28"
      style={{ ...sectionFont, backgroundColor: MIDNIGHT }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-90"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -15%, rgba(0,212,255,0.06), transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 80%, rgba(57,255,20,0.04), transparent 45%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center lg:mb-16"
        >
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#00D4FF]">{t("eyebrow")}</p>
          <h2 className="mb-4 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-[2.35rem]">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-slate-400 sm:text-lg">{t("subtitle")}</p>
        </motion.div>

        <div className="mb-16 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/[0.08]"
                style={{ boxShadow: `0 0 18px rgba(0,212,255,0.12)` }}
              >
                <Shield className="h-5 w-5 text-[#00D4FF]" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white sm:text-xl">{t("privacy_title")}</h3>
                <p className="text-sm font-light text-slate-500">{t("privacy_subtitle")}</p>
              </div>
            </div>
          </div>
          <PrivacyComparisonPanels />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className={`${glass} mb-12 p-8 sm:p-10`}
        >
          <h3 className="mb-8 text-center text-lg font-bold text-white sm:text-xl">{t("architecture_title")}</h3>
          <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-start md:justify-center md:gap-2 lg:gap-4">
            {flow.map((step, i) => (
              <div key={step.key} className="flex flex-1 items-center md:contents">
                <FlowStep icon={step.icon} label={t(step.key)} />
                {i < flow.length - 1 ? (
                  <div className="hidden shrink-0 items-center justify-center pt-6 md:flex">
                    <ChevronRight className="h-6 w-6 text-[#00D4FF]/50" strokeWidth={1.5} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center md:hidden">
            <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">{t("flow_compact")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="flex flex-col items-center gap-4"
        >
          <div
            className="inline-flex max-w-full flex-wrap items-center justify-center gap-3 rounded-full border border-[#00D4FF]/35 bg-[#020617]/88 px-6 py-3.5 shadow-[0_8px_28px_-6px_rgba(0,212,255,0.22),inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <Lock className="h-5 w-5 shrink-0 text-[#39FF14]" strokeWidth={1.75} style={{ filter: `drop-shadow(0 0 8px ${NEON_GREEN})` }} />
            <span className="text-center text-sm font-bold tracking-tight text-white sm:text-base">{t("airgap_badge")}</span>
          </div>
          <p className="max-w-xl text-center text-sm font-light text-slate-500">{t("airgap_note")}</p>
        </motion.div>
      </div>
    </section>
  );
}
