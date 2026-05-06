"use client";

import { JetBrains_Mono, Montserrat } from "next/font/google";
import {
  Play,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
  Lock,
  CheckCircle2,
  HeartPulse,
  Car,
  Sparkles,
  ScanFace,
  Building2,
  Clock,
  Timer,
  Crown,
  ShieldAlert,
  Database,
  Search,
  Brain,
  Award,
  FileCheck,
  LayoutDashboard,
} from "lucide-react";
import { useEffect, useState, useRef, useMemo, Fragment, type ElementType } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getHeroStory,
  heroSystemVisionLine,
  heroVisionStatusChip,
  heroChatStatusChip,
  heroHubStatusChip,
  getHeroStoryPillar,
  type HeroWorkflowPhase,
  type HeroDemoIndustry,
} from "@/components/landing/heroDemoSync";

const revenueMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const cockpitHeadline = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const BG_TRANSITION = { duration: 0.5, ease: [0, 0, 0.2, 1] as const };

const RCC_GLASS_ICON =
  "mx-auto mb-1.5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/22 bg-gradient-to-b from-white/[0.14] to-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_28px_rgba(0,0,0,0.45),0_0_22px_rgba(0,212,255,0.12)] backdrop-blur-md";

function HeroDataStreams() {
  const lines = [0, 1, 2, 3, 4];
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden opacity-[0.42]">
      {lines.map((i) => (
        <motion.div
          key={i}
          className="absolute left-[-15%] h-px w-[130%]"
          style={{
            top: `${12 + i * 16}%`,
            background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.55) 50%, transparent 100%)",
          }}
          initial={{ x: "-8%" }}
          animate={{ x: ["-8%", "18%", "-8%"] }}
          transition={{
            duration: 11 + i * 1.4,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.35,
          }}
        />
      ))}
    </div>
  );
}

type IndustryId = HeroDemoIndustry;

const HERO_BG_LAYERS: Record<IndustryId, { gradient: string; glow: string; chatAura: string }> = {
  clinic: {
    gradient: `linear-gradient(180deg, #020617 0%, #042f2e 38%, #020617 100%)`,
    glow: `radial-gradient(ellipse 82% 52% at 70% 12%, rgba(45,212,191,0.26), transparent 55%), radial-gradient(ellipse 68% 48% at 20% 40%, rgba(13,148,136,0.22), transparent 58%), radial-gradient(ellipse 55% 42% at 50% 100%, rgba(2,6,23,0.95), transparent 72%)`,
    chatAura: "rgba(45,212,191,0.32)",
  },
  car: {
    gradient: `linear-gradient(180deg, #020617 0%, #0f172a 42%, #020617 100%)`,
    glow: `radial-gradient(ellipse 78% 50% at 24% 14%, rgba(100,116,139,0.35), transparent 54%), radial-gradient(ellipse 72% 46% at 80% 30%, rgba(59,130,246,0.26), transparent 58%), radial-gradient(ellipse 50% 40% at 50% 92%, rgba(15,23,42,0.9), transparent 70%)`,
    chatAura: "rgba(96,165,250,0.34)",
  },
  enterprise: {
    gradient: `linear-gradient(180deg, #020617 0%, #0c1a2e 44%, #020617 100%)`,
    glow: `radial-gradient(ellipse 80% 52% at 50% 8%, rgba(0,212,255,0.18), transparent 55%), radial-gradient(ellipse 64% 44% at 14% 72%, rgba(52,211,153,0.14), transparent 58%)`,
    chatAura: "rgba(0,212,255,0.26)",
  },
};

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

function useCountUpPulse(target: number, duration: number, pulseId: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (pulseId < 1) return;
    setValue(0);
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, pulseId]);
  return value;
}

type SessionEvent = {
  type: "system" | "log";
  title?: string;
  text: string;
  subtext?: string;
  time: string;
  metadata?: {
    sentiment?: string;
    score?: number;
    crmSync?: boolean;
    hasQuote?: boolean;
    quoteFilename?: string;
    quoteDesc?: string;
  };
};

function isUserBubble(title?: string) {
  const s = title?.toLowerCase() ?? "";
  return s.includes("customer intent") || s.includes("user response");
}

function isSystemBubble(title?: string) {
  return (title?.toUpperCase() ?? "") === "SYSTEM";
}

function isHighlightBubble(title?: string) {
  const s = title?.toLowerCase() ?? "";
  return (
    s.includes("result") ||
    s.includes("deal closed") ||
    s.includes("incident sealed") ||
    s.includes("order created") ||
    s.includes("lead qualified") ||
    s.includes("live roi") ||
    s.includes("coupon issued")
  );
}

function isResultEvent(title?: string) {
  const s = title?.toLowerCase() ?? "";
  return s.includes("result") || s.includes("incident sealed");
}

function resultFooterLabel(event: SessionEvent | null, tHero: (k: string) => string) {
  if (!event?.title) return tHero("highlight_deal");
  const s = event.title.toLowerCase();
  if (s.includes("order created")) return tHero("demo_result_order");
  if (s.includes("lead qualified")) return tHero("demo_result_lead");
  if (s.includes("live roi")) return tHero("demo_result_roi");
  if (s.includes("coupon issued")) return tHero("demo_result_coupon");
  return tHero("highlight_deal");
}

function resultFooterDetail(event: SessionEvent | null) {
  if (!event?.text) return "";
  return (
    event.text
      .replace(
        /^(Deal Closed|Lead Qualified|Order Created|Live ROI Detected|Coupon Issued|Result: Incident sealed)\s*:\s*/i,
        "",
      )
      .trim() || event.text
  );
}

function buildVisionActivityLog(events: SessionEvent[], tHero: (k: string) => string): string[] {
  const out: string[] = [];
  for (const ev of events) {
    const title = (ev.title ?? "").toUpperCase();
    if (title === "SYSTEM") out.push(tHero("vp_log_vision_sync"));
    else if (title.includes("CUSTOMER INTENT")) out.push(tHero("vp_log_intent"));
    else if (title.includes("AI RESPONSE")) out.push(tHero("vp_log_reasoning"));
    else if (title.includes("USER RESPONSE")) out.push(tHero("vp_log_user_ack"));
    else if (title.includes("AI ACTION")) out.push(tHero("vp_log_action"));
    else if (title.includes("RESULT")) out.push(tHero("vp_log_outcome"));
  }
  return out;
}

/** Leading [TAG] segments — de-emphasized for human-first chat */
function splitLeadingBracketTags(text: string): { tags: string; body: string } {
  const re = /^((?:\[[^\]\n]+\]\s*)+)/;
  const m = text.match(re);
  if (!m) return { tags: "", body: text };
  return { tags: m[1].trim(), body: text.slice(m[1].length).trim() };
}

function ChatBubble({ event, isUser }: { event: SessionEvent; isUser: boolean }) {
  const highlight = isHighlightBubble(event.title);
  const system = isSystemBubble(event.title);
  const locale = useLocale();
  const isTh = locale === "th";
  const { tags, body } = splitLeadingBracketTags(event.text);
  const showTags = Boolean(tags) && !isUser;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={[
          "min-h-[48px] w-[min(100%,min(92vw,440px))] max-w-full rounded-[1.25rem] px-4 py-3 shadow-sm backdrop-blur-md border transition-[background-color,border-color,box-shadow] duration-500 [overflow-wrap:anywhere] break-words",
          isUser
            ? "border-[#05b34c]/30 bg-[#06C755] text-white shadow-[0_2px_10px_rgba(6,199,85,0.28)]"
            : system
              ? "border-cyan-500/30 bg-slate-900/90 text-cyan-100 shadow-[0_0_20px_rgba(0,212,255,0.14)]"
              : highlight
                ? "border-emerald-500/40 bg-emerald-100/95 text-emerald-950"
                : "border-slate-200/90 bg-white text-slate-900 shadow-[0_1px_0_rgba(0,0,0,0.04)]",
        ].join(" ")}
      >
        {showTags ? (
          <p
            className={cn(
              revenueMono.className,
              "mb-1 text-[10px] font-medium leading-snug tracking-wide text-slate-500 opacity-40",
            )}
            title={tags}
          >
            {tags}
          </p>
        ) : null}
        <p
          className={cn(
            "text-[13px] font-medium leading-[1.6] tracking-tight [text-wrap:pretty] sm:text-[14px]",
            isTh && "break-keep",
          )}
        >
          {body || event.text}
        </p>
        {event.subtext && !highlight && (
          <p className="mt-2 text-[10px] font-medium leading-snug text-slate-500 opacity-80 sm:text-[11px]">{event.subtext}</p>
        )}
      </div>
    </motion.div>
  );
}

function TypingIndicator({ label, meta }: { label: string; meta?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-start gap-2"
    >
      <div
        title={meta || undefined}
        className="flex min-h-[42px] max-w-[min(100%,440px)] items-center gap-3 rounded-[1.25rem] border border-slate-200/90 bg-white px-4 py-2.5 shadow-sm backdrop-blur-md [overflow-wrap:anywhere] break-words"
      >
        <span className="text-[12px] font-medium leading-[1.6] text-slate-700">{label}</span>
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-slate-500/90"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}

function DealClosedFooter({
  visible,
  label,
  detail,
  pulseKey,
}: {
  visible: boolean;
  label: string;
  detail: string;
  pulseKey: string;
}) {
  return (
    <div className="flex min-h-[56px] items-center justify-center border-t border-slate-200/50 bg-white/30 px-3 py-2 backdrop-blur-sm sm:px-5">
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key={pulseKey}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: [0.98, 1.02, 1] }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.45, times: [0, 0.42, 1] }}
            className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-emerald-500/30 bg-[#06C755]/12 px-3 py-1.5 shadow-[0_2px_14px_rgba(6,199,85,0.18)]"
          >
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2} />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-900 sm:text-[11px]">{label}</span>
            {detail ? (
              <span className="text-[10px] font-medium leading-snug text-emerald-900/88 [text-wrap:balance] sm:text-[11px]">{detail}</span>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type VisionMetric = {
  key: string;
  title: string;
  detail: string;
  Icon: ElementType;
  iconWrap: string;
};

type VisionScenario = {
  title: string;
  metrics: [VisionMetric, VisionMetric, VisionMetric];
  result: string;
  previewGlow: string;
  scanColor: string;
  bboxLabels: [string, string, string];
};

function visionLiveSummaryKey(industry: IndustryId): "vp_live_summary_clinic" | "vp_live_summary_car" | "vp_live_summary_enterprise" {
  switch (industry) {
    case "clinic":
      return "vp_live_summary_clinic";
    case "car":
      return "vp_live_summary_car";
    default:
      return "vp_live_summary_enterprise";
  }
}

function VisionInfographicPreview({
  industry,
  summary,
  glow,
  scanRgb,
  SummaryIcon,
  sightPrimary = true,
}: {
  industry: IndustryId;
  summary: string;
  glow: string;
  scanRgb: string;
  SummaryIcon: ElementType;
  sightPrimary?: boolean;
}) {
  const tHero = useTranslations("Hero");
  const [scanPhase, setScanPhase] = useState<0 | 1>(0);

  useEffect(() => {
    const id = window.setInterval(() => setScanPhase((p) => (p === 0 ? 1 : 0)), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "audomas-media relative h-[168px] w-full overflow-hidden rounded-lg border border-cyan-500/[0.09] bg-[#020617] ring-1 ring-cyan-500/[0.06] sm:h-[184px]",
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_70%_at_50%_20%,rgba(15,23,42,0.35),transparent_55%)]" />
      <div className={cn("pointer-events-none absolute inset-0 z-[2] opacity-70", glow)} />
      <div className="pointer-events-none absolute inset-0 z-[3] opacity-[0.09] [background-image:linear-gradient(rgba(0,212,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.08)_1px,transparent_1px)] [background-size:14px_14px]" />
      {industry === "enterprise" ? (
        <div
          className="pointer-events-none absolute inset-0 z-[4] opacity-[0.22]"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 70% 55%, rgba(239,68,68,0.18), transparent 65%)",
          }}
        />
      ) : null}

      <motion.div
        className="pointer-events-none absolute inset-x-0 z-[11] h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.1) 18%, rgba(0,212,255,0.75) 50%, rgba(0,212,255,0.1) 82%, transparent 100%)`,
          boxShadow: "0 0 18px rgba(0,212,255,0.63), 0 0 36px rgba(0,212,255,0.245)",
          opacity: sightPrimary ? 1 : 0.35,
        }}
        animate={{ top: ["6%", "94%", "6%"] }}
        transition={{ duration: sightPrimary ? 2.4 : 4.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-[10%] z-[10] h-px rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${scanRgb} 45%, ${scanRgb} 55%, transparent 100%)`,
          boxShadow: `0 0 14px ${scanRgb}`,
          opacity: sightPrimary ? 0.65 : 0.3,
        }}
        animate={{ top: ["12%", "88%", "12%"] }}
        transition={{ duration: sightPrimary ? 3.4 : 5.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pointer-events-none absolute left-2 top-2 z-20 flex flex-col items-start gap-1 sm:left-2.5 sm:top-2.5">
        <div className="flex items-center gap-1.5 rounded-md border border-cyan-500/20 bg-[#020617]/80 px-2 py-0.5 shadow-[0_0_14px_rgba(0,212,255,0.12)] backdrop-blur-md">
          <LayoutDashboard className="h-3 w-3 text-[#00D4FF]/90" strokeWidth={1.5} />
          <span className="text-[8px] font-bold uppercase tracking-widest text-white/85 sm:text-[9px]">{tHero("vp_infographic_badge")}</span>
        </div>
        <motion.span
          className={cn(
            revenueMono.className,
            "rounded border border-[#00D4FF]/25 bg-[#020617]/88 px-1.5 py-px text-[7px] font-medium tracking-wide text-cyan-200/80 shadow-[0_0_10px_rgba(0,212,255,0.22)] sm:text-[8px]",
          )}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.85, repeat: Infinity, ease: "easeInOut" }}
        >
          {scanPhase === 0 ? tHero("vp_scan_scanning") : tHero("vp_scan_analyzing")}
        </motion.span>
      </div>

      <div className="relative z-[15] flex h-full flex-col justify-center px-3 pb-2 pt-11 sm:px-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/15 bg-cyan-500/[0.06] sm:h-11 sm:w-11">
            <SummaryIcon className="h-5 w-5 text-cyan-300/90 sm:h-[22px] sm:w-[22px]" strokeWidth={1.5} />
          </div>
          <p className="min-w-0 flex-1 text-[13px] font-semibold leading-[1.55] tracking-tight text-slate-100 [text-wrap:pretty] [overflow-wrap:anywhere] break-words sm:text-[14px]">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}

function AIVisionPanel({
  industry,
  actionGlowActive,
  activityLogLines: _activityLogLines,
  workflowPhase,
  sightPrimary,
}: {
  industry: IndustryId;
  actionGlowActive: boolean;
  activityLogLines: string[];
  workflowPhase: HeroWorkflowPhase;
  sightPrimary: boolean;
}) {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const lang = locale === "en" ? "en" : "th";
  const [updateTime, setUpdateTime] = useState("14:20:01");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setUpdateTime(
        `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const liveSummary = t(visionLiveSummaryKey(industry));
  const SummaryIcon = industry === "clinic" ? Users : industry === "car" ? Car : ShieldAlert;
  void _activityLogLines;

  const scenario: VisionScenario = useMemo(() => {
    switch (industry) {
      case "clinic":
        return {
          title: t("vp_clinic_title"),
          metrics: [
            {
              key: "m1",
              title: t("vp_clinic_m1"),
              detail: t("vp_clinic_m1_detail"),
              Icon: ScanFace,
              iconWrap: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
            },
            {
              key: "m2",
              title: t("vp_clinic_m2"),
              detail: t("vp_clinic_m2_detail"),
              Icon: Building2,
              iconWrap: "text-sky-300 border-sky-500/30 bg-sky-500/10",
            },
            {
              key: "m3",
              title: t("vp_clinic_m3"),
              detail: t("vp_clinic_m3_detail"),
              Icon: Clock,
              iconWrap: "text-teal-300 border-teal-500/30 bg-teal-500/10",
            },
          ],
          result: t("vp_clinic_result"),
          previewGlow: "bg-[radial-gradient(circle_at_35%_30%,rgba(34,211,238,0.14),transparent_62%)]",
          scanColor: "rgba(103,232,249,0.95)",
          bboxLabels: [t("vp_bbox_clinic_1"), t("vp_bbox_clinic_2"), t("vp_bbox_clinic_3")],
        };
      case "car":
        return {
          title: t("vp_car_title"),
          metrics: [
            {
              key: "m1",
              title: t("vp_car_m1"),
              detail: t("vp_car_m1_detail"),
              Icon: Car,
              iconWrap: "text-blue-300 border-blue-500/30 bg-blue-500/10",
            },
            {
              key: "m2",
              title: t("vp_car_m2"),
              detail: t("vp_car_m2_detail"),
              Icon: Timer,
              iconWrap: "text-amber-300 border-amber-500/30 bg-amber-500/10",
            },
            {
              key: "m3",
              title: t("vp_car_m3"),
              detail: t("vp_car_m3_detail"),
              Icon: Crown,
              iconWrap: "text-violet-300 border-violet-500/30 bg-violet-500/10",
            },
          ],
          result: t("vp_car_result"),
          previewGlow: "bg-[radial-gradient(circle_at_40%_25%,rgba(96,165,250,0.16),transparent_60%)]",
          scanColor: "rgba(147,197,253,0.95)",
          bboxLabels: [t("vp_bbox_car_1"), t("vp_bbox_car_2"), t("vp_bbox_car_3")],
        };
      case "enterprise":
        return {
          title: t("vp_vision_title"),
          metrics: [
            {
              key: "m1",
              title: t("vp_vision_m1"),
              detail: t("vp_vision_m1_detail"),
              Icon: ShieldAlert,
              iconWrap: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
            },
            {
              key: "m2",
              title: t("vp_vision_m2"),
              detail: t("vp_vision_m2_detail"),
              Icon: Database,
              iconWrap: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
            },
            {
              key: "m3",
              title: t("vp_vision_m3"),
              detail: t("vp_vision_m3_detail"),
              Icon: Lock,
              iconWrap: "text-lime-300 border-lime-500/30 bg-lime-500/10",
            },
          ],
          result: t("vp_vision_result"),
          previewGlow: "bg-[radial-gradient(circle_at_50%_20%,rgba(52,211,153,0.12),transparent_55%)]",
          scanColor: "rgba(52,211,153,0.95)",
          bboxLabels: [t("vp_bbox_enterprise_1"), t("vp_bbox_enterprise_2"), t("vp_bbox_enterprise_3")],
        };
    }
  }, [industry, t]);

  return (
    <div className="w-full min-w-0 flex-1">
      <motion.div
        animate={{
          boxShadow: actionGlowActive
            ? "0 20px 63px rgba(34,211,238,0.294), 0 0 0 1px rgba(34,211,238,0.35), 0 0 50px rgba(6,182,212,0.224), 0 0 84px rgba(34,211,238,0.084)"
            : "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
          borderColor: actionGlowActive ? "rgba(34,211,238,0.32)" : "rgba(255,255,255,0.1)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-enterprise relative w-full overflow-hidden rounded-xl border border-cyan-500/12 bg-[#020617]/58 p-4 pb-5 shadow-[0_0_34px_rgba(0,212,255,0.056)] sm:p-5 sm:pb-6"
      >
        <div className="relative z-10 mb-3 rounded-lg border border-[#00D4FF]/22 bg-[#020617]/80 px-3 py-2 shadow-[inset_0_1px_0_rgba(0,212,255,0.12)]">
          <p
            className={cn(
              revenueMono.className,
              "text-[10px] font-bold uppercase tracking-[0.2em] text-[#00D4FF]",
            )}
          >
            {heroVisionStatusChip(workflowPhase, lang)}
          </p>
        </div>
        <motion.div
          className="pointer-events-none absolute -inset-8 z-0 rounded-[2rem]"
          aria-hidden
          animate={{
            opacity: actionGlowActive ? 0.38 : 0,
            scale: actionGlowActive ? 1 : 0.96,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(34,211,238,0.315), rgba(6,182,212,0.084) 45%, transparent 72%)",
            filter: "blur(28px)",
          }}
        />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_95%_55%_at_50%_-15%,rgba(34,211,238,0.07),transparent_55%)] transition-opacity duration-500" />
        <div className="pointer-events-none absolute inset-0 z-[2] opacity-[0.06] [background-image:linear-gradient(rgba(34,211,238,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.14)_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="pointer-events-none absolute left-3 top-3 z-[3] h-4 w-4 border-l border-t border-cyan-300/30" />
        <div className="pointer-events-none absolute right-3 top-3 z-[3] h-4 w-4 border-r border-t border-cyan-300/30" />
        <div className="pointer-events-none absolute bottom-3 left-3 z-[3] h-4 w-4 border-b border-l border-cyan-300/30" />
        <div className="pointer-events-none absolute bottom-3 right-3 z-[3] h-4 w-4 border-b border-r border-cyan-300/30" />

        <div className="relative z-10 mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/35 bg-cyan-500/12 shadow-[0_0_32px_rgba(34,211,238,0.22)] transition-[box-shadow,transform] duration-500 sm:h-14 sm:w-14",
                actionGlowActive && "shadow-[0_0_48px_rgba(34,211,238,0.48)] scale-[1.03]",
              )}
            >
              <LayoutDashboard className="h-6 w-6 text-cyan-300 sm:h-7 sm:w-7" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#00D4FF]/85">{t("vp_mission_label")}</p>
              <h3 className="text-base font-bold leading-tight tracking-tight text-white sm:text-lg">{scenario.title}</h3>
              <p className="mt-1 font-mono text-[10px] font-medium uppercase tracking-widest text-cyan-400/80 sm:text-[11px]">
                {t("vp_rt_sub")} · {updateTime}
              </p>
            </div>
          </div>
          <div
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/15 px-3 py-1.5 transition-[box-shadow,border-color] duration-500",
              actionGlowActive && "border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.25)]",
            )}
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Live</span>
          </div>
        </div>

        <div className="relative z-10 mb-3 rounded-lg border border-white/[0.06] bg-[#020617]/35 px-3 py-2.5 backdrop-blur-sm">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">{t("vp_activity_label")}</p>
          <p className="mt-1 text-[12px] font-medium leading-[1.55] text-cyan-100/88 [overflow-wrap:anywhere] break-words [text-wrap:pretty]">
            {liveSummary}
          </p>
        </div>

        <div className="relative z-10 mb-3">
          <VisionInfographicPreview
            industry={industry}
            summary={liveSummary}
            glow={scenario.previewGlow}
            scanRgb={scenario.scanColor}
            SummaryIcon={SummaryIcon}
            sightPrimary={sightPrimary}
          />
        </div>

        <motion.div
          key={`${industry}-insight`}
          initial={{ opacity: 0.65 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 rounded-lg border border-emerald-500/12 bg-[#020617]/35 p-3 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-emerald-400/85">
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{t("vp_section_result")}</span>
          </div>
          <p
            className={cn(
              revenueMono.className,
              "mt-2 text-[11px] font-medium leading-[1.6] text-emerald-100/90 [text-wrap:pretty] [overflow-wrap:anywhere] break-words sm:text-[12px]",
            )}
          >
            {scenario.result}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function HeroWorkflowBlueprintRail({
  phase,
  t,
}: {
  phase: HeroWorkflowPhase;
  t: (key: string) => string;
}) {
  const activeIdx = getHeroStoryPillar(phase);
  const steps = [
    { label: t("hero_flow_sight") },
    { label: t("hero_flow_brain") },
    { label: t("hero_flow_voice") },
    { label: t("hero_flow_revenue") },
  ] as const;

  return (
    <div className="w-full">
      <p
        className={cn(
          revenueMono.className,
          "mb-2.5 text-center text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 lg:text-left",
        )}
      >
        {t("hero_flow_caption")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-y-1.5 gap-x-0.5 sm:gap-x-1 lg:justify-start">
        {steps.map((s, idx) => {
          const isActive = activeIdx === idx;
          const isDone = activeIdx !== null && idx < activeIdx;
          return (
            <Fragment key={`hero-flow-${idx}`}>
              {idx > 0 ? (
                <span className="px-0.5 text-[10px] font-medium text-cyan-500/35" aria-hidden>
                  →
                </span>
              ) : null}
              <motion.span
                className={cn(
                  revenueMono.className,
                  "rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider",
                  isActive &&
                    "border-[#00D4FF]/55 bg-[#00D4FF]/14 text-cyan-100 shadow-[0_0_22px_rgba(0,212,255,0.28)]",
                  !isActive &&
                    isDone &&
                    "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-100/80 shadow-[0_0_12px_rgba(16,185,129,0.12)]",
                  !isActive &&
                    !isDone &&
                    "border-white/[0.08] bg-[#020617]/35 text-slate-600",
                )}
                animate={isActive ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 1.25, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
              >
                {s.label}
              </motion.span>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function HeroDataStreamLink({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[6] hidden overflow-visible xl:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="heroDataStreamGrad" x1="100%" y1="35%" x2="0%" y2="65%">
            <stop offset="0%" stopColor="rgba(0,212,255,0)" />
            <stop offset="40%" stopColor="rgba(0,212,255,0.95)" />
            <stop offset="60%" stopColor="rgba(56,189,248,0.9)" />
            <stop offset="100%" stopColor="rgba(0,212,255,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 93 36 C 78 24 68 52 48 46 S 22 54 10 50"
          fill="none"
          stroke="url(#heroDataStreamGrad)"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeDasharray="0.4 2.2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0.35 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.95, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      <motion.div
        className="absolute right-[12%] top-[40%] h-2 w-2 rounded-full bg-cyan-200/95 shadow-[0_0_15px_rgba(0,212,255,0.66)]"
        initial={{ x: 0, opacity: 0.85 }}
        animate={{ x: [-8, -120, -240], opacity: [1, 1, 0.15] }}
        transition={{ duration: 1, ease: "easeInOut", times: [0, 0.55, 1] }}
      />
    </motion.div>
  );
}

export function SalesAgentHeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const lang = locale === "en" ? "en" : "th";
  const sectionRef = useRef<HTMLElement>(null);
  const rccRef = useRef<HTMLDivElement>(null);
  const logBodyRef = useRef<HTMLDivElement>(null);
  const isUserScrollRef = useRef(false);

  const [rccSeen, setRccSeen] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [storyTyping, setStoryTyping] = useState(false);
  const [revenueTrigger, setRevenueTrigger] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>("clinic");
  const selectedIndustryRef = useRef<IndustryId>(selectedIndustry);
  const [workflowPhase, setWorkflowPhase] = useState<HeroWorkflowPhase>("idle");
  const [visionSeedLogs, setVisionSeedLogs] = useState<string[]>([]);
  const [chatEvents, setChatEvents] = useState<SessionEvent[]>([]);
  const [showDataStream, setShowDataStream] = useState(false);
  const [dealPulseId, setDealPulseId] = useState(0);
  const [successPulseKey, setSuccessPulseKey] = useState(0);

  const industries = [
    { id: "clinic" as const, label: t("tab_clinic"), icon: HeartPulse },
    { id: "car" as const, label: t("tab_car"), icon: Car },
    { id: "enterprise" as const, label: t("tab_vision"), icon: ShieldAlert },
  ];

  const scrollLogsToBottom = () => {
    const el = logBodyRef.current;
    if (!el || isUserScrollRef.current) return;
    el.scrollTop = el.scrollHeight;
  };

  const handleLogScroll = () => {
    const el = logBodyRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    isUserScrollRef.current = !atBottom;
  };

  const revenueTarget = lang === "en" ? 84500 : 884500;
  const revenueBaseline = Math.floor(revenueTarget * 0.76);
  const revenuePrefix = lang === "en" ? "$" : "฿";
  const revenueVal = useCountUpPulse(revenueTarget, 1100, dealPulseId);
  const dealsVal = useCountUp(24, 1800, rccSeen);
  const leadsVal = useCountUp(1248, 2200, rccSeen);
  const intentVal = useCountUp(98, 1800, rccSeen);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setSessionActive(true), 600);
        }
      },
      { threshold: 0.25 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = rccRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setRccSeen(true);
      },
      { threshold: 0.22, rootMargin: "0px 0px -5% 0px" },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setRccSeen(true), 500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    selectedIndustryRef.current = selectedIndustry;
  }, [selectedIndustry]);

  useEffect(() => {
    scrollLogsToBottom();
  }, [chatEvents, storyTyping, selectedIndustry]);

  useEffect(() => {
    if (!sessionActive) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const order: IndustryId[] = ["clinic", "car", "enterprise"];

    const runCycle = async () => {
      const ind = selectedIndustryRef.current;
      const story = getHeroStory(ind, lang);

      setWorkflowPhase("vision_sight");
      setVisionSeedLogs(story.visionLogs);
      setChatEvents([]);
      setShowDataStream(false);
      setStoryTyping(false);
      setRevenueTrigger(false);

      await wait(2000);
      if (cancelled) return;

      setWorkflowPhase("data_link");
      setShowDataStream(true);
      await wait(1000);
      if (cancelled) return;
      setShowDataStream(false);

      setWorkflowPhase("chat_ingest");
      setChatEvents([heroSystemVisionLine(lang) as SessionEvent]);
      await wait(320);
      if (cancelled) return;

      setWorkflowPhase("chat_typing");
      setStoryTyping(true);
      await wait(3000);
      if (cancelled) return;
      setStoryTyping(false);

      setWorkflowPhase("chat_turns");
      const [e1, e2, e3, e4] = story.chatEvents;
      setChatEvents((prev) => [...prev, e1]);
      await wait(900);
      if (cancelled) return;
      setChatEvents((prev) => [...prev, e2]);
      await wait(700);
      if (cancelled) return;
      setChatEvents((prev) => [...prev, e3]);
      await wait(550);
      if (cancelled) return;
      setChatEvents((prev) => [...prev, e4]);

      setWorkflowPhase("deal_beat");
      setRevenueTrigger(true);
      await wait(280);
      if (cancelled) return;

      setWorkflowPhase("revenue_pulse");
      setDealPulseId((p) => p + 1);
      setSuccessPulseKey((k) => k + 1);
      await wait(1000);
      if (cancelled) return;

      setRevenueTrigger(false);
      setWorkflowPhase("idle");
      await wait(850);
      if (cancelled) return;

      setSelectedIndustry((prev) => {
        const next = order[(order.indexOf(prev) + 1) % order.length];
        selectedIndustryRef.current = next;
        return next;
      });
    };

    runCycle();
    return () => {
      cancelled = true;
    };
  }, [sessionActive, lang, selectedIndustry]);

  const currentEvent = chatEvents.length > 0 ? chatEvents[chatEvents.length - 1] : null;
  const dealFooterVisible =
    revenueTrigger && !!currentEvent && isResultEvent(currentEvent.title) && !storyTyping;
  const footerLabel = resultFooterLabel(currentEvent, t);
  const footerDetail = resultFooterDetail(currentEvent);

  const visionActionGlow = useMemo(() => {
    const last = chatEvents[chatEvents.length - 1];
    const title = (last?.title ?? "").toUpperCase();
    return title.includes("AI ACTION") || title.includes("RESULT") || title.includes("INCIDENT");
  }, [chatEvents]);

  const thinkingMeta = useMemo(() => {
    switch (selectedIndustry) {
      case "clinic":
        return t("thinking_meta_clinic");
      case "car":
        return t("thinking_meta_car");
      default:
        return t("thinking_meta_vision");
    }
  }, [selectedIndustry, t]);

  const visionActivityLog = useMemo(() => {
    if (workflowPhase === "vision_sight" || workflowPhase === "data_link") {
      return visionSeedLogs;
    }
    return buildVisionActivityLog(chatEvents, t);
  }, [workflowPhase, visionSeedLogs, chatEvents, t]);

  const sightPrimary = workflowPhase === "vision_sight" || workflowPhase === "data_link";

  const hubDim =
    workflowPhase === "vision_sight" || workflowPhase === "data_link"
      ? 0.74
      : workflowPhase === "revenue_pulse" || workflowPhase === "deal_beat"
        ? 1
        : 0.92;
  const chatDim =
    workflowPhase === "vision_sight" ? 0.58 : workflowPhase === "data_link" ? 0.82 : 1;
  const visionDim =
    workflowPhase === "chat_ingest" ||
    workflowPhase === "chat_typing" ||
    workflowPhase === "chat_turns"
      ? 0.66
      : 1;

  return (
    <section id="ai-sales" ref={sectionRef} className="relative overflow-hidden bg-[#020617] pb-20 pt-12 lg:pb-32 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[#020617]" />

      {(["clinic", "car", "enterprise"] as IndustryId[]).map((id) => (
        <motion.div
          key={id}
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={{ opacity: selectedIndustry === id ? 1 : 0 }}
          transition={BG_TRANSITION}
          style={{ background: HERO_BG_LAYERS[id].gradient }}
        />
      ))}

      {(["clinic", "car", "enterprise"] as IndustryId[]).map((id) => (
        <motion.div
          key={`glow-${id}`}
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={{ opacity: selectedIndustry === id ? 1 : 0 }}
          transition={BG_TRANSITION}
          style={{ background: HERO_BG_LAYERS[id].glow }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] [background-size:48px_48px]" />

      {(["clinic", "car", "enterprise"] as IndustryId[]).map((id) => (
        <motion.div
          key={`aura-${id}`}
          className="pointer-events-none absolute left-1/2 top-[16%] h-[520px] w-[min(92vw,880px)] -translate-x-1/2 rounded-full blur-3xl"
          initial={false}
          animate={{ opacity: selectedIndustry === id ? 1 : 0 }}
          transition={BG_TRANSITION}
          style={{
            background: `radial-gradient(circle, ${HERO_BG_LAYERS[id].chatAura}, transparent 68%)`,
          }}
        />
      ))}

      <HeroDataStreams />

      <div className="pointer-events-none absolute bottom-6 right-3 z-[14] hidden flex-col items-end gap-2 sm:flex lg:bottom-8 lg:right-6">
        <div className="flex items-center gap-1.5 rounded-lg border border-white/14 bg-[#020617]/75 px-2 py-1 shadow-[0_0_20px_rgba(0,212,255,0.12)] backdrop-blur-md">
          <Award className="h-3.5 w-3.5 text-cyan-300" strokeWidth={2} />
          <span className={cn(revenueMono.className, "text-[9px] font-semibold tracking-wide text-sky-100")}>{t("hero_trust_iso")}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-white/14 bg-[#020617]/75 px-2 py-1 shadow-[0_0_20px_rgba(0,212,255,0.12)] backdrop-blur-md">
          <FileCheck className="h-3.5 w-3.5 text-emerald-300" strokeWidth={2} />
          <span className={cn(revenueMono.className, "text-[9px] font-semibold tracking-wide text-sky-100")}>{t("hero_trust_pdpa")}</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-12 xl:flex-row xl:items-start xl:gap-5 2xl:gap-6">
          <motion.div
            className="relative z-20 order-1 w-full pt-4 text-center xl:order-none xl:w-[25%] xl:max-w-none xl:shrink-0 xl:pt-12 xl:text-left"
            animate={{ opacity: hubDim }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className={cn(
                cockpitHeadline.className,
                "mx-auto max-w-[24ch] text-balance break-keep text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:mx-0 lg:text-[3.25rem] lg:leading-[1.08] transition-opacity duration-500",
              )}
            >
              <span className="text-slate-100">{t("title_line1_prefix")}</span>
              <span className="guardian-text guardian-text--subtle">{t("title_line1_guardian")}</span>
            </h1>

            <p
              className={cn(
                revenueMono.className,
                "mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed tracking-tight text-sky-200/95 sm:text-lg lg:mx-0 lg:mt-7",
              )}
            >
              {t("title_line2")}
            </p>

            <p className="mx-auto mt-5 max-w-lg text-[15px] font-medium leading-relaxed text-slate-300 sm:text-base lg:mx-0 transition-colors duration-500 [text-wrap:pretty]">
              {t("desc")}
            </p>

            <div className="mx-auto mt-10 flex max-w-md flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:mx-0 lg:justify-start">
              <Link href="#live-demo" className="btn-audomas-primary min-h-[48px] w-full sm:w-auto">
                {t("cta_try")}
              </Link>
              <Link href="#demo" className="btn-audomas-secondary min-h-[48px] w-full sm:w-auto">
                <Play className="relative h-4 w-4 text-sky-400" fill="currentColor" />
                {t("cta_demo")}
              </Link>
            </div>

            {/* Today's Success Report — Revenue Command Center cluster directly under CTAs */}
            <motion.div
              ref={rccRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass-enterprise audomas-media relative mx-auto mt-8 w-full max-w-md border border-white/[0.08] bg-[#020617]/38 p-5 pb-6 shadow-[0_28px_56px_-16px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,212,255,0.06)] ring-1 ring-[#00D4FF]/12 backdrop-blur-[28px] lg:mx-0"
            >
              <AnimatePresence>
                {workflowPhase === "revenue_pulse" ? (
                  <motion.div
                    key={successPulseKey}
                    className="pointer-events-none absolute right-4 top-1/2 z-30 h-3 w-3 -translate-y-1/2 rounded-full bg-[#39FF14] shadow-[0_0_32px_rgba(57,255,20,0.95)]"
                    initial={{ opacity: 1, x: 0 }}
                    animate={{ x: -320, opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-sky-500/[0.04]" />

              <div className="absolute right-3 top-3 z-20 flex shrink-0 items-center gap-1.5 rounded-full border border-[#39FF14]/40 bg-[#020617]/65 px-2.5 py-1 shadow-[0_0_24px_rgba(57,255,20,0.25)] backdrop-blur-sm">
                <motion.span
                  className="h-2 w-2 rounded-full bg-[#39FF14]"
                  animate={{ opacity: [1, 0.35, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#39FF14]">{t("rcc_live")}</span>
              </div>

              <div className="relative z-10 mb-5 pr-24 text-left">
                <p
                  className={cn(
                    revenueMono.className,
                    "mb-2 inline-block rounded-md border border-[#00D4FF]/25 bg-[#020617]/80 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#00D4FF]",
                  )}
                >
                  {heroHubStatusChip(workflowPhase, lang)}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00D4FF]/95">{t("rcc_title")}</p>
                <p className="mt-1 text-[11px] font-medium text-slate-400">{t("rcc_subtitle")}</p>
              </div>

              <div className="relative z-10">
                <div className="flex flex-wrap items-end gap-2">
                  <motion.p
                    className={cn(
                      revenueMono.className,
                      "text-[2.35rem] font-bold leading-none tracking-tight text-[#39FF14] [text-shadow:0_0_40px_rgba(57,255,20,0.45),0_0_80px_rgba(57,255,20,0.2)] sm:text-[2.85rem] lg:text-[3.15rem]",
                      lang === "th" &&
                        "text-[2.55rem] tabular-nums sm:text-[3.05rem] lg:text-[3.35rem] [text-shadow:0_0_48px_rgba(57,255,20,0.55),0_0_96px_rgba(57,255,20,0.22)]",
                    )}
                    animate={
                      revenueTrigger
                        ? {
                            textShadow: [
                              "0 0 8px rgba(57,255,20,0.35), 0 2px 12px rgba(57,255,20,0.4)",
                              "0 0 36px rgba(57,255,20,0.85), 0 0 52px rgba(57,255,20,0.35)",
                              "0 0 16px rgba(57,255,20,0.55), 0 2px 14px rgba(57,255,20,0.45)",
                            ],
                          }
                        : {}
                    }
                    transition={{ duration: 1.1 }}
                  >
                    {revenuePrefix}
                    {(dealPulseId < 1 ? revenueBaseline : revenueVal).toLocaleString()}
                  </motion.p>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{t("rcc_total_label")}</span>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} />
                    {t("rcc_delta")}
                  </span>
                  <span className="text-[10px] text-slate-500">{t("rcc_vs_yesterday")}</span>
                </div>
              </div>

              <div className="relative z-10 mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-4">
                <div className="rounded-xl border border-white/[0.08] bg-[#020617]/55 px-2 py-3 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#00D4FF]/20">
                  <div className={RCC_GLASS_ICON}>
                    <Search className="h-4 w-4 text-[#00D4FF]" strokeWidth={2} />
                  </div>
                  <p className="text-[8px] font-bold uppercase leading-tight tracking-wider text-slate-400">{t("rcc_leads")}</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-white sm:text-xl">{leadsVal.toLocaleString()}</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#020617]/55 px-2 py-3 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#00D4FF]/20">
                  <div className={RCC_GLASS_ICON}>
                    <Brain className="h-4 w-4 text-[#00D4FF]" strokeWidth={2} />
                  </div>
                  <p className="text-[8px] font-bold uppercase leading-tight tracking-wider text-slate-400">{t("rcc_intent")}</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-emerald-400 sm:text-xl">
                    {intentVal}
                    <span className="text-sm text-emerald-400/60">%</span>
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#020617]/55 px-2 py-3 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#00D4FF]/20">
                  <div className={RCC_GLASS_ICON}>
                    <Zap className="h-4 w-4 text-[#00D4FF]" strokeWidth={2} />
                  </div>
                  <p className="text-[8px] font-bold uppercase leading-tight tracking-wider text-slate-400">{t("rcc_actions")}</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-white sm:text-xl">{dealsVal}</p>
                </div>
              </div>
            </motion.div>

            <p
              className={cn(
                revenueMono.className,
                "mx-auto mt-5 max-w-md text-[11px] font-medium leading-relaxed text-slate-500 lg:mx-0",
              )}
            >
              {t("hero_data_layer")}
            </p>
          </motion.div>

          <div className="order-2 flex w-full min-w-0 flex-col gap-6 xl:order-none xl:min-w-0 xl:flex-1 xl:gap-6">
            <LayoutGroup id="hero-usecase-tabs">
              <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-1 sm:gap-x-1.5 lg:justify-start">
                {industries.map((ind) => {
                  const active = selectedIndustry === ind.id;
                  return (
                    <div key={ind.id} className="flex items-center">
                      <motion.button
                        type="button"
                        layout
                        onClick={() => {
                          selectedIndustryRef.current = ind.id;
                          setSelectedIndustry(ind.id);
                          setChatEvents([]);
                          setRevenueTrigger(false);
                          setWorkflowPhase("idle");
                        }}
                        transition={BG_TRANSITION}
                        className={cn(
                          "relative flex items-center gap-2 rounded-full border px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider sm:px-4",
                          active
                            ? "z-[1] border-[#00D4FF]/45 text-white shadow-[0_0_32px_rgba(0,212,255,0.35),0_0_1px_rgba(0,212,255,0.5)]"
                            : "border-white/10 bg-[#020617]/45 text-slate-500 opacity-[0.88] backdrop-blur-md transition-[color,border-color,opacity,box-shadow] duration-300 hover:border-[#00D4FF]/28 hover:text-sky-100/90 hover:opacity-100 hover:shadow-[0_0_18px_rgba(0,212,255,0.14)]",
                        )}
                      >
                        {active ? (
                          <motion.span
                            layoutId="hero-usecase-active-pill"
                            className="absolute inset-0 z-0 rounded-full bg-sky-600 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.55)]"
                            transition={{ type: "spring", stiffness: 440, damping: 34 }}
                          />
                        ) : null}
                        <span className="relative z-10 flex items-center gap-2">
                          <motion.span
                            className="flex shrink-0 items-center justify-center"
                            animate={
                              active
                                ? {
                                    filter: [
                                      "drop-shadow(0 0 2px rgba(186,230,253,0.45))",
                                      "drop-shadow(0 0 12px rgba(34,211,238,0.95))",
                                      "drop-shadow(0 0 2px rgba(186,230,253,0.45))",
                                    ],
                                  }
                                : { filter: "brightness(0.95)" }
                            }
                            transition={{ duration: 2.35, repeat: active ? Infinity : 0, ease: "easeInOut" }}
                          >
                            <ind.icon className={cn("h-3.5 w-3.5", active ? "text-white" : "text-slate-500")} strokeWidth={2} />
                          </motion.span>
                          <span className={cn(active ? "text-white" : undefined)}>{ind.label}</span>
                        </span>
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </LayoutGroup>

            <HeroWorkflowBlueprintRail phase={workflowPhase} t={t} />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndustry}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="relative flex w-full min-w-0 flex-col items-stretch gap-8 xl:flex-row xl:items-stretch xl:gap-5 2xl:gap-6"
              >
                <HeroDataStreamLink active={showDataStream} />
                <motion.div
                  className="relative z-10 mx-auto w-full max-w-[min(100%,680px)] shrink-0 xl:mx-0 xl:max-w-none xl:flex-[45_1_0%] xl:min-w-0"
                  animate={{ opacity: chatDim }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="audomas-media border border-white/12 ring-1 ring-white/5">
                    <div
                      className="flex h-[min(82vh,820px)] flex-col overflow-hidden rounded-[inherit] border border-white/10 bg-gradient-to-b from-[#F7F7F8] via-white/95 to-sky-50/80 shadow-[0_20px_56px_rgba(15,23,42,0.1)] backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-500"
                      style={{ minHeight: 0 }}
                    >
                    <div className="shrink-0 border-b border-slate-900/80 bg-slate-900 px-5 py-2 sm:px-6">
                      <p
                        className={cn(
                          revenueMono.className,
                          "text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-300",
                        )}
                      >
                        {heroChatStatusChip(workflowPhase, lang)}
                      </p>
                    </div>
                    <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200/60 bg-white/55 px-5 py-4 backdrop-blur-xl sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-red-400/70" />
                          <div className="h-2 w-2 rounded-full bg-amber-400/70" />
                          <div className="h-2 w-2 rounded-full bg-emerald-400/70" />
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B1F33] text-sm font-semibold text-white shadow-md">
                          AI
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold leading-tight text-slate-900">{t("ai_name")}</p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
                            <motion.span
                              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
                              animate={{ opacity: [1, 0.4, 1] }}
                              transition={{ duration: 1.4, repeat: Infinity }}
                            />
                            {t("ai_status")}
                          </p>
                        </div>
                      </div>
                      <div className="hidden items-center gap-1.5 sm:flex">
                        <ShieldCheck className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
                        <span className="text-[10px] font-medium text-slate-500">Secure session</span>
                      </div>
                    </div>

                    <div
                      ref={logBodyRef}
                      onScroll={handleLogScroll}
                      className="enterprise-scrollbar-hidden min-h-0 flex-1 space-y-3 overflow-y-auto scroll-smooth px-4 py-4 sm:space-y-4 sm:px-5 sm:py-5"
                    >
                      <AnimatePresence mode="popLayout">
                        {chatEvents.map((event, i) => (
                          <ChatBubble
                            key={`${selectedIndustry}-${lang}-${event.time}-${i}`}
                            event={event}
                            isUser={isUserBubble(event.title)}
                          />
                        ))}
                      </AnimatePresence>
                      <AnimatePresence>
                        {storyTyping ? (
                          <TypingIndicator key={`typing-${selectedIndustry}`} label={t("ai_typing")} meta={thinkingMeta} />
                        ) : null}
                      </AnimatePresence>
                    </div>

                    <DealClosedFooter
                      visible={dealFooterVisible}
                      label={footerLabel}
                      detail={footerDetail}
                      pulseKey={`${selectedIndustry}-${footerLabel}-${footerDetail}`}
                    />

                    <div className="flex h-[52px] shrink-0 items-center border-t border-slate-200/60 bg-white/45 px-5 backdrop-blur-xl sm:px-6">
                      <div className="flex w-full items-center justify-between gap-4 text-[10px] font-medium text-slate-500">
                        <span className="rounded-lg bg-slate-900/[0.06] px-2.5 py-1 text-slate-600">Live preview</span>
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <Lock className="h-3 w-3 opacity-60" strokeWidth={2} />
                          Encrypted
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="mx-auto flex w-full min-w-0 justify-stretch xl:mx-0 xl:max-w-none xl:flex-[30_1_0%] xl:min-w-0"
                animate={{ opacity: visionDim }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <AIVisionPanel
                  industry={selectedIndustry}
                  actionGlowActive={visionActionGlow}
                  activityLogLines={visionActivityLog}
                  workflowPhase={workflowPhase}
                  sightPrimary={sightPrimary}
                />
              </motion.div>
            </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative z-10 mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <p
              className={cn(
                revenueMono.className,
                "max-w-3xl text-center text-[11px] font-medium leading-relaxed text-slate-400 sm:text-left sm:text-xs",
              )}
            >
              {t("hero_trust_line")}
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#00D4FF]/30 bg-[#020617]/70 px-3 py-1.5 text-[10px] font-semibold text-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.18)] backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              <span className="leading-snug">{t("hero_trust_airgapx")}</span>
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
            <div className="flex items-center gap-3 rounded-xl border border-white/12 bg-[#020617]/55 px-3 py-2 shadow-[0_0_24px_rgba(0,212,255,0.1)] backdrop-blur-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-900 text-xs font-bold text-white ring-1 ring-white/15">
                P
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-bold tracking-tight text-slate-100">{t("hero_trust_prosystems")}</p>
                <p className="text-[10px] font-medium text-slate-400">{t("hero_trust_prosystems_sub")}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-[#020617]/65 px-2.5 py-1 text-[10px] font-semibold text-sky-100 shadow-[0_0_16px_rgba(0,212,255,0.12)]">
                <Award className="h-3 w-3 text-cyan-300" strokeWidth={2} />
                {t("hero_trust_iso")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-[#020617]/65 px-2.5 py-1 text-[10px] font-semibold text-sky-100 shadow-[0_0_16px_rgba(16,185,129,0.12)]">
                <FileCheck className="h-3 w-3 text-emerald-300" strokeWidth={2} />
                {t("hero_trust_pdpa")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
