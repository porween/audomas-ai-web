"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Send, User, BrainCircuit, CheckCircle2, Loader2, Activity, Zap, TrendingUp, Bell, Shield, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

// ── Types ────────────────────────────────────────────────
type Message = { role: "user" | "ai"; content: string; timestamp: string };

type LogEntry = {
  id: number;
  icon: React.ElementType;
  label: string;
  detail: string;
  color: string;
  glow: string;
  delay: number; // ms after message sent
};

function getNow() {
  return new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// ── System Log Entry Component ───────────────────────────
function LogItem({ entry, visible }: { entry: LogEntry; visible: boolean }) {
  const Icon = entry.icon;
  return (
    <div
      className={`flex items-start gap-3 transition-all duration-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
      }`}
    >
      {/* Icon */}
      <div className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 bg-slate-900/80 border border-slate-700/50 ${entry.glow}`}>
        <CheckCircle2 className={`w-3.5 h-3.5 ${entry.color}`} />
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <Icon className={`w-3.5 h-3.5 ${entry.color} shrink-0`} />
          <span className={`text-[11px] font-bold uppercase tracking-widest ${entry.color}`}>
            {entry.label}
          </span>
        </div>
        <p className="text-slate-300 text-xs mt-0.5 font-medium leading-tight">{entry.detail}</p>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────
export function LiveDemoSection() {
  const t = useTranslations("LiveDemo");

  const thinkingSequences: LogEntry[][] = useMemo(() => [
    [
      { id: 1, icon: Activity,     label: t("log_intent"),   detail: t("detail_high_interest"),  color: "text-cyan-400",   glow: "shadow-[0_0_8px_rgba(34,211,238,0.4)]",   delay: 400  },
      { id: 2, icon: TrendingUp,   label: t("log_scoring"),  detail: t("detail_hot_lead"),       color: "text-green-400",  glow: "shadow-[0_0_8px_rgba(34,197,94,0.4)]",    delay: 900  },
      { id: 3, icon: Zap,          label: t("log_action"),   detail: t("detail_gen_quote"),      color: "text-yellow-400", glow: "shadow-[0_0_8px_rgba(234,179,8,0.4)]",    delay: 1500 },
      { id: 4, icon: Bell,         label: t("log_notification"), detail: t("detail_alert_sales"),color: "text-blue-400",   glow: "shadow-[0_0_8px_rgba(96,165,250,0.4)]",   delay: 2200 },
    ],
    [
      { id: 1, icon: Activity,     label: t("log_intent"),   detail: t("detail_price_detect"),   color: "text-cyan-400",   glow: "shadow-[0_0_8px_rgba(34,211,238,0.4)]",   delay: 400  },
      { id: 2, icon: TrendingUp,   label: t("log_scoring"),  detail: t("detail_warm_lead"),      color: "text-orange-400", glow: "shadow-[0_0_8px_rgba(251,146,60,0.4)]",   delay: 850  },
      { id: 3, icon: Zap,          label: t("log_action"),   detail: t("detail_send_pricing"),   color: "text-yellow-400", glow: "shadow-[0_0_8px_rgba(234,179,8,0.4)]",    delay: 1400 },
      { id: 4, icon: Shield,       label: t("log_compliance"), detail: t("detail_pdpa"),          color: "text-purple-400", glow: "shadow-[0_0_8px_rgba(168,85,247,0.4)]",   delay: 2000 },
    ],
    [
      { id: 1, icon: Activity,     label: t("log_intent"),   detail: t("detail_comparing"),      color: "text-cyan-400",   glow: "shadow-[0_0_8px_rgba(34,211,238,0.4)]",   delay: 400  },
      { id: 2, icon: TrendingUp,   label: t("log_scoring"),  detail: t("detail_high_potential"), color: "text-green-400",  glow: "shadow-[0_0_8px_rgba(34,197,94,0.4)]",    delay: 900  },
      { id: 3, icon: Zap,          label: t("log_action"),   detail: t("detail_prep_table"),     color: "text-yellow-400", glow: "shadow-[0_0_8px_rgba(234,179,8,0.4)]",    delay: 1500 },
      { id: 4, icon: Bell,         label: t("log_notification"), detail: t("detail_follow_up"),   color: "text-blue-400",   glow: "shadow-[0_0_8px_rgba(96,165,250,0.4)]",   delay: 2100 },
    ],
  ], [t]);

  const defaultLogs: LogEntry[] = useMemo(() => [
    { id: 1, icon: Shield,       label: t("log_status"),      detail: t("detail_operational"),  color: "text-green-400",  glow: "shadow-[0_0_8px_rgba(34,197,94,0.3)]",    delay: 0 },
    { id: 2, icon: Activity,     label: t("log_intent"),      detail: t("detail_standby"),      color: "text-cyan-400",   glow: "shadow-[0_0_8px_rgba(34,211,238,0.3)]",   delay: 0 },
    { id: 3, icon: Clock,        label: t("log_resp_time"),   detail: t("detail_nominal"),      color: "text-slate-400",  glow: "",                                         delay: 0 },
  ], [t]);

  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: t("initial_msg"), timestamp: getNow() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Activity panel logs
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    setVisibleLogs(defaultLogs);
    setRevealedCount(defaultLogs.length);
  }, [defaultLogs]);
  const [processingSeq, setProcessingSeq] = useState<LogEntry[] | null>(null);
  const [seqIndex, setSeqIndex] = useState(0);

  const msgBodyRef   = useRef<HTMLDivElement>(null);  // scrollable chat container
  const logBodyRef   = useRef<HTMLDivElement>(null);  // scrollable log container
  const sendCountRef = useRef(0);
  const isMsgUserScrollRef = useRef(false);
  const isLogUserScrollRef = useRef(false);

  // Scroll helpers — container-local, never hijacks the page
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

  // Auto-scroll ONLY when message count grows — never on isTyping re-render
  useEffect(() => {
    scrollMsgToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  // Auto-scroll logs when a new log entry is appended
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
      setVisibleLogs(prev => [...prev, entry]);
      setRevealedCount(prev => prev + 1);
      setSeqIndex(prev => prev + 1);
    }, entry.delay - (seqIndex > 0 ? processingSeq[seqIndex - 1].delay : 0));
    return () => clearTimeout(timer);
  }, [processingSeq, seqIndex]);

  const handleSend = (text: string) => {
    if (!text.trim() || isTyping) return;

    const ts = getNow();
    setMessages(prev => [...prev, { role: "user", content: text, timestamp: ts }]);
    setInput("");
    setIsTyping(true);
    setIsProcessing(true);

    // Pick thinking sequence
    const seq = thinkingSequences[sendCountRef.current % thinkingSequences.length];
    sendCountRef.current += 1;

    // Start revealing logs after a short delay
    setProcessingSeq(null); // reset
    setTimeout(() => {
      setProcessingSeq(seq);
      setSeqIndex(0);
    }, 200);

    // AI reply
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
      setMessages(prev => [...prev, { role: "ai", content: aiResponse, timestamp: getNow() }]);
      setIsTyping(false);
    }, 2600);
  };

  const quickReplies = [t("quick_1"), t("quick_2"), t("quick_3")];

  return (
    <section id="live-demo" className="py-24 lg:py-32 bg-transparent border-y border-white/5 relative overflow-hidden">
      {/* bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-blue-600/6 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e293b]/80 border border-slate-700 text-slate-400 text-xs font-semibold mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live System Demo
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("title")}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* ── Two-Column Layout: Chat + Activity Panel ── */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-stretch max-w-6xl mx-auto">

          {/* ════ LEFT: Enterprise Chat Window ════ */}
          <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 bg-[#060E1C] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,212,255,0.04)] min-h-[580px]">

            {/* Chat Header — enterprise style */}
            <div className="bg-[#0A1628] border-b border-slate-700/50 px-5 py-3.5 flex items-center gap-3 shrink-0">
              {/* Status dots */}
              <div className="flex gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="h-4 w-px bg-slate-700/60 mx-1 shrink-0" />
              {/* Agent identity */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,212,255,0.35)]">
                <BrainCircuit className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm leading-tight">{t("ai_name")}</div>
                <div className="text-[10px] text-green-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {t("ai_status")}
                </div>
              </div>
              {/* Right meta */}
              <div className="text-[10px] text-slate-500 font-mono shrink-0 hidden sm:block">
                ENGINE v3.1.4
              </div>
            </div>

            {/* Session info bar */}
            <div className="bg-[#071020]/60 border-b border-slate-800/50 px-5 py-2 flex items-center gap-4 text-[10px] text-slate-500 font-medium shrink-0">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />CHANNEL: Multi-Platform</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />SESSION: DEMO-{Math.floor(Math.random() * 9000) + 1000}</span>
              <span className="flex items-center gap-1.5 ml-auto"><span className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />AUDIT LOG: ON</span>
            </div>

            {/* Messages */}
            <div
              ref={msgBodyRef}
              onScroll={handleMsgScroll}
              className="flex-1 px-5 py-5 overflow-y-auto space-y-5 flex flex-col"
              style={{ overscrollBehavior: "contain" }}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-lg flex shrink-0 items-center justify-center text-xs font-bold ${
                    msg.role === "user"
                      ? "bg-slate-700 border border-slate-600 text-slate-300"
                      : "bg-gradient-to-br from-blue-700 to-cyan-600 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,212,255,0.2)]"
                  }`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <BrainCircuit className="w-4 h-4 text-white" />}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[78%] group`}>
                    <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed font-medium ${
                      msg.role === "user"
                        ? "bg-[linear-gradient(135deg,#1e3a8a,#1d4ed8)] text-white border border-blue-600/40 shadow-[0_4px_15px_rgba(37,99,235,0.2)] rounded-tr-sm"
                        : "bg-[#0D1F3A] text-slate-200 border border-slate-700/50 rounded-tl-sm shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                    }`}>
                      {msg.content}
                    </div>
                    {/* Timestamp */}
                    <div className={`text-[10px] text-slate-600 mt-1 font-mono ${msg.role === "user" ? "text-right" : "text-left"}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-cyan-600 border border-cyan-500/30 flex shrink-0 items-center justify-center shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                    <BrainCircuit className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-[#0D1F3A] border border-slate-700/50 rounded-tl-sm flex items-center gap-2.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-[bounce_1.2s_infinite_0s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-[bounce_1.2s_infinite_0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-[bounce_1.2s_infinite_0.3s]" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">{t("typing")}</span>
                  </div>
                </div>
              )}
              {/* spacer */}
              <div className="h-1" />
            </div>

            {/* Quick replies */}
            <div className="px-5 py-3 border-t border-slate-800/50 bg-[#07101E]/70 shrink-0">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">{t("prompt_title")}</div>
              <div className="flex gap-2 flex-wrap">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(reply)}
                    disabled={isTyping}
                    className="px-3 py-1.5 bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700/50 hover:border-cyan-500/30 rounded-lg text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-all duration-200 disabled:opacity-40"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-[#06101C] border-t border-slate-800/50 shrink-0">
              <div className="relative flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend(input)}
                  placeholder={t("placeholder")}
                  disabled={isTyping}
                  className="flex-1 bg-[#0D1F35] border border-slate-700/60 rounded-xl py-3.5 pl-4 pr-4 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all font-medium disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                  className="w-11 h-11 rounded-xl bg-[linear-gradient(135deg,#1d4ed8,#06B6D4)] hover:brightness-110 disabled:from-slate-700 disabled:to-slate-700 text-white flex items-center justify-center transition-all duration-200 hover:scale-[1.05] active:scale-95 shadow-[0_0_15px_rgba(0,212,255,0.25)] disabled:shadow-none shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ════ RIGHT: System Activity Panel ════ */}
          <div className="flex flex-col rounded-2xl overflow-hidden border border-slate-700/60 bg-[#040C18] shadow-[0_20px_60px_rgba(0,0,0,0.5)] min-h-[580px]">

            {/* Panel Header */}
            <div className="bg-[#07111F] border-b border-slate-700/50 px-4 py-3.5 flex items-center gap-2.5 shrink-0">
              <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isProcessing ? "bg-cyan-400 animate-pulse" : "bg-green-400"}`} />
              <span className="text-white font-bold text-sm tracking-tight">System Activity</span>
              <span className="ml-auto text-[10px] font-mono text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/50">
                {isProcessing ? "PROCESSING" : "STANDBY"}
              </span>
            </div>

            {/* Toolbar row */}
            <div className="bg-[#050E1A]/70 border-b border-slate-800/40 px-4 py-2 flex items-center gap-3 text-[10px] text-slate-600 font-mono shrink-0">
              <span>ENGINE: Audomas v3</span>
              <span className="ml-auto">LOGS: LIVE</span>
            </div>

            {/* Log entries */}
            <div
              ref={logBodyRef}
              onScroll={handleLogScroll}
              className="flex-1 px-4 py-4 overflow-y-auto space-y-4 font-mono"
              style={{ overscrollBehavior: "contain" }}
            >
              {/* Sequence header */}
              {processingSeq && (
                <div className="flex items-center gap-2 text-[10px] text-cyan-400/70 font-bold uppercase tracking-widest pb-2 border-b border-slate-800/50">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Running Analysis Sequence...
                </div>
              )}

              {visibleLogs.map((log, i) => (
                <LogItem key={`${log.id}-${i}`} entry={log} visible={true} />
              ))}

              {/* Cursor blink when processing */}
              {isProcessing && (
                <div className="flex items-center gap-2 text-[11px] text-slate-600 font-mono">
                  <span className="w-2 h-4 bg-cyan-400/70 animate-[pulse_1s_step-end_infinite] rounded-[1px]" />
                  <span>Awaiting next event...</span>
                </div>
              )}
              {/* spacer */}
              <div className="h-1" />
            </div>

            {/* Metrics footer */}
            <div className="border-t border-slate-800/50 px-4 py-3.5 bg-[#05101E]/60 shrink-0">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Live Metrics</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center bg-slate-900/60 border border-slate-800/50 rounded-lg py-2">
                  <div className="text-lg font-black text-cyan-400 tabular-nums leading-tight">
                    {sendCountRef.current > 0 ? `${Math.min(70 + sendCountRef.current * 8, 97)}%` : "—"}
                  </div>
                  <div className="text-[9px] text-slate-600 uppercase tracking-wider mt-0.5">Close Rate</div>
                </div>
                <div className="text-center bg-slate-900/60 border border-slate-800/50 rounded-lg py-2">
                  <div className="text-lg font-black text-green-400 tabular-nums leading-tight">
                    {messages.filter(m => m.role === "ai").length}
                  </div>
                  <div className="text-[9px] text-slate-600 uppercase tracking-wider mt-0.5">AI Replies</div>
                </div>
                <div className="text-center bg-slate-900/60 border border-slate-800/50 rounded-lg py-2">
                  <div className="text-lg font-black text-white tabular-nums leading-tight">&lt;2s</div>
                  <div className="text-[9px] text-slate-600 uppercase tracking-wider mt-0.5">Resp. Time</div>
                </div>
              </div>
            </div>
          </div>

        </div>{/* end grid */}
      </div>
    </section>
  );
}
