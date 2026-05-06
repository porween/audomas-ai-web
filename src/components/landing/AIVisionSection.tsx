"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Users,
  ShieldAlert,
  Car,
  Search,
  Factory,
  ScanLine,
  Layers,
  ArrowRight,
  Play,
  Camera,
  ShieldCheck,
  Activity,
  Fingerprint,
  CloudOff,
  Cpu,
} from "lucide-react";
import Link from "next/link";

/** Futuristic enterprise dashboard tokens (SAUSUS-style) */
const MIDNIGHT = "#020617";
const ELECTRIC_CYAN = "#00D4FF";
const NEON_GREEN = "#39FF14";
const BOX_GREEN = "#22c55e";
const BOX_RED = "#ef4444";

const sectionFont = {
  fontFamily: 'var(--font-urbanist), "Inter", ui-sans-serif, system-ui, sans-serif',
} as const;

const glassCard =
  "relative h-full overflow-hidden rounded-[2rem] border border-[#00D4FF]/18 bg-[#020617]/50 backdrop-blur-2xl " +
  "shadow-[inset_0_1px_0_0_rgba(0,212,255,0.16),0_12px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)]";

const trustGlass =
  "flex gap-4 rounded-2xl border border-[#00D4FF]/15 bg-[#020617]/40 px-4 py-4 backdrop-blur-xl " +
  "shadow-[inset_0_1px_0_0_rgba(0,212,255,0.12),0_8px_28px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] duration-300 hover:border-[#00D4FF]/28";

function VisionScanLines() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-x-[-10%] h-[2px] opacity-[0.35]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${ELECTRIC_CYAN}35 20%, ${ELECTRIC_CYAN}70 50%, ${ELECTRIC_CYAN}35 80%, transparent 100%)`,
          boxShadow: `0 0 24px rgba(0,212,255,0.2), 0 0 48px rgba(0,212,255,0.08)`,
        }}
        initial={{ top: "-10%" }}
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-x-[-5%] h-px opacity-[0.22]"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)`,
        }}
        initial={{ top: "20%" }}
        animate={{ top: ["15%", "115%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 1.2 }}
      />
    </div>
  );
}

function TrustBadgeRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className={trustGlass}>
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00D4FF]/35"
        style={{
          background: `linear-gradient(145deg, rgba(0,212,255,0.12), rgba(2,6,23,0.5))`,
          boxShadow: `inset 0 1px 0 rgba(0,212,255,0.2), 0 0 18px rgba(0,212,255,0.15)`,
        }}
      >
        <Icon
          className="h-5 w-5"
          strokeWidth={1.35}
          color={ELECTRIC_CYAN}
          style={{ filter: `drop-shadow(0 0 6px ${ELECTRIC_CYAN})` }}
        />
      </div>
      <div className="min-w-0 text-left">
        <p className="text-[13px] font-bold leading-snug tracking-tight text-white sm:text-sm">{title}</p>
        <p className="mt-0.5 text-[11px] font-light leading-snug text-slate-500 sm:text-xs">{desc}</p>
      </div>
    </div>
  );
}

function NeonMenuIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#00D4FF]/40"
      style={{
        background: `linear-gradient(145deg, rgba(0,212,255,0.14) 0%, rgba(2,6,23,0.65) 48%, rgba(0,212,255,0.06) 100%)`,
        boxShadow: `
          inset 0 1px 0 0 rgba(0,212,255,0.25),
          inset 0 -1px 0 0 rgba(0,0,0,0.35),
          0 0 24px rgba(0,212,255,0.2)
        `,
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
        style={{
          background: `radial-gradient(circle at 30% 25%, ${ELECTRIC_CYAN}55, transparent 55%)`,
        }}
      />
      <Icon
        className="relative z-[1] h-7 w-7"
        strokeWidth={1.35}
        color={ELECTRIC_CYAN}
        style={{
          filter: `drop-shadow(0 0 6px ${ELECTRIC_CYAN}) drop-shadow(0 0 14px rgba(0,212,255,0.45))`,
        }}
      />
    </div>
  );
}

const mockGrid =
  "absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.1)_1px,transparent_1px)] [background-size:10px_10px]";

function BBox({
  className,
  color,
  label,
}: {
  className: string;
  color: "green" | "red";
  label?: string;
}) {
  const c = color === "green" ? BOX_GREEN : BOX_RED;
  return (
    <div
      className={`absolute rounded-sm border-2 ${className}`}
      style={{
        borderColor: c,
        boxShadow: `0 0 12px ${color === "green" ? "rgba(34,197,94,0.55)" : "rgba(239,68,68,0.55)"}`,
      }}
    >
      {label ? (
        <span
          className="absolute -top-3 left-0 whitespace-nowrap px-0.5 text-[6px] font-bold uppercase tracking-wide"
          style={{ color: c, textShadow: `0 0 6px ${c}` }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

/** Mini “camera frame” mockups: heatmaps + bounding boxes per engine */
function EngineMockup({ variant }: { variant: EngineMockVariant }) {
  return (
    <div
      className="relative h-[5.75rem] w-full shrink-0 overflow-hidden rounded-xl border border-white/[0.12] bg-[#050a12]"
      aria-hidden
    >
      <div className={mockGrid} />
      {variant === "retail" && (
        <>
          <div
            className="absolute inset-2 rounded-md opacity-[0.72]"
            style={{
              background: `radial-gradient(ellipse 70% 55% at 58% 42%, rgba(239,68,68,0.45), rgba(250,204,21,0.28), rgba(34,197,94,0.18), transparent 72%)`,
            }}
          />
          <BBox className="left-[14%] top-[26%] h-[38%] w-[26%]" color="green" label="Hot" />
          <BBox className="right-[12%] top-[18%] h-[28%] w-[22%]" color="red" label="Cold" />
        </>
      )}
      {variant === "people" && (
        <>
          <BBox className="left-[8%] top-[22%] h-[52%] w-[28%]" color="green" label="Q1" />
          <BBox className="left-[38%] top-[30%] h-[44%] w-[26%]" color="green" label="Q2" />
          <BBox className="right-[10%] top-[20%] h-[48%] w-[30%]" color="red" label="Alert" />
        </>
      )}
      {variant === "security" && (
        <>
          <BBox className="left-[12%] top-[28%] h-[40%] w-[35%]" color="green" label="OK" />
          <BBox className="right-[14%] top-[22%] h-[50%] w-[38%]" color="red" label="Risk" />
          <div
            className="absolute bottom-1.5 left-1/2 h-px w-[55%] -translate-x-1/2"
            style={{ background: `linear-gradient(90deg, transparent, ${BOX_RED}88, transparent)` }}
          />
        </>
      )}
      {variant === "lpr" && (
        <>
          <div className="absolute inset-y-3 left-[18%] right-[18%] rounded-sm bg-white/[0.06]" />
          <BBox className="left-[22%] top-[38%] h-[28%] w-[42%]" color="green" label="TH OCR" />
          <span
            className="absolute bottom-2 right-3 font-mono text-[7px] font-bold tracking-widest"
            style={{ color: ELECTRIC_CYAN, textShadow: `0 0 8px ${ELECTRIC_CYAN}` }}
          >
            LPR
          </span>
        </>
      )}
      {variant === "search" && (
        <>
          <div
            className="absolute inset-2 rounded-md opacity-40"
            style={{
              background: `linear-gradient(135deg, rgba(0,212,255,0.12), transparent 60%), repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(0,212,255,0.08) 14px, rgba(0,212,255,0.08) 15px)`,
            }}
          />
          <BBox className="left-[10%] top-[32%] h-[36%] w-[78%]" color="green" label="Clip" />
        </>
      )}
      {variant === "industrial" && (
        <>
          <BBox className="left-[10%] top-[20%] h-[32%] w-[40%]" color="red" label="Zone" />
          <BBox className="right-[12%] bottom-[18%] h-[38%] w-[34%]" color="green" label="PPE" />
        </>
      )}
      {variant === "perimeter" && (
        <>
          <div
            className="absolute left-[8%] right-[8%] top-1/2 h-0 -translate-y-1/2 border-t-2 border-dashed opacity-80"
            style={{ borderColor: `${ELECTRIC_CYAN}99`, boxShadow: `0 0 12px ${ELECTRIC_CYAN}44` }}
          />
          <BBox className="left-[20%] top-[18%] h-[58%] w-[22%]" color="green" />
          <BBox className="right-[18%] top-[24%] h-[48%] w-[28%]" color="red" label="Line" />
        </>
      )}
      {variant === "fusion" && (
        <>
          <div
            className="absolute left-[12%] top-[28%] h-[44%] w-[28%] rounded-sm border border-[#00D4FF]/35 bg-[#00D4FF]/[0.06]"
            style={{ boxShadow: `0 0 14px rgba(0,212,255,0.25)` }}
          />
          <div
            className="absolute right-[14%] top-[22%] h-[50%] w-[30%] rounded-sm border border-[#39FF14]/40 bg-[#39FF14]/[0.06]"
            style={{ boxShadow: `0 0 14px rgba(57,255,20,0.25)` }}
          />
          <motion.div
            className="absolute left-[38%] top-1/2 h-0.5 w-[22%] -translate-y-1/2 rounded-full"
            style={{ background: `linear-gradient(90deg, ${ELECTRIC_CYAN}, ${NEON_GREEN})` }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
}

type EngineMockVariant =
  | "retail"
  | "people"
  | "security"
  | "lpr"
  | "search"
  | "industrial"
  | "perimeter"
  | "fusion";

function EngineCard({
  index,
  title,
  desc,
  icon,
  mockVariant,
}: {
  index: number;
  title: string;
  desc: string;
  icon: LucideIcon;
  mockVariant: EngineMockVariant;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="group relative"
      style={sectionFont}
      whileHover={{
        scale: 1.03,
        y: -4,
        transition: { type: "spring", stiffness: 420, damping: 26 },
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${ELECTRIC_CYAN}70, transparent 45%, rgba(57,255,20,0.35))`,
        }}
      />

      <div
        className={`${glassCard} flex flex-col gap-5 p-7 transition-[border-color,box-shadow] duration-300 group-hover:border-[#00D4FF]/55 group-hover:shadow-[inset_0_1px_0_0_rgba(0,212,255,0.22),0_16px_48px_rgba(0,0,0,0.5),0_0_32px_rgba(0,212,255,0.22),0_0_0_1px_rgba(0,212,255,0.12)]`}
      >
        <div
          className="pointer-events-none absolute right-0 top-0 h-36 w-36 -translate-y-1/3 translate-x-1/4 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
          style={{ background: `radial-gradient(circle, ${ELECTRIC_CYAN}44, transparent 70%)` }}
        />

        <EngineMockup variant={mockVariant} />
        <NeonMenuIcon icon={icon} />

        <div>
          <h3 className="mb-3 text-lg font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[#00D4FF] sm:text-xl">
            {title}
          </h3>
          <div className="space-y-2">
            {desc.split(",").map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm leading-snug">
                <div
                  className="h-1 w-1 shrink-0 rounded-full"
                  style={{
                    background: ELECTRIC_CYAN,
                    boxShadow: `0 0 8px ${ELECTRIC_CYAN}`,
                  }}
                />
                <span className="font-light text-slate-400">{item.trim()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#00D4FF]/10 pt-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 transition-colors duration-300 group-hover:text-[#39FF14]">
            SAUSUS_Engine_{String(index + 1).padStart(2, "0")}
          </span>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#00D4FF]/25 bg-[#00D4FF]/[0.08] text-[#00D4FF] transition-all duration-300 group-hover:border-[#00D4FF]/60 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.45)]"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AIVisionSection() {
  const t = useTranslations("AIVision");

  const engines: { title: string; desc: string; icon: LucideIcon; mock: EngineMockVariant }[] = [
    { title: t("card1_title"), desc: t("card1_desc"), icon: BarChart3, mock: "retail" },
    { title: t("card2_title"), desc: t("card2_desc"), icon: Users, mock: "people" },
    { title: t("card3_title"), desc: t("card3_desc"), icon: ShieldAlert, mock: "security" },
    { title: t("card4_title"), desc: t("card4_desc"), icon: Car, mock: "lpr" },
    { title: t("card5_title"), desc: t("card5_desc"), icon: Search, mock: "search" },
    { title: t("card6_title"), desc: t("card6_desc"), icon: Factory, mock: "industrial" },
    { title: t("card7_title"), desc: t("card7_desc"), icon: ScanLine, mock: "perimeter" },
    { title: t("card8_title"), desc: t("card8_desc"), icon: Layers, mock: "fusion" },
  ];

  return (
    <section
      id="ai-vision"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ ...sectionFont, backgroundColor: MIDNIGHT }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-90"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 80% -10%, rgba(0,212,255,0.07), transparent 55%),
            radial-gradient(ellipse 70% 50% at 10% 100%, rgba(0,212,255,0.05), transparent 50%),
            radial-gradient(ellipse 50% 40% at 50% 50%, rgba(57,255,20,0.03), transparent 60%)
          `,
        }}
      />

      <VisionScanLines />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 flex flex-col items-end justify-between gap-10 lg:flex-row">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#00D4FF]/25 bg-[#020617]/60 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#00D4FF] shadow-[inset_0_1px_0_0_rgba(0,212,255,0.2)] backdrop-blur-md"
              style={{ boxShadow: `inset 0 1px 0 0 rgba(0,212,255,0.2), 0 0 24px rgba(0,212,255,0.12)` }}
            >
              <Camera
                className="h-4 w-4"
                strokeWidth={1.5}
                style={{ color: ELECTRIC_CYAN, filter: `drop-shadow(0 0 6px ${ELECTRIC_CYAN})` }}
              />
              Professional AI Vision
              <span
                className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-[#39FF14]/35 bg-[#39FF14]/[0.1] px-2 py-0.5 text-[9px] font-bold tracking-wider text-[#39FF14]"
                style={{ textShadow: `0 0 12px ${NEON_GREEN}` }}
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ background: NEON_GREEN, boxShadow: `0 0 8px ${NEON_GREEN}` }}
                />
                LIVE
              </span>
            </motion.div>

            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">{t("title")}</p>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="guardian-text mb-4 text-balance text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl lg:text-[2.85rem]"
            >
              {t("hero_headline")}
            </motion.h2>

            <p
              className="mb-8 font-mono text-sm font-semibold tracking-[0.12em] text-[#00D4FF] sm:text-base"
              style={{ textShadow: `0 0 24px rgba(0,212,255,0.35)` }}
            >
              {t("hero_system")}
            </p>

            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <TrustBadgeRow icon={Fingerprint} title={t("trust_pdpa_title")} desc={t("trust_pdpa_desc")} />
              <TrustBadgeRow icon={CloudOff} title={t("trust_local_title")} desc={t("trust_local_desc")} />
              <TrustBadgeRow icon={Cpu} title={t("trust_edge_title")} desc={t("trust_edge_desc")} />
            </div>

            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-slate-400 lg:mx-0 lg:text-xl">
              {t("subtitle")}
            </p>
          </div>

          <div className="hidden flex-col gap-6 lg:flex">
            <div className="flex flex-col items-end">
              <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Infrastructure
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-white">
                <ShieldCheck
                  className="h-4 w-4"
                  strokeWidth={1.5}
                  style={{ color: ELECTRIC_CYAN, filter: `drop-shadow(0 0 6px ${ELECTRIC_CYAN})` }}
                />
                AirGapX Vault Enabled
              </span>
            </div>
            <div className="h-px w-full max-w-[200px] self-end bg-gradient-to-l from-[#00D4FF]/25 to-transparent" />
            <div className="flex flex-col items-end">
              <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Processing
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-white">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ background: NEON_GREEN }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: NEON_GREEN, boxShadow: `0 0 10px ${NEON_GREEN}` }}
                  />
                </span>
                <Activity
                  className="h-4 w-4"
                  strokeWidth={1.5}
                  style={{ color: NEON_GREEN, filter: `drop-shadow(0 0 6px ${NEON_GREEN})` }}
                />
                Edge AI Real-time
              </span>
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-[#00D4FF] lg:text-left"
          style={{ textShadow: `0 0 20px rgba(0,212,255,0.25)` }}
        >
          {t("engines_eyebrow")}
        </motion.p>

        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {engines.map((eng, i) => (
            <EngineCard key={i} index={i} title={eng.title} desc={eng.desc} icon={eng.icon} mockVariant={eng.mock} />
          ))}
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <Link href="#demo" className="btn-audomas-primary-lg group/cta">
              <Play className="h-6 w-6 fill-white text-white" />
              {t("cta")}
              <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
          </motion.div>

          <p className="mt-8 text-sm font-light italic text-slate-500">
            {t("footer_note")}
          </p>
        </div>
      </div>
    </section>
  );
}
