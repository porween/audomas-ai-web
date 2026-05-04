"use client";

import { Play, ShieldCheck, TrendingUp, Users, DollarSign, Zap, Lock, Server, CheckCircle2, Terminal, Activity, Database, BarChart3, Fingerprint, FileText, Send, Eye, Map, AlertTriangle, ArrowRightLeft, Target, TrendingDown, Percent, ExternalLink, RefreshCcw, Cpu, ShieldAlert, ShoppingBag, Car, HeartPulse, Building2, Camera, Clock } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

// ── Count-up hook ────────────────────────────────────────
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

// ── Mission Control Event Type ──────────────────────────
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

// ── Industry Industry Type ─────────────────────────────
type IndustryId = "clinic" | "car" | "retail" | "vision";

// ── Log Line Component ──────────────────────────────────
function LogLine({ event, visible }: { event: SessionEvent; visible: boolean }) {
  const isUser = event.title?.toLowerCase().includes("user");
  const isResult = event.title?.toLowerCase().includes("result");
  const isAction = event.title?.toLowerCase().includes("action");
  const isAnalysis = event.title?.toLowerCase().includes("analysis");

  if (event.type === "system") {
    return (
      <div className={`flex flex-col gap-3 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}>
        <div className="flex items-center gap-3">
          <div className={`h-[2px] w-6 ${isResult ? "bg-emerald-500" : isAction ? "bg-yellow-500" : isUser ? "bg-blue-500" : "bg-slate-200"}`} />
          <span className="text-[10px] font-mono text-slate-400 font-black tabular-nums">[{event.time}]</span>
          <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${
            isResult ? "text-emerald-600" : 
            isAction ? "text-yellow-600" : 
            isUser ? "text-blue-600" : 
            isAnalysis ? "text-indigo-600" : "text-slate-500"
          }`}>
            {event.title}
          </span>
          <div className="h-[1px] flex-1 bg-slate-100" />
        </div>
        
        <div className="pl-14 pr-4 max-w-full overflow-hidden">
          <div className={`text-[15px] font-black leading-[1.4] tracking-tight break-words overflow-wrap-anywhere ${
            isResult 
              ? "text-emerald-950 bg-emerald-500/10 px-5 py-3 rounded-2xl border-2 border-emerald-500/20 shadow-[0_8px_20px_rgba(16,185,129,0.1)] scale-[1.02] origin-left" 
              : isUser 
              ? "text-blue-950 bg-blue-500/5 px-5 py-3 rounded-2xl border border-blue-500/10 italic"
              : "text-[#0B1F33]"
          }`}>
            {isResult && <span className="mr-2">💰</span>}
            {event.text}
          </div>
          {event.subtext && (
            <div className="text-[12px] text-slate-600 font-bold leading-relaxed mt-2 opacity-90 pl-1 border-l-2 border-slate-200 ml-1 break-words">
              {event.subtext}
            </div>
          )}

          {event.metadata?.hasQuote && (
            <div className="mt-3 bg-white border-2 border-blue-100 rounded-xl p-3 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-700 shadow-lg shadow-blue-900/10">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-lg bg-[#0B1F33] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[12px] font-black text-[#0B1F33] uppercase tracking-tight truncate">{event.metadata.quoteFilename}</span>
                  <span className="text-[10px] text-blue-600 font-black flex items-center gap-1.5">
                    <CheckCircle2 className="w-2.5 h-2.5 shrink-0" /> {event.metadata.quoteDesc}
                  </span>
                </div>
              </div>
              <button className="group px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-[10px] font-black transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 hover:scale-105 active:scale-95 shrink-0">
                EXECUTE <ArrowRightLeft className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (event.type === "log") {
    return (
      <div className={`flex items-start gap-4 transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
        <span className="text-[10px] font-mono text-slate-300 mt-1 font-bold">[{event.time}]</span>
        <div className="flex-1 flex items-baseline gap-2.5">
          <span className="text-[10px] font-black text-blue-700/40 uppercase tracking-widest shrink-0">AGENT_CORE:</span>
          <span className="text-[13px] font-bold text-slate-400 italic tracking-tight">{event.text}</span>
        </div>
      </div>
    );
  }

  return null;
}

// ── Action Workspace Sidebar (Refined Inline) ──────────
function ActionWorkspace({ event, visible, status }: { event: SessionEvent | null; visible: boolean; status: string }) {
  if (!visible) return null;

  return (
    <div className="w-full mt-6 grid grid-cols-2 gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className={`bg-white/40 border border-white p-3.5 rounded-xl transition-all duration-500`}>
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">INTENT_ENGINE</span>
        </div>
        <div className="text-[10px] text-blue-600 font-black flex items-center gap-1.5 pl-0.5 leading-tight uppercase tracking-tight">
          <RefreshCcw className="w-3 h-3 animate-spin-slow shrink-0" /> {status}
        </div>
      </div>

      <div className={`bg-white/40 border border-white p-3.5 rounded-xl transition-all duration-1000 ${event?.metadata?.score ? "opacity-100" : "opacity-40"}`}>
        <div className="flex items-center gap-2.5 mb-2">
           <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">INTEL_SCORE</span>
        </div>
        <div className="flex items-end gap-1.5 pl-0.5">
          <span className="text-xl font-bold text-slate-900 leading-none tracking-tighter">{event?.metadata?.score || 0}%</span>
          <span className="text-[9px] text-slate-400 font-medium uppercase mb-0.5">Match</span>
        </div>
      </div>
    </div>
  );
}

// ── Quote Preview Window ────────────────────────────────
function QuotePreview({ filename, visible }: { filename: string; visible: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20, scale: 0.9 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20, scale: visible ? 1 : 0.9 }}
      className="absolute -right-16 top-1/2 -translate-y-1/2 w-[180px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-30 pointer-events-none hidden xl:block"
    >
      <div className="bg-slate-50 p-2 border-b border-slate-100 flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white">
          <FileText className="w-3.5 h-3.5" />
        </div>
        <span className="text-[9px] font-black text-slate-800 uppercase tracking-tight truncate">{filename}</span>
      </div>
      <div className="p-3 space-y-2">
        <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
        <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
        <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-end">
           <div className="space-y-1">
             <div className="h-1.5 w-8 bg-slate-100 rounded-full" />
             <div className="h-3 w-12 bg-blue-500/20 rounded-md" />
           </div>
           <div className="w-8 h-8 rounded-full border-2 border-blue-100 flex items-center justify-center">
             <CheckCircle2 className="w-4 h-4 text-blue-500" />
           </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── AI Vision Panel ────────────────────────────────────
function AIVisionPanel({ industry }: { industry: IndustryId }) {
  const t = useTranslations('Hero');
  const [updateTime, setUpdateTime] = useState("14:20:01");
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setUpdateTime(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scenario = useMemo(() => {
    switch (industry) {
      case "clinic":
        return {
          detected: t("vision_detect_status"),
          behavior: "Looking at Treatment Menu",
          action: t("vision_action"),
          result: t("vision_result")
        };
      case "car":
        return {
          detected: "Family near SUV (0% Down)",
          behavior: "Checking interior space",
          action: "Send Consultant with brochure",
          result: "+฿1,250,000 Potential Sale"
        };
      case "retail":
        return {
          detected: "12 customers in Store",
          behavior: "Long wait time at Checkout B",
          action: "Open new counter immediately",
          result: "22% Faster conversion rate"
        };
      default:
        return {
          detected: "3 customers (Hot Zone)",
          behavior: "High purchase intent",
          action: "Notify staff to close deal",
          result: "+฿24,500 revenue captured"
        };
    }
  }, [industry]);

  return (
    <div key={industry} className="w-full xl:w-[250px] flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-1000 opacity-90 origin-left self-center">
      <div className="bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 rounded-[2.2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <Camera className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{t("vision_title")}</span>
               <span className="text-[7px] font-mono text-cyan-400/80 uppercase tracking-widest mt-0.5">Live Sync: {updateTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">LIVE</span>
          </div>
        </div>
        
        {/* Flow Content */}
        <div className="space-y-4 relative z-10">
          <div className="flex flex-col gap-1.5">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.3em]">DETECTED</span>
             </div>
             <div className="text-[12px] text-white font-black tracking-tight pl-3.5 border-l border-cyan-500/30 ml-[3px]">
                {scenario.detected}
             </div>
          </div>

          <div className="flex flex-col gap-1.5">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.3em]">ANALYSIS</span>
             </div>
             <div className="text-[12px] text-white/90 font-bold tracking-tight pl-3.5 border-l border-blue-500/30 ml-[3px]">
                {scenario.behavior}
             </div>
          </div>

          <div className="flex flex-col gap-1.5">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.3em]">ACTION</span>
             </div>
             <div className="text-[12px] text-yellow-300 font-black tracking-tight pl-3.5 border-l border-yellow-500/30 ml-[3px]">
                {scenario.action}
             </div>
          </div>

          <div className="pt-3 mt-1">
             <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex flex-col gap-1 relative overflow-hidden group shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                <span className="text-[8px] font-black text-emerald-400 uppercase tracking-[0.3em] flex items-center gap-2">
                   <TrendingUp className="w-3 h-3" /> RESULT
                </span>
                <span className="text-[13px] font-black text-white tracking-tight leading-none group-hover:text-emerald-300 transition-colors">
                   {scenario.result}
                </span>
             </div>
          </div>
        </div>

        {/* Live Preview Simulation */}
        <div className="mt-8 aspect-video rounded-2xl bg-black/50 border border-white/10 relative overflow-hidden ring-1 ring-white/5">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.1),transparent_70%)]" />
           <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 opacity-10">
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/20" />
              ))}
           </div>
           <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.4)] animate-scan" />
           <div className="absolute bottom-2 left-4 text-[7px] font-mono text-cyan-400/40 uppercase tracking-[0.4em] font-black">ROI_CAMERA_01</div>
           
           {/* Moving Detection Boxes */}
           <motion.div 
             animate={{ x: [0, 40, 20, 60, 0], y: [0, 20, 10, 30, 0] }}
             transition={{ duration: 10, repeat: Infinity }}
             className="absolute w-8 h-8 border border-cyan-400/40 rounded-sm"
           />
           <motion.div 
             animate={{ x: [80, 40, 100, 70, 80], y: [40, 60, 50, 70, 40] }}
             transition={{ duration: 8, repeat: Infinity, delay: 1 }}
             className="absolute w-10 h-10 border border-blue-400/40 rounded-sm"
           />
        </div>
      </div>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────
export function SalesAgentHeroSection() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const sectionRef    = useRef<HTMLElement>(null);
  const logBodyRef    = useRef<HTMLDivElement>(null);   
  const isUserScrollRef = useRef(false);                

  const [started,     setStarted]     = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [revenueTrigger, setRevenueTrigger] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId>("clinic");

  const industries = [
    { id: "clinic", label: t("tab_clinic"), icon: HeartPulse, color: "text-rose-500" },
    { id: "car",    label: t("tab_car"),    icon: Car,        color: "text-blue-500" },
    { id: "retail", label: t("tab_retail"), icon: ShoppingBag, color: "text-amber-500" },
    { id: "vision", label: t("tab_vision"), icon: Eye,         color: "text-cyan-500" },
  ];

  const sessionScript: SessionEvent[] = useMemo(() => {
    const time = "14:20:";
    switch (selectedIndustry) {
      case "clinic":
        return [
          { type: "system", title: "CUSTOMER INTENT", text: "สนใจ HIFU ครับ เห็นมีโปร 9,900 สิ้นเดือนนี้ยังมีไหม", time: time + "01" },
          { type: "system", title: "AI ANALYSIS", text: "Lead Score: 98% | High Intent", subtext: "ตรวจพบความกังวลเรื่องคิวและความคุ้มค่า (Promotional Sensitivity)", time: time + "03", metadata: { score: 98 } },
          { type: "system", title: "AI RESPONSE", text: "สวัสดีค่ะคุณลูกค้า โปร HIFU Buffet 9,900 ยังมีที่ว่างค่ะ แต่สัปดาห์นี้คิวแน่นมาก แนะนำให้จองล็อกคิวไว้ก่อนนะคะ", time: time + "06" },
          { type: "system", title: "USER RESPONSE", text: "จองพรุ่งนี้ 10:00 ได้ไหมครับ", time: time + "09" },
          { type: "system", title: "AI ACTION", text: "สร้างใบเสนอราคา | จองคิวอัตโนมัติ | แจ้งเตือนพนักงาน", time: time + "12", metadata: { crmSync: true, hasQuote: true, quoteFilename: "HIFU_PRO_9900.pdf", quoteDesc: "Booking Confirmed" } },
          { type: "system", title: "RESULT: DEAL CLOSED", text: "Deal Closed: ฿9,900", subtext: "ROI: +24% Customer Lifetime Value", time: time + "15", metadata: { score: 100 } },
        ];
      case "car":
        return [
          { type: "system", title: "CUSTOMER INTENT", text: "สอบถามเรื่องดอกเบี้ย 0% ของรุ่น SUV-X ครับ", time: time + "01" },
          { type: "system", title: "AI ANALYSIS", text: "Lead Score: 85% | Qualified Lead", subtext: "ต้องการเปรียบเทียบตารางผ่อนชำระ (Financial Planning)", time: time + "03", metadata: { score: 85 } },
          { type: "system", title: "AI RESPONSE", text: "รุ่น SUV-X ตอนนี้มีโปรดอกเบี้ย 0% นาน 48 เดือนค่ะ เดี๋ยวส่งตารางเปรียบเทียบยอดผ่อนแต่ละรุ่นให้พิจารณานะคะ", time: time + "06" },
          { type: "system", title: "USER RESPONSE", text: "ส่งมาเลยครับ ถ้าโอเคจะเข้าไปดูรถเสาร์นี้", time: time + "09" },
          { type: "system", title: "AI ACTION", text: "ส่ง Catalog ดิจิทัล | นัดหมายชมรถ | ส่งต่อ Sales Consultant", time: time + "12", metadata: { crmSync: true, hasQuote: true, quoteFilename: "SUVX_Plan.pdf", quoteDesc: "Test Drive Scheduled" } },
          { type: "system", title: "RESULT: LEAD QUALIFIED", text: "High Intent Lead Transferred", subtext: "Potential Revenue: +฿1,250,000", time: time + "15", metadata: { score: 95 } },
        ];
      case "retail":
        return [
          { type: "system", title: "CUSTOMER INTENT", text: "เสื้อตัวนี้ยังมีไซส์ L อยู่ไหมครับ", time: time + "01" },
          { type: "system", title: "AI ANALYSIS", text: "Lead Score: 100% | Direct Purchase", subtext: "ตรวจสอบสต็อกสินค้าเรียลไทม์ (Inventory Check)", time: time + "03", metadata: { score: 100 } },
          { type: "system", title: "AI RESPONSE", text: "ไซส์ L สาขาพารากอนเหลือ 2 ตัวสุดท้ายค่ะ สนใจให้กดจองสินค้าไว้ก่อนไหมคะ เดี๋ยวส่งลิงก์ชำระเงินให้ค่ะ", time: time + "06" },
          { type: "system", title: "USER RESPONSE", text: "จองเลยครับ เดี๋ยวโอนเงินให้ตอนนี้", time: time + "09" },
          { type: "system", title: "AI ACTION", text: "ตัดสต็อกสินค้า | ออกใบกำกับภาษี | ส่งลิงก์ชำระเงิน", time: time + "12", metadata: { crmSync: true, hasQuote: true, quoteFilename: "Order_Invoice.pdf", quoteDesc: "Payment Pending" } },
          { type: "system", title: "RESULT: SALE COMPLETED", text: "Sale Completed: ฿1,890", subtext: "Stock Updated: 1 Unit Left", time: time + "15", metadata: { score: 100 } },
        ];
      case "vision":
        return [
          { type: "system", title: "DETECTION ALERT", text: "พบกลุ่มลูกค้า 5 ท่าน ยืนหน้าตู้โชว์สินค้าเกิน 3 นาที", time: time + "01" },
          { type: "system", title: "AI ANALYSIS", text: "Lead Score: 92% | ROI Trigger", subtext: "วิเคราะห์พฤติกรรม: มีความสนใจสินค้ากลุ่มพรีเมียมสูง", time: time + "03", metadata: { score: 92 } },
          { type: "system", title: "AI ACTION", text: "แจ้งเตือนพนักงานประจำจุด | ส่งโปรโมชั่นเข้าจอ Digital Signage", time: time + "06", metadata: { crmSync: true } },
          { type: "system", title: "STAFF UPDATE", text: "พนักงานเข้าไปแนะนำสินค้าและปิดการขายได้สำเร็จ", time: time + "12" },
          { type: "system", title: "RESULT: UPSALE SUCCESS", text: "Upsale Success: +฿8,500", subtext: "Customer Conversion: 100%", time: time + "15", metadata: { score: 100 } },
        ];
      default: return [];
    }
  }, [selectedIndustry]);

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

  const revenueVal = useCountUp(84500, 2000, revenueTrigger);
  const dealsVal = useCountUp(24, 1800, started);
  const leadsVal = useCountUp(1248, 2200, started);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); setTimeout(() => setSessionActive(true), 600); }
    }, { threshold: 0.25 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { scrollLogsToBottom(); }, [visibleCount, isProcessing]);

  useEffect(() => {
    if (!sessionActive) return;
    let cancelled = false;
    const runLoop = async () => {
      while (true) {
        if (cancelled) break;
        setVisibleCount(0); setIsProcessing(false); setRevenueTrigger(false);
        await new Promise(r => setTimeout(r, 500));
        for (let i = 0; i < sessionScript.length; i++) {
          if (cancelled) break;
          setIsProcessing(true); await new Promise(r => setTimeout(r, 1200));
          setIsProcessing(false); setVisibleCount(i + 1);
          if (i === sessionScript.length - 1) setRevenueTrigger(true);
          await new Promise(r => setTimeout(r, 1000));
        }
        await new Promise(r => setTimeout(r, 8000));
      }
    };
    runLoop();
    return () => { cancelled = true; };
  }, [sessionActive, sessionScript]);

  const currentEvent = visibleCount > 0 ? sessionScript[visibleCount - 1] : null;

  const intentStatus = useMemo(() => {
    if (!sessionActive || visibleCount === 0) return "Awaiting Input...";
    if (visibleCount === 1) return "Analyzing Budget & Intent...";
    if (visibleCount === 2) return "Processing Quote Parameters...";
    if (visibleCount === 3) return "Optimizing Response Strategy...";
    if (visibleCount >= 4) return "Executing Closing Workflow...";
    return "Analyzing Data...";
  }, [visibleCount, sessionActive]);

  return (
    <section id="ai-sales" ref={sectionRef} className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-[#0B1F33]">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
          
          {/* LEFT: Copy */}
          <div className="w-full lg:w-5/12 lg:max-w-[560px] text-center lg:text-left pt-6 lg:pt-14 relative z-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-bold mb-[24px] shadow-sm uppercase tracking-widest">
              <RefreshCcw className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
              {t("badge")}
            </div>
            
            <h1 className="text-[34px] md:text-[44px] lg:text-[clamp(48px,5vw,72px)] font-black tracking-tight mb-[28px] leading-[1.08] [text-wrap:balance] break-keep">
              <span className="block text-white">{t("title_line1")}</span>
              <span className="block bg-gradient-to-r from-[#4FD1FF] to-[#7C8CFF] bg-clip-text text-transparent whitespace-nowrap text-[0.55em] mt-5">
                {t("title_line2")}
              </span>
            </h1>

            <p className="text-[18px] md:text-[20px] text-white/85 mb-[32px] max-w-[540px] mx-auto lg:mx-0 leading-[1.7] font-medium [text-wrap:balance]">
              {t("desc")}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start mb-[36px]">
              <Link href="#live-demo" className="w-full sm:w-auto px-8 py-4 bg-[linear-gradient(90deg,#2563EB,#06B6D4)] hover:brightness-110 text-white rounded-xl font-black flex items-center justify-center gap-3 shadow-[0_10px_25px_rgba(37,99,235,0.2)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap text-[13px] uppercase tracking-wider">
                <Fingerprint className="w-5 h-5" /> {t("cta_demo")}
              </Link>
              <Link href="#demo" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black flex items-center justify-center gap-3 border-2 border-white/10 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] whitespace-nowrap text-[13px] uppercase tracking-wider">
                <Zap className="w-5 h-5 text-cyan-400" /> {t("cta_try")}
              </Link>
            </div>

            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em] mb-6 text-center lg:text-left">Enterprise Core Security</p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                 <div className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-[#0f172a]/40 border border-white/5 shadow-xl group hover:border-cyan-500/30 transition-all duration-500">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                      <ShieldAlert className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-white tracking-widest uppercase">Private AI</span>
                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-tight">On-Premise Ready</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-[#0f172a]/40 border border-white/5 shadow-xl group hover:border-blue-500/30 transition-all duration-500">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                      <Lock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-white tracking-widest uppercase">AirGapX™</span>
                      <span className="text-[9px] text-white/40 font-bold uppercase tracking-tight">Isolated Data Vault</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* RIGHT Column */}
          <div className="w-full lg:w-7/12 flex flex-col gap-12 lg:pl-10">
            {/* Industry Pills */}
            <div className="flex flex-wrap gap-3 justify-center xl:justify-start pl-2">
               {industries.map((ind) => (
                 <button
                   key={ind.id}
                   onClick={() => { setSelectedIndustry(ind.id as IndustryId); setVisibleCount(0); setRevenueTrigger(false); }}
                   className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-500 font-bold text-[10px] uppercase tracking-widest ${selectedIndustry === ind.id ? "bg-white border-white text-[#0B1F33] shadow-[0_0_20px_rgba(255,255,255,0.2)] -translate-y-1" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20"}`}
                 >
                   <ind.icon className={`w-3.5 h-3.5 ${selectedIndustry === ind.id ? ind.color : "opacity-40"}`} />
                   {ind.label}
                 </button>
               ))}
            </div>

            <div className="flex flex-col xl:flex-row gap-8 items-center relative justify-end">
              <div className="w-full xl:w-[500px] h-[660px] relative z-10 rounded-[2.5rem] p-[1px] bg-gradient-to-br from-white/30 via-white/10 to-white/30 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] transition-shadow duration-700 hover:shadow-[0_50px_120px_-20px_rgba(0,0,0,0.5)] group/chat cursor-pointer overflow-hidden">
                {/* Subtle Cyan Glow behind chat */}
                <div className="absolute inset-0 bg-cyan-500/5 blur-[40px] -z-10 rounded-full" />
                
                <div className="relative h-full rounded-[2.4rem] overflow-hidden flex flex-col bg-gradient-to-b from-white/95 to-[#F0F9FF]/90" style={{ minHeight: 0 }}>
                  
                  {/* Header (Fixed Height) */}
                  <div className="h-[84px] bg-white/50 backdrop-blur-xl px-7 py-5 border-b border-cyan-100/50 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400/70" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" /><div className="w-2.5 h-2.5 rounded-full bg-green-400/70" /></div>
                      <div className="h-5 w-px bg-slate-900/5" />
                      <div className="w-10 h-10 rounded-xl bg-[#0B1F33] flex items-center justify-center font-bold text-white text-sm shadow-xl">AI</div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[12px] font-bold text-slate-900 uppercase tracking-widest leading-none">{t("ai_name")}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                           <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-[0.2em] flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {t("ai_status")}</span>
                           <div className="h-2 w-[1px] bg-slate-200" />
                           <span className="text-[8px] text-blue-600/60 font-black uppercase tracking-widest flex items-center gap-1"><ShieldCheck className="w-2.5 h-2.5" /> Secured</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-[9px] text-slate-300 font-light uppercase tracking-[0.3em]">Revenue System</span>
                      <span className="text-[10px] font-mono text-slate-800 font-bold">DEAL_FLOW: AUTO</span>
                    </div>
                  </div>

                  {/* Log Body (Flexible, Scrollable — ONLY scrollable area) */}
                  <div 
                    ref={logBodyRef} 
                    onScroll={handleLogScroll} 
                    className="flex-1 p-7 overflow-y-auto space-y-7 scroll-smooth scrollbar-hide min-h-0"
                  >
                    {sessionScript.slice(0, visibleCount).map((event, i) => (
                      <div key={i} className="max-w-full overflow-hidden">
                        <LogLine event={event} visible={true} />
                      </div>
                    ))}
                    {isProcessing && ( 
                      <div className="flex items-center gap-3 pl-14 text-blue-600/30 font-bold text-[11px] animate-pulse tracking-[0.3em] uppercase">
                        <RefreshCcw className="w-3.5 h-3.5 animate-spin-slow" /> Processing Intel...
                      </div> 
                    )}
                  </div>

                  {/* Quote Preview Popup (Absolute) */}
                  <QuotePreview 
                    filename={currentEvent?.metadata?.quoteFilename || "Proposal.pdf"} 
                    visible={!!currentEvent?.metadata?.hasQuote} 
                  />

                  {/* Inline Stats (Fixed Height Area to avoid jumping) */}
                  <div className="px-7 py-4 bg-white/30 border-t border-cyan-50/50 h-[140px] shrink-0 overflow-hidden">
                     <ActionWorkspace event={currentEvent} visible={true} status={intentStatus} />
                  </div>

                  {/* Footer (Fixed Height) */}
                  <div className="h-[60px] bg-white/60 backdrop-blur-2xl border-t border-cyan-50/50 px-8 flex items-center shrink-0">
                    <div className="w-full flex items-center justify-between gap-6">
                       <div className="flex items-center gap-3">
                         <div className="px-3 py-1 bg-[#0B1F33] text-white rounded-lg text-[9px] font-bold uppercase tracking-[0.3em]">SESSION_ACTIVE</div>
                         <div className="hidden sm:flex items-center gap-1.5 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                           <Lock className="w-3 h-3" /> Secured by AirGapX™ Vault
                         </div>
                       </div>
                       <div className="flex items-center gap-2.5 text-emerald-600">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">ROI TRACKING</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              <AIVisionPanel industry={selectedIndustry} />
            </div>
          </div>
        </div>

        {/* TODAY'S SUCCESS REPORT — IMPACT DASHBOARD */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 md:mt-32 w-full lg:w-[92%] mx-auto bg-[#0f172a]/40 backdrop-blur-[40px] border border-cyan-500/20 rounded-[3rem] p-8 md:p-14 shadow-[0_40px_120px_rgba(0,0,0,0.7)] relative overflow-hidden ring-1 ring-white/10 group/report"
        >
          {/* Subtle Glow behind the dashboard */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-50 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="relative">
                <Activity className="w-8 h-8 text-cyan-400 relative z-10" />
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl animate-pulse scale-150" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-[0.3em] uppercase opacity-90">
                TODAY'S <span className="text-cyan-400">SUCCESS</span> REPORT
              </h2>
            </div>
            <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <div className="relative">
                <span className="block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span className="text-[12px] font-black text-emerald-400 uppercase tracking-[0.2em]">LIVE_REVENUE_FEED</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 relative z-10">
            {/* Metric 1 */}
            <div className="flex flex-col gap-4 group/metric">
              <div className="flex items-center gap-3 text-white/30 group-hover/metric:text-white/50 transition-colors">
                <Users className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Lead Detected</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter">
                  {leadsVal.toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                   <div className="h-[1px] w-8 bg-cyan-500/30" />
                   <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">REALTIME</span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col gap-4 group/metric">
              <div className="flex items-center gap-3 text-white/30 group-hover/metric:text-white/50 transition-colors">
                <Target className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Intent Level</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-4xl md:text-5xl font-black text-emerald-400 tabular-nums tracking-tighter">
                  98<span className="text-2xl md:text-3xl opacity-50">%</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="h-[1px] w-8 bg-emerald-500/30" />
                   <span className="text-[10px] font-black text-emerald-400/70 uppercase tracking-widest">HIGH_CONV</span>
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col gap-4 group/metric">
              <div className="flex items-center gap-3 text-white/30 group-hover/metric:text-white/50 transition-colors">
                <Zap className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Action Taken</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter">
                  {dealsVal}
                </div>
                <div className="flex items-center gap-2">
                   <div className="h-[1px] w-8 bg-yellow-500/30" />
                   <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">AUTONOMOUS</span>
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col gap-4 group/metric">
              <div className="flex items-center gap-3 text-white/30 group-hover/metric:text-white/50 transition-colors">
                <DollarSign className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Revenue Result</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className={`text-4xl md:text-5xl font-black tabular-nums tracking-tighter transition-all duration-1000 ${revenueTrigger ? "text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "text-white"}`}>
                  ฿{revenueVal.toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                   <div className="h-[1px] w-8 bg-emerald-500/30" />
                   <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">CAPTURED</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
