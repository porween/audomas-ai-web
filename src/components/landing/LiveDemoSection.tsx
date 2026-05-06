"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Send,
  User,
  BrainCircuit,
  CheckCircle2,
  Loader2,
  Activity,
  Zap,
  TrendingUp,
  Bell,
  Shield,
  Clock,
  Stethoscope,
  Car,
  Store,
  Building2,
  MessageCircle,
  Video,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

// ── Types ────────────────────────────────────────────────
type Message = { role: "user" | "ai"; content: string; timestamp: string };

type LogEntry = {
  id: number;
  icon: React.ElementType;
  label: string;
  detail: string;
  color: string;
  glow: string;
  delay: number;
};

type DemoUseCase = "clinic" | "car" | "sme" | "enterprise";

const DEMO_USE_CASES: DemoUseCase[] = ["clinic", "car", "sme", "enterprise"];

const USE_CASE_BG: Record<DemoUseCase, string> = {
  clinic: "live-demo-bg-clinic",
  car: "live-demo-bg-car",
  sme: "live-demo-bg-sme",
  enterprise: "live-demo-bg-enterprise",
};

const MIDNIGHT = "#020617";
const LINE_GREEN = "#06C755";
const CYAN = "#00D4FF";

const sectionFont = {
  fontFamily: 'var(--font-urbanist), "Inter", ui-sans-serif, system-ui, sans-serif',
} as const;

const TAB_ICONS: Record<DemoUseCase, LucideIcon> = {
  clinic: Stethoscope,
  car: Car,
  sme: Store,
  enterprise: Building2,
};

const VISION_CAM_KEYS: Record<DemoUseCase, "vision_cam_clinic" | "vision_cam_car" | "vision_cam_sme" | "vision_cam_enterprise"> = {
  clinic: "vision_cam_clinic",
  car: "vision_cam_car",
  sme: "vision_cam_sme",
  enterprise: "vision_cam_enterprise",
};

const SCENARIO_TITLE_KEYS: Record<
  DemoUseCase,
  "scenario_clinic_title" | "scenario_car_title" | "scenario_sme_title" | "scenario_enterprise_title"
> = {
  clinic: "scenario_clinic_title",
  car: "scenario_car_title",
  sme: "scenario_sme_title",
  enterprise: "scenario_enterprise_title",
};

const SCENARIO_POINTS_KEYS: Record<
  DemoUseCase,
  "scenario_clinic_points" | "scenario_car_points" | "scenario_sme_points" | "scenario_enterprise_points"
> = {
  clinic: "scenario_clinic_points",
  car: "scenario_car_points",
  sme: "scenario_sme_points",
  enterprise: "scenario_enterprise_points",
};

const VISION_ANALYSIS_KEYS: Record<
  DemoUseCase,
  "vision_analysis_clinic" | "vision_analysis_car" | "vision_analysis_sme" | "vision_analysis_enterprise"
> = {
  clinic: "vision_analysis_clinic",
  car: "vision_analysis_car",
  sme: "vision_analysis_sme",
  enterprise: "vision_analysis_enterprise",
};

const NEXT_USE_CASE: Record<DemoUseCase, DemoUseCase> = {
  clinic: "car",
  car: "sme",
  sme: "enterprise",
  enterprise: "clinic",
};

const glassPanel =
  "rounded-[1.35rem] overflow-hidden border border-[#00D4FF]/16 bg-[#020617]/55 backdrop-blur-2xl " +
  "shadow-[inset_0_1px_0_0_rgba(0,212,255,0.12),0_20px_60px_rgba(0,0,0,0.5)]";

function getNow() {
  return new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function LogItem({ entry, visible }: { entry: LogEntry; visible: boolean }) {
  const Icon = entry.icon;
  return (
    <div
      className={cn(
        "flex items-start gap-3 transition-all duration-500",
        visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/12 bg-[#020617]/80",
          entry.glow,
        )}
      >
        <CheckCircle2 className={cn("h-3.5 w-3.5", entry.color)} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Icon className={cn("h-3.5 w-3.5 shrink-0", entry.color)} />
          <span className={cn("text-[10px] font-bold uppercase tracking-widest", entry.color)}>{entry.label}</span>
        </div>
        <p className="mt-0.5 text-xs font-medium leading-snug text-slate-200">{entry.detail}</p>
      </div>
    </div>
  );
}

function VisionMonitorMock({ useCase }: { useCase: DemoUseCase }) {
  const t = useTranslations("LiveDemo");
  const gridBg =
    "pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(0,212,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.12)_1px,transparent_1px)] [background-size:11px_11px]";

  return (
    <div
      className="relative mb-4 h-[156px] w-full overflow-hidden rounded-xl border border-white/10 bg-[#050a12]"
      aria-hidden
    >
      <div className={gridBg} />
      <div className="absolute left-2 top-2 z-10 flex items-center gap-1.5 rounded-md border border-white/10 bg-[#020617]/85 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-300 backdrop-blur-sm">
        <Video className="h-3 w-3 text-[#00D4FF]" strokeWidth={1.5} />
        {t(`vision_cam_${useCase}` as "vision_cam_clinic")}
      </div>
      <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full border border-red-400/45 bg-red-500/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-red-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
          RECORDING
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[#22c55e]/35 bg-[#22c55e]/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[#4ade80]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ade80]" />
          AI ACTIVE
        </span>
      </div>

      {useCase === "clinic" && (
        <>
          <motion.div
            className="absolute bottom-8 left-[18%] h-[56%] w-[22%] rounded-sm border-2 border-[#22c55e]"
            style={{ boxShadow: `0 0 14px rgba(34,197,94,0.35)` }}
            animate={{ x: [0, 3, 0], y: [0, -2, 0] }}
            transition={{ duration: 2.1, repeat: Infinity }}
          />
          <span className="absolute bottom-7 left-[18%] rounded px-1 text-[7px] font-bold uppercase text-[#22c55e]">Queue #4</span>
        </>
      )}
      {useCase === "car" && (
        <>
          <motion.div
            className="absolute bottom-10 left-[16%] h-[24%] w-[46%] rounded-sm border-2 border-[#22c55e]"
            style={{ boxShadow: `0 0 14px rgba(34,197,94,0.35)` }}
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          <span className="absolute bottom-9 left-[16%] rounded px-1 text-[7px] font-bold uppercase text-[#22c55e]">Model: SUV-X</span>
        </>
      )}
      {useCase === "sme" && (
        <>
          <div
            className="absolute inset-2 rounded-md opacity-[0.65]"
            style={{
              background: "radial-gradient(ellipse 60% 55% at 60% 44%, rgba(239,68,68,0.45), rgba(250,204,21,0.28), rgba(34,197,94,0.18), transparent 72%)",
            }}
          />
          <motion.div
            className="absolute bottom-8 left-[32%] h-[44%] w-[26%] rounded-sm border-2 border-[#22c55e]"
            style={{ boxShadow: `0 0 14px rgba(34,197,94,0.35)` }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </>
      )}
      {useCase === "enterprise" && (
        <>
          <div
            className="absolute left-[14%] right-[14%] top-1/2 h-0 -translate-y-1/2 border-t-2 border-dashed border-[#00D4FF]/50"
            style={{ boxShadow: `0 0 10px rgba(0,212,255,0.2)` }}
          />
          <motion.div
            className="absolute bottom-8 right-[20%] h-[52%] w-[26%] rounded-sm border-2 border-[#ef4444]"
            style={{ boxShadow: `0 0 12px rgba(239,68,68,0.3)` }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.1, repeat: Infinity }}
          />
          <span className="absolute bottom-7 right-[20%] text-[7px] font-bold uppercase text-[#f87171]">Restricted zone</span>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#020617]/80 px-3 py-1.5 text-[10px] font-semibold text-cyan-200">
        {t(VISION_ANALYSIS_KEYS[useCase])}
      </div>
    </div>
  );
}

function LiveDemoWorkspace({
  useCase,
  onUseCaseComplete,
}: {
  useCase: DemoUseCase;
  onUseCaseComplete?: (useCase: DemoUseCase) => void;
}) {
  const t = useTranslations("LiveDemo");

  const thinkingSequences: LogEntry[][] = useMemo(
    () => [
      [
        {
          id: 1,
          icon: Activity,
          label: t("log_intent"),
          detail: t("detail_high_interest"),
          color: "text-cyan-300",
          glow: "shadow-[0_0_8px_rgba(34,211,238,0.45)]",
          delay: 400,
        },
        {
          id: 2,
          icon: TrendingUp,
          label: t("log_scoring"),
          detail: t("detail_hot_lead"),
          color: "text-emerald-300",
          glow: "shadow-[0_0_8px_rgba(52,211,153,0.45)]",
          delay: 900,
        },
        {
          id: 3,
          icon: Zap,
          label: t("log_action"),
          detail: t("detail_gen_quote"),
          color: "text-amber-300",
          glow: "shadow-[0_0_8px_rgba(252,211,77,0.45)]",
          delay: 1500,
        },
        {
          id: 4,
          icon: Bell,
          label: t("log_notification"),
          detail: t("detail_alert_sales"),
          color: "text-sky-300",
          glow: "shadow-[0_0_8px_rgba(125,211,252,0.45)]",
          delay: 2200,
        },
      ],
      [
        {
          id: 1,
          icon: Activity,
          label: t("log_intent"),
          detail: t("detail_price_detect"),
          color: "text-cyan-300",
          glow: "shadow-[0_0_8px_rgba(34,211,238,0.45)]",
          delay: 400,
        },
        {
          id: 2,
          icon: TrendingUp,
          label: t("log_scoring"),
          detail: t("detail_warm_lead"),
          color: "text-orange-300",
          glow: "shadow-[0_0_8px_rgba(253,186,116,0.45)]",
          delay: 850,
        },
        {
          id: 3,
          icon: Zap,
          label: t("log_action"),
          detail: t("detail_send_pricing"),
          color: "text-amber-300",
          glow: "shadow-[0_0_8px_rgba(252,211,77,0.45)]",
          delay: 1400,
        },
        {
          id: 4,
          icon: Shield,
          label: t("log_compliance"),
          detail: t("detail_pdpa"),
          color: "text-violet-300",
          glow: "shadow-[0_0_8px_rgba(196,181,253,0.45)]",
          delay: 2000,
        },
      ],
      [
        {
          id: 1,
          icon: Activity,
          label: t("log_intent"),
          detail: t("detail_comparing"),
          color: "text-cyan-300",
          glow: "shadow-[0_0_8px_rgba(34,211,238,0.45)]",
          delay: 400,
        },
        {
          id: 2,
          icon: TrendingUp,
          label: t("log_scoring"),
          detail: t("detail_high_potential"),
          color: "text-emerald-300",
          glow: "shadow-[0_0_8px_rgba(52,211,153,0.45)]",
          delay: 900,
        },
        {
          id: 3,
          icon: Zap,
          label: t("log_action"),
          detail: t("detail_prep_table"),
          color: "text-amber-300",
          glow: "shadow-[0_0_8px_rgba(252,211,77,0.45)]",
          delay: 1500,
        },
        {
          id: 4,
          icon: Bell,
          label: t("log_notification"),
          detail: t("detail_follow_up"),
          color: "text-sky-300",
          glow: "shadow-[0_0_8px_rgba(125,211,252,0.45)]",
          delay: 2100,
        },
      ],
    ],
    [t],
  );

  const defaultLogs: LogEntry[] = useMemo(
    () => [
      {
        id: 1,
        icon: Shield,
        label: t("log_status"),
        detail: t("detail_operational"),
        color: "text-emerald-300",
        glow: "shadow-[0_0_8px_rgba(52,211,153,0.35)]",
        delay: 0,
      },
      {
        id: 2,
        icon: Activity,
        label: t("log_intent"),
        detail: t("detail_standby"),
        color: "text-cyan-300",
        glow: "shadow-[0_0_8px_rgba(34,211,238,0.35)]",
        delay: 0,
      },
      {
        id: 3,
        icon: Clock,
        label: t("log_resp_time"),
        detail: t("detail_nominal"),
        color: "text-slate-300",
        glow: "",
        delay: 0,
      },
    ],
    [t],
  );

  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: t(`uc_initial_${useCase}`), timestamp: getNow() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sessionId] = useState(() => Math.floor(Math.random() * 9000) + 1000);

  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    setVisibleLogs(defaultLogs);
  }, [defaultLogs]);

  const [processingSeq, setProcessingSeq] = useState<LogEntry[] | null>(null);
  const [seqIndex, setSeqIndex] = useState(0);

  const msgBodyRef = useRef<HTMLDivElement>(null);
  const logBodyRef = useRef<HTMLDivElement>(null);
  const sendCountRef = useRef(0);
  const isMsgUserScrollRef = useRef(false);
  const isLogUserScrollRef = useRef(false);

  const scrollMsgToBottom = () => {
    const el = msgBodyRef.current;
    if (!el || isMsgUserScrollRef.current) return;
    el.scrollTop = el.scrollHeight;
  };
  const scrollLogToBottom = () => {
    const el = logBodyRef.current;
    if (!el || isLogUserScrollRef.current) return;
    el.scrollTop = el.scrollHeight;
  };
  const handleMsgScroll = () => {
    const el = msgBodyRef.current;
    if (!el) return;
    isMsgUserScrollRef.current = el.scrollHeight - el.scrollTop - el.clientHeight > 40;
  };
  const handleLogScroll = () => {
    const el = logBodyRef.current;
    if (!el) return;
    isLogUserScrollRef.current = el.scrollHeight - el.scrollTop - el.clientHeight > 40;
  };

  useEffect(() => {
    scrollMsgToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  useEffect(() => {
    scrollLogToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleLogs.length]);

  useEffect(() => {
    if (!processingSeq) return;
    if (seqIndex >= processingSeq.length) {
      setProcessingSeq(null);
      setIsProcessing(false);
      return;
    }
    const entry = processingSeq[seqIndex];
    const timer = setTimeout(() => {
      setVisibleLogs((prev) => [...prev, entry]);
      setSeqIndex((prev) => prev + 1);
    }, entry.delay - (seqIndex > 0 ? processingSeq[seqIndex - 1].delay : 0));
    return () => clearTimeout(timer);
  }, [processingSeq, seqIndex]);

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;

    const ts = getNow();
    setMessages((prev) => [...prev, { role: "user", content: text, timestamp: ts }]);
    setInput("");
    setIsTyping(true);
    setIsProcessing(true);

    const seq = thinkingSequences[sendCountRef.current % thinkingSequences.length];
    sendCountRef.current += 1;

    setProcessingSeq(null);
    setTimeout(() => {
      setProcessingSeq(seq);
      setSeqIndex(0);
    }, 200);

    const lower = text.toLowerCase();
    let aiResponse = t("ai_response_default");

    if (lower.includes("price") || lower.includes("cost") || lower.includes("ราคา")) {
      aiResponse = t("ai_response_price");
    } else if (lower.includes("interest") || lower.includes("สนใจ")) {
      aiResponse = t("ai_response_interest");
    } else if (lower.includes("promo") || lower.includes("โปรโมชั่น")) {
      aiResponse = t("ai_response_promo");
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", content: aiResponse, timestamp: getNow() }]);
      setIsTyping(false);
      onUseCaseComplete?.(useCase);
    }, 2600);
  };

  const quickReplies = [t(`uc_quick_${useCase}_1`), t(`uc_quick_${useCase}_2`), t(`uc_quick_${useCase}_3`)];

  const scenarioPoints = t(SCENARIO_POINTS_KEYS[useCase]).split("|");

  return (
    <div
      className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8"
      style={sectionFont}
    >
      {/* LEFT — headline & scenario */}
      <aside className="order-2 flex flex-col justify-center lg:order-none lg:col-span-2">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#00D4FF]">{t("eyebrow")}</p>
        <h2 className="mb-3 text-balance text-2xl font-extrabold leading-tight tracking-tight text-white lg:text-[1.65rem]">
          {t("headline_prefix")}{" "}
          <span className="bg-gradient-to-r from-[#00D4FF] via-[#39FF14] to-[#00D4FF] bg-clip-text text-transparent">
            {t("headline_highlight")}
          </span>{" "}
          {t("headline_suffix")}
        </h2>
        <p className="mb-6 text-sm font-light leading-relaxed text-slate-400">{t("subtitle")}</p>
        <div className="rounded-2xl border border-[#00D4FF]/14 bg-[#020617]/45 p-5 backdrop-blur-xl">
          <div className="mb-2 flex items-center gap-2 text-[#39FF14]">
            <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Enterprise</span>
          </div>
          <p className="mb-3 text-base font-bold text-white">{t(SCENARIO_TITLE_KEYS[useCase])}</p>
          <ul className="space-y-2.5">
            {scenarioPoints.map((pt) => (
              <li key={pt} className="flex gap-2.5 text-sm leading-snug text-slate-400">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#00D4FF]" style={{ boxShadow: `0 0 8px ${CYAN}` }} />
                <span>{pt.trim()}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* CENTER — LINE-style chat */}
      <div className={cn("order-3 flex min-h-[min(640px,72vh)] flex-col lg:order-none lg:col-span-6", glassPanel)}>
        {/* LINE header */}
        <div className="flex shrink-0 items-center gap-3 bg-[#06C755] px-4 py-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white ring-2 ring-white/30">
            <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-white">{t("chat_header_title")}</div>
            <div className="truncate text-[11px] text-white/90">{t(`uc_channel_${useCase}`)}</div>
          </div>
          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/35 bg-[#020617]/30 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            <Lock className="h-3 w-3" strokeWidth={2} />
            {t("chat_secure")}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-b border-white/10 bg-[#020617]/50 px-4 py-2 text-[10px] font-medium text-slate-400 backdrop-blur-md">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            SESSION DEMO-{sessionId}
          </span>
          <span className="flex items-center gap-1.5 sm:ml-auto">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            AUDIT · ON
          </span>
        </div>

        <div
          ref={msgBodyRef}
          onScroll={handleMsgScroll}
          className="flex flex-1 flex-col space-y-4 overflow-y-auto bg-[#0a1019]/90 px-4 py-4"
          style={{ overscrollBehavior: "contain" }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-2.5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  msg.role === "user"
                    ? "border border-white/15 bg-slate-700 text-white"
                    : "border border-white/20 text-white",
                )}
                style={
                  msg.role === "ai"
                    ? { backgroundColor: LINE_GREEN, boxShadow: `0 0 12px rgba(6,199,85,0.35)` }
                    : undefined
                }
              >
                {msg.role === "user" ? <User className="h-4 w-4" /> : "A"}
              </div>

              <div className={cn("max-w-[82%]", msg.role === "user" ? "text-right" : "text-left")}>
                <div className="mb-1 px-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  {msg.role === "user" ? t("msg_you") : t("ai_name")}
                </div>
                <div
                  className={cn(
                    "inline-block px-3.5 py-2.5 text-left text-[15px] leading-relaxed shadow-md",
                    msg.role === "user"
                      ? "rounded-2xl rounded-tr-sm font-semibold text-white"
                      : "rounded-2xl rounded-tl-sm border border-black/5 bg-white font-medium text-slate-900",
                  )}
                  style={msg.role === "user" ? { backgroundColor: LINE_GREEN } : undefined}
                >
                  <p>{msg.content}</p>
                </div>
                <div
                  className={cn(
                    "mt-1 flex items-center gap-1.5 font-mono text-[10px] tabular-nums text-slate-500",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <span>{msg.timestamp}</span>
                  {msg.role === "user" ? (
                    <span className="rounded bg-[#06C755]/15 px-1.5 py-0.5 font-sans text-[9px] font-bold text-[#22c55e]">
                      {t("msg_read")}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white"
                style={{ backgroundColor: LINE_GREEN }}
              >
                A
              </div>
              <div>
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{t("ai_name")}</div>
                <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm border border-black/5 bg-white px-3.5 py-2.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-[bounce_1.2s_infinite_0s] rounded-full bg-emerald-500" />
                    <span className="h-1.5 w-1.5 animate-[bounce_1.2s_infinite_0.15s] rounded-full bg-emerald-500" />
                    <span className="h-1.5 w-1.5 animate-[bounce_1.2s_infinite_0.3s] rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-slate-500">{t("typing")}</span>
                </div>
              </div>
            </div>
          )}
          <div className="h-1" />
        </div>

        <div className="shrink-0 border-t border-white/10 bg-[#020617]/60 px-4 py-3 backdrop-blur-md">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">{t("prompt_title")}</div>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(reply)}
                disabled={isTyping}
                className="rounded-lg border border-white/12 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:border-[#00D4FF]/35 hover:bg-white/10 disabled:opacity-40"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        <div className="shrink-0 border-t border-white/10 bg-[#020617]/70 p-3 backdrop-blur-md">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0a1019] px-3 py-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder={t("placeholder")}
              disabled={isTyping}
              className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-all hover:brightness-110 disabled:opacity-40"
              style={{ backgroundColor: LINE_GREEN, boxShadow: `0 0 14px rgba(6,199,85,0.35)` }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT — AI Vision monitoring */}
      <div className={cn("order-4 flex min-h-[min(640px,72vh)] flex-col lg:order-none lg:col-span-4", glassPanel)}>
        <div className="flex shrink-0 items-center gap-2.5 border-b border-white/10 bg-[#020617]/50 px-4 py-3.5 backdrop-blur-md">
          <BrainCircuit className="h-5 w-5 shrink-0 text-[#00D4FF]" style={{ filter: `drop-shadow(0 0 6px ${CYAN})` }} />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold tracking-tight text-white">{t("vision_title")}</div>
            <div className="text-[10px] font-medium text-slate-500">{t("vision_subtitle")}</div>
          </div>
          <div
            className={cn(
              "h-2 w-2 shrink-0 rounded-full transition-colors duration-500",
              isProcessing ? "animate-pulse bg-[#00D4FF]" : "bg-emerald-400",
            )}
          />
        </div>

        <div className="shrink-0 border-b border-white/10 bg-[#020617]/35 px-4 py-3 backdrop-blur-sm">
          <VisionMonitorMock useCase={useCase} />
        </div>

        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2 text-[10px] font-mono text-slate-500">
          <span>{t("vision_log")}</span>
          <span className={cn("font-bold uppercase tracking-wider", isProcessing ? "text-[#00D4FF]" : "text-emerald-400/90")}>
            {isProcessing ? "PROCESSING" : "STANDBY"}
          </span>
        </div>

        <div
          ref={logBodyRef}
          onScroll={handleLogScroll}
          className="flex-1 space-y-3 overflow-y-auto bg-[#020617]/25 px-4 py-4"
          style={{ overscrollBehavior: "contain" }}
        >
          {processingSeq && (
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#00D4FF]">
              <Loader2 className="h-3 w-3 animate-spin" />
              {t("vision_analyzing")}
            </div>
          )}

          {visibleLogs.map((log, i) => (
            <LogItem key={`${log.id}-${i}`} entry={log} visible={true} />
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
              <span className="h-4 w-0.5 animate-[pulse_1s_step-end_infinite] rounded-sm bg-[#00D4FF]/80" />
              <span>Awaiting next event…</span>
            </div>
          )}
          <div className="h-1" />
        </div>

        <div className="shrink-0 border-t border-white/10 bg-[#020617]/50 px-4 py-3.5 backdrop-blur-md">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Live metrics</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-white/10 bg-[#020617]/60 py-2 text-center backdrop-blur-sm">
              <div className="text-lg font-black tabular-nums leading-tight text-[#00D4FF]">
                {sendCountRef.current > 0 ? `${Math.min(70 + sendCountRef.current * 8, 97)}%` : "—"}
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-500">Close rate</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#020617]/60 py-2 text-center backdrop-blur-sm">
              <div className="text-lg font-black tabular-nums leading-tight text-emerald-300">
                {messages.filter((m) => m.role === "ai").length}
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-500">AI replies</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#020617]/60 py-2 text-center backdrop-blur-sm">
              <div className="text-lg font-black tabular-nums leading-tight text-white">&lt;2s</div>
              <div className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-500">Resp.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────
export function LiveDemoSection() {
  const t = useTranslations("LiveDemo");
  const locale = useLocale();
  const [activeUseCase, setActiveUseCase] = useState<DemoUseCase>("clinic");
  const rotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sectionFontByLocale = useMemo(
    () =>
      locale.startsWith("th")
        ? ({ fontFamily: '"Prompt", "IBM Plex Sans Thai", var(--font-urbanist), "Inter", ui-sans-serif, system-ui, sans-serif' } as const)
        : sectionFont,
    [locale],
  );

  useEffect(() => {
    return () => {
      if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);
    };
  }, []);

  const scheduleNextUseCase = (completedUseCase: DemoUseCase) => {
    if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);
    rotateTimerRef.current = setTimeout(() => {
      setActiveUseCase((current) => (current === completedUseCase ? NEXT_USE_CASE[completedUseCase] : current));
    }, 2000);
  };

  return (
    <section
      id="live-demo"
      className="relative overflow-hidden border-y border-[#00D4FF]/10 py-24 lg:py-32"
      style={{ ...sectionFontByLocale, backgroundColor: MIDNIGHT }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className={cn(
            "absolute inset-0 opacity-[0.18] transition-opacity duration-500",
            USE_CASE_BG[activeUseCase],
          )}
        />
        <div className="absolute inset-0 bg-[#020617]/88" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(ellipse 90% 55% at 50% -10%, rgba(0,212,255,0.07), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(57,255,20,0.04), transparent 45%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Use case tabs — top navigation */}
        <div className="mb-10 flex flex-col gap-4 sm:mb-12">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500 lg:text-left">
            {t("eyebrow")} · Use cases
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:gap-3">
            {DEMO_USE_CASES.map((uc, idx) => {
              const Icon = TAB_ICONS[uc];
              const active = activeUseCase === uc;
              return (
                <button
                  key={uc}
                  type="button"
                  onClick={() => {
                    if (rotateTimerRef.current) clearTimeout(rotateTimerRef.current);
                    setActiveUseCase(uc);
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300",
                    active
                      ? "border-[#00D4FF]/45 bg-[#020617]/75 shadow-[0_0_28px_rgba(0,212,255,0.12),inset_0_1px_0_rgba(0,212,255,0.15)]"
                      : "border-white/[0.1] bg-[#020617]/40 hover:border-[#00D4FF]/25 hover:bg-[#020617]/55",
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[#00D4FF]/25 bg-[#00D4FF]/[0.08] text-[11px] font-bold text-[#00D4FF]">
                    {idx + 1}
                  </span>
                  <Icon
                    className={cn("h-5 w-5 shrink-0", active ? "text-[#00D4FF]" : "text-slate-400")}
                    strokeWidth={1.5}
                  />
                  <span className={cn("min-w-0 flex-1 text-sm font-bold leading-tight", active ? "text-white" : "text-slate-300")}>
                    {t(`uc_tab_${uc}`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeUseCase}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.36, ease: "easeInOut" }}
          >
            <LiveDemoWorkspace useCase={activeUseCase} onUseCaseComplete={scheduleNextUseCase} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
