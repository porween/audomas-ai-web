"use client";

import type { ComponentProps } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  CassetteTape,
  Check,
  ChevronRight,
  Eye,
  FileSearch,
  Fingerprint,
  Globe2,
  HardDrive,
  Lock,
  Send,
  Server,
  Shield,
  ShieldCheck,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { AudomasLogo } from "@/components/ui/AudomasLogo";
import { HeritageOfExcellence } from "@/components/landing/HeritageOfExcellence";

const AIRGAPX_URL = "https://airgapx.com";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function OrchestratorFlowHint() {
  const t = useTranslations("SecurityPage");
  return (
    <p className="mt-6 text-center text-[11px] font-medium leading-snug text-slate-500">
      <span className="text-cyan-400/90">{t("orchestrator_flow_compact")}</span>
      <span className="mx-1.5 text-slate-600">·</span>
      <span>{t("orchestrator_flow_note")}</span>
    </p>
  );
}

/** Privacy Shield — Full RGB vs depth-safe anonymized signal (PDPA narrative). */
function PrivacyShieldCompareStrip() {
  const t = useTranslations("SecurityPage");
  const frame =
    "relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#050a14] sm:min-h-[220px]";
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto mt-16 max-w-5xl lg:mt-20"
      aria-labelledby="privacy-shield-heading"
    >
      <div className="mb-8 text-center">
        <h2 id="privacy-shield-heading" className="text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {t("privacy_compare_title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-slate-400">{t("privacy_compare_subtitle")}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className={frame}>
          <div className="border-b border-white/[0.08] px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {t("privacy_compare_rgb_label")}
          </div>
          <div className="relative flex flex-1 flex-col items-center justify-end pb-5 pt-10">
            <div
              className="relative z-[1] h-28 w-20 rounded-lg border-2 border-white/25 shadow-lg"
              style={{
                background: "linear-gradient(180deg, rgba(30,58,95,0.5) 0%, rgba(15,23,42,0.9) 100%)",
              }}
            />
            <div
              className="absolute bottom-8 left-1/2 z-[2] h-16 w-16 -translate-x-1/2 rounded-full border-2 border-amber-200/40 shadow-md"
              style={{
                background: "radial-gradient(circle at 35% 30%, #fcd9b6 0%, #8b6914 100%)",
              }}
            />
            <p className="absolute bottom-2 left-0 right-0 px-3 text-center text-[10px] text-slate-500">{t("privacy_compare_rgb_hint")}</p>
          </div>
        </div>
        <div className={frame}>
          <div className="border-b border-white/[0.08] px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#00D4FF]">
            {t("privacy_compare_depth_label")}
          </div>
          <div className="relative flex flex-1 flex-col items-center justify-end pb-5 pt-10">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(148,163,184,0.12) 3px, rgba(148,163,184,0.12) 4px)",
              }}
            />
            <div className="relative z-[1] h-28 w-20 rounded-lg border border-slate-500/50 bg-slate-800/90 shadow-inner" />
            <div
              className="absolute bottom-10 left-1/2 z-[2] h-16 w-16 -translate-x-1/2 rounded-full border border-[#39FF14]/35 opacity-90"
              style={{
                background: "radial-gradient(circle, rgba(100,116,139,0.35) 0%, rgba(15,23,42,0.95) 70%)",
                filter: "blur(6px)",
              }}
            />
            <p className="absolute bottom-2 left-0 right-0 px-3 text-center text-[10px] text-slate-500">{t("privacy_compare_depth_hint")}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function AirGapXPremiumCard({
  motionProps,
  compact = false,
}: {
  motionProps?: Pick<ComponentProps<typeof motion.div>, "initial" | "whileInView" | "viewport" | "transition">;
  compact?: boolean;
}) {
  const t = useTranslations("SecurityPage");
  const mp = motionProps ?? {};

  const inner = (
    <div
      className={[
        "relative overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-gradient-to-b from-white/[0.09] to-slate-950/55 shadow-[0_24px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl",
        compact ? "p-5" : "p-6 sm:p-7",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-30%,rgba(226,232,240,0.07),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-slate-400/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
        <div className="mb-4 w-full rounded-xl border border-emerald-500/25 bg-emerald-500/[0.07] px-3 py-2.5 text-left shadow-[0_0_24px_rgba(16,185,129,0.12)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-200/95">{t("airgapx_offline_badge")}</p>
          <p className="mt-1.5 text-[12px] font-normal leading-snug text-slate-300">{t("airgapx_offline_note")}</p>
        </div>
        <div className="mb-4 flex w-full flex-wrap items-center justify-center gap-3 sm:justify-start">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-300/35 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_32px_rgba(15,23,42,0.4)] backdrop-blur-md">
            <CassetteTape className="h-7 w-7 text-slate-200" strokeWidth={1.5} />
          </div>
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.08] shadow-[0_0_28px_rgba(16,185,129,0.15),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
            <Shield className="h-7 w-7 text-emerald-200/95" strokeWidth={1.5} />
            <span className="absolute -bottom-1 -right-1 flex h-7 min-w-[1.75rem] items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-950/90 px-1 text-[8px] font-bold tabular-nums text-emerald-300 shadow-lg">
              100%
            </span>
          </div>
        </div>

        <p className="bg-gradient-to-r from-slate-100 via-white to-slate-300 bg-clip-text text-xl font-semibold tracking-tight text-transparent sm:text-2xl">
          {t("synergy_fortress_name")}
        </p>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{t("synergy_fortress_role")}</p>

        <p className="mt-4 text-[15px] font-semibold leading-snug text-white [text-wrap:balance] sm:text-base">
          {t("airgapx_tagline")}
        </p>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1.5 text-[11px] font-medium text-emerald-100/95">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" strokeWidth={2} />
          {t("airgapx_ransomware")}
        </div>

        {!compact ? (
          <p className="mt-4 text-sm font-normal leading-relaxed text-slate-400">{t("synergy_fortress_desc")}</p>
        ) : null}

        <div className={compact ? "mt-4 w-full" : "mt-6 w-full"}>
          <a
            href={AIRGAPX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-full min-h-[46px] items-center justify-center gap-2 overflow-hidden rounded-xl border border-slate-400/35 bg-gradient-to-r from-slate-800/80 via-slate-900/90 to-slate-950/95 px-5 py-3 text-sm font-semibold text-slate-100 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-slate-300/50 hover:shadow-[0_0_36px_rgba(226,232,240,0.22),0_0_64px_rgba(148,163,184,0.18)] hover:brightness-110 sm:w-auto"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative">{t("airgapx_cta")}</span>
            <ArrowUpRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
          </a>
          <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:text-left">
            {t("airgapx_cta_caption")}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      {...mp}
      className="relative rounded-[1.4rem] p-[1px] shadow-[0_28px_100px_rgba(0,0,0,0.5)]"
      style={{
        background: "linear-gradient(135deg, rgba(226,232,240,0.55) 0%, rgba(148,163,184,0.35) 35%, rgba(71,85,105,0.45) 65%, rgba(203,213,225,0.4) 100%)",
      }}
    >
      {inner}
    </motion.div>
  );
}

const AUDIT_LOG_KEYS = ["audit_log_1", "audit_log_2", "audit_log_3", "audit_log_4"] as const;

function ComplianceAuditSection() {
  const t = useTranslations("SecurityPage");
  const lines = useMemo(() => AUDIT_LOG_KEYS.map((k) => t(k)), [t]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % AUDIT_LOG_KEYS.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto mt-20 max-w-6xl lg:mt-28"
      aria-labelledby="compliance-audit-heading"
    >
      <div className="mb-10 text-center lg:mb-12">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/95">
          <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
          {t("compliance_badge")}
        </div>
        <h2 id="compliance-audit-heading" className="text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {t("compliance_title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm font-normal leading-relaxed text-slate-400 sm:text-base">
          {t("compliance_subtitle")}
        </p>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#060d18]/90 shadow-[0_28px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl ring-1 ring-cyan-500/10"
          animate={{ boxShadow: ["0 28px 80px rgba(0,0,0,0.5)", "0 28px 88px rgba(34,211,238,0.08)", "0 28px 80px rgba(0,0,0,0.5)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#0a1422]/95 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="min-w-0 flex-1 text-center">
              <p className="truncate text-[11px] font-semibold text-slate-200">{t("audit_window_title")}</p>
              <p className="truncate text-[9px] font-medium uppercase tracking-wider text-slate-500">{t("audit_window_subtitle")}</p>
            </div>
            <span className="shrink-0 rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-emerald-300">
              {t("audit_badge_immutable")}
            </span>
          </div>

          <div className="relative min-h-[220px] bg-[#030810]/80 p-4 font-mono text-[11px] leading-relaxed sm:min-h-[240px] sm:p-5 sm:text-[12px]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[length:100%_24px]" />
            <ul className="relative z-10 space-y-3">
              {lines.map((line, i) => {
                const isActive = i === activeIdx;
                return (
                  <motion.li
                    key={`audit-line-${i}`}
                    layout
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0.38,
                      x: isActive ? 0 : -6,
                      scale: isActive ? 1 : 0.98,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={[
                      "rounded-lg border px-3 py-2.5 [text-wrap:pretty]",
                      isActive
                        ? "border-cyan-400/35 bg-cyan-500/[0.08] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
                        : "border-transparent bg-transparent text-slate-500",
                    ].join(" ")}
                  >
                    <span className="select-none text-emerald-400/90">⎿ </span>
                    {line}
                  </motion.li>
                );
              })}
            </ul>
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="relative z-10 mt-4 flex items-center gap-2 border-t border-white/5 pt-3 text-[10px] text-slate-500"
              >
                <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                {t("audit_footer_sync")} {activeIdx + 1}/{lines.length}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-white/10 bg-[#0a1220]/75 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10">
                <Shield className="h-5 w-5 text-violet-300" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{t("pdpa_title")}</h3>
                <p className="mt-0.5 text-xs font-normal text-slate-400">{t("pdpa_subtitle")}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-cyan-500/15">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
                  <Fingerprint className="h-5 w-5 text-cyan-300" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t("pdpa_anon_title")}</p>
                  <p className="mt-1.5 text-xs font-normal leading-relaxed text-slate-400">{t("pdpa_anon_desc")}</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-emerald-500/15">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10">
                  <Lock className="h-5 w-5 text-emerald-300" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t("pdpa_encrypt_title")}</p>
                  <p className="mt-1.5 text-xs font-normal leading-relaxed text-slate-400">{t("pdpa_encrypt_desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function SecurityArchitecturePage() {
  const t = useTranslations("SecurityPage");

  const pillars = [
    { title: t("pillar1_title"), desc: t("pillar1_desc"), icon: Server },
    { title: t("pillar2_title"), desc: t("pillar2_desc"), icon: HardDrive },
    { title: t("pillar3_title"), desc: t("pillar3_desc"), icon: FileSearch },
    { title: t("pillar4_title"), desc: t("pillar4_desc"), icon: Globe2 },
  ];

  const comparisonRows = [
    { typical: t("typical_1"), audomas: t("audomas_1") },
    { typical: t("typical_2"), audomas: t("audomas_2") },
    { typical: t("typical_3"), audomas: t("audomas_3") },
    { typical: t("typical_4"), audomas: t("audomas_4") },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(100%_80%_at_50%_-20%,rgba(14,165,233,0.1),transparent_50%),linear-gradient(180deg,#020617_0%,#0a1628_45%,#020617_100%)] text-slate-100">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[12%] h-[480px] w-[min(92vw,720px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_68%)] blur-3xl"
        aria-hidden
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pb-32 lg:pt-32">
        <motion.header
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="mb-4 inline-flex max-w-[95vw] flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-white/12 bg-[#0a1220]/75 px-4 py-2 text-[9px] font-semibold uppercase leading-snug tracking-[0.14em] text-slate-300 shadow-[0_0_32px_rgba(15,23,42,0.6)] backdrop-blur-md sm:text-[10px] sm:tracking-[0.18em]"
          >
            {t("parent_badge")}
          </motion.p>
          <motion.p
            custom={1}
            variants={fadeUp}
            className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/85"
          >
            {t("hero_kicker")}
          </motion.p>
          <motion.h1
            custom={2}
            variants={fadeUp}
            className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
          >
            {t("hero_title")}
          </motion.h1>
          <motion.p
            custom={3}
            variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-pretty text-base font-normal leading-relaxed text-slate-400 sm:text-lg"
          >
            {t("hero_subtitle")}
          </motion.p>
          <motion.div
            custom={4}
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <a
              href={AIRGAPX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-600 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_16px_48px_rgba(34,211,238,0.25)] transition-transform hover:scale-[1.02] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_20px_56px_rgba(34,211,238,0.35)] sm:w-auto"
            >
              {t("cta_primary")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
            <Link
              href="/#live-demo"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-medium text-slate-200 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/[0.07] sm:w-auto"
            >
              {t("cta_secondary")}
            </Link>
          </motion.div>
        </motion.header>

        <PrivacyShieldCompareStrip />

        {/* Smart Orchestrator: Sight → Brain → Action + AirGapX vault */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto mt-12 max-w-5xl lg:mt-16"
          aria-labelledby="orchestrator-heading"
        >
          <div className="mb-10 text-center">
            <h2 id="orchestrator-heading" className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400/80">
              {t("orchestrator_title")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-normal text-slate-400">{t("orchestrator_subtitle")}</p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
            <motion.article
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="glass-enterprise relative flex flex-1 flex-col rounded-2xl border border-cyan-500/18 p-6"
            >
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_55%_at_20%_0%,rgba(56,189,248,0.1),transparent_58%)]" />
              <div className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/35 bg-cyan-500/10 shadow-[0_0_28px_rgba(34,211,238,0.2)]">
                  <Eye className="h-7 w-7 text-cyan-200" strokeWidth={1.75} />
                </div>
                <p className="text-base font-semibold text-white">{t("orchestrator_sight_title")}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/85">{t("orchestrator_sight_role")}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{t("orchestrator_sight_desc")}</p>
              </div>
            </motion.article>

            <div className="hidden shrink-0 items-center justify-center px-1 md:flex" aria-hidden>
              <ChevronRight className="h-6 w-6 text-cyan-500/50" strokeWidth={2} />
            </div>

            <motion.article
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="glass-enterprise relative flex flex-1 flex-col rounded-2xl border border-violet-500/20 p-6"
            >
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(139,92,246,0.12),transparent_55%)]" />
              <div className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/10 shadow-[0_0_28px_rgba(139,92,246,0.18)]">
                  <Brain className="h-7 w-7 text-violet-200" strokeWidth={1.75} />
                </div>
                <p className="text-base font-semibold text-white">{t("orchestrator_brain_title")}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300/85">{t("orchestrator_brain_role")}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{t("orchestrator_brain_desc")}</p>
              </div>
            </motion.article>

            <div className="hidden shrink-0 items-center justify-center px-1 md:flex" aria-hidden>
              <ChevronRight className="h-6 w-6 text-cyan-500/50" strokeWidth={2} />
            </div>

            <motion.article
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="glass-enterprise relative flex flex-1 flex-col rounded-2xl border border-emerald-500/22 p-6"
            >
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,rgba(52,211,153,0.1),transparent_55%)]" />
              <div className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-400/35 bg-emerald-500/10 shadow-[0_0_28px_rgba(52,211,153,0.18)]">
                  <Send className="h-7 w-7 text-emerald-200" strokeWidth={1.75} />
                </div>
                <p className="text-base font-semibold text-white">{t("orchestrator_action_title")}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300/85">{t("orchestrator_action_role")}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{t("orchestrator_action_desc")}</p>
              </div>
            </motion.article>
          </div>

          <OrchestratorFlowHint />

          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-lg">
              <AirGapXPremiumCard
                motionProps={{
                  initial: { opacity: 0, y: 14 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.5 },
                }}
              />
            </div>
          </div>
        </motion.section>

        {/* Relationship */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto mt-20 max-w-4xl lg:mt-28"
        >
          <div className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-br from-cyan-400/25 via-white/10 to-blue-600/20 opacity-80 blur-sm" aria-hidden />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c1525]/85 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-10 md:p-12">
            <div className="mb-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300/80">{t("relationship_eyebrow")}</p>
              <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {t("relationship_title")}
              </h2>
            </div>

            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-inner ring-1 ring-cyan-400/15">
                  <AudomasLogo size={44} animated={false} />
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{t("relationship_audomas_label")}</p>
                <p className="mt-1 max-w-[200px] text-xs font-normal leading-snug text-slate-500">
                  {t("relationship_audomas_sublabel")}
                </p>
              </div>

              <div className="hidden h-px w-16 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent md:block" aria-hidden />
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent md:hidden" aria-hidden />

              <div className="flex w-full max-w-md flex-col items-stretch">
                <AirGapXPremiumCard
                  compact
                  motionProps={{
                    initial: { opacity: 0, y: 12 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.45 },
                  }}
                />
                <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-wider text-slate-500 md:text-left">
                  {t("relationship_powered")}
                </p>
              </div>
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-normal leading-relaxed text-slate-400 sm:text-[15px]">
              {t("relationship_desc")}
            </p>
          </div>
        </motion.section>

        <ComplianceAuditSection />

        <section className="mt-20 lg:mt-28">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{t("pillars_title")}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {pillars.map((pillar, idx) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="group rounded-2xl border border-white/8 bg-[#0a1220]/75 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-cyan-500/20"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 transition-colors group-hover:bg-cyan-500/15">
                  <pillar.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
                <p className="mt-2 text-sm font-normal leading-relaxed text-slate-400">{pillar.desc}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-20 lg:mt-28">
          <h2 className="mx-auto max-w-2xl text-balance text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {t("comparison_title")}
          </h2>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#070d18]/80 shadow-[0_24px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="p-6 sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{t("comparison_typical")}</p>
                <ul className="mt-6 space-y-4">
                  {comparisonRows.map((row) => (
                    <li key={row.typical} className="flex gap-3 text-sm font-normal leading-snug text-slate-400">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-400/90">
                        <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <span>{row.typical}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative p-6 sm:p-8">
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.08),transparent_55%)]"
                  aria-hidden
                />
                <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">{t("comparison_audomas")}</p>
                <ul className="relative mt-6 space-y-4">
                  {comparisonRows.map((row) => (
                    <li key={row.audomas} className="flex gap-3 text-sm font-normal leading-snug text-slate-200">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <span>{row.audomas}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <HeritageOfExcellence />

        <p className="mt-14 text-center text-xs font-normal text-slate-600">
          <Link href="/" className="text-cyan-400/90 underline-offset-4 hover:text-cyan-300 hover:underline">
            {t("footer_back")}
          </Link>
        </p>
      </main>
    </div>
  );
}
