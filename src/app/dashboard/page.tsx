"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  Zap,
  ShieldCheck,
  Camera,
  TrendingUp,
  LineChart,
  Target,
  AlertTriangle,
  FileText,
  Clock,
  ArrowRight,
  Activity,
  MessageCircle,
  Database,
  Brain,
  BellRing,
  Workflow,
  Server
} from 'lucide-react';
import { AudomasLogo } from "@/components/ui/AudomasLogo";

const AI_AGENTS = [
  { id: 'vision', name: 'Vision AI', role: 'Real-time monitoring', icon: Camera, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200', activeShadow: 'shadow-[0_0_15px_rgba(16,185,129,0.5)]' },
  { id: 'analyst', name: 'Analyst AI', role: 'Data processing', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200', activeShadow: 'shadow-[0_0_15px_rgba(37,99,235,0.5)]' },
  { id: 'marketing', name: 'Marketing AI', role: 'Ads & CRM sync', icon: Target, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200', activeShadow: 'shadow-[0_0_15px_rgba(147,51,234,0.5)]' },
  { id: 'reporting', name: 'Reporting AI', role: 'Automated gen', icon: FileText, color: 'text-sky-600', bg: 'bg-sky-100', border: 'border-sky-200', activeShadow: 'shadow-[0_0_15px_rgba(2,132,199,0.5)]' },
];

const POSSIBLE_EVENTS = [
  { agent: 'vision', text: '+3 customers detected in Zone A', type: 'success', source: 'CCTV Camera', output: 'Manager Alert', SourceIcon: Camera, OutputIcon: BellRing },
  { agent: 'marketing', text: 'Optimized Ads targeting (+12% CTR)', type: 'success', source: 'Facebook Ads', output: 'CRM Update', SourceIcon: Target, OutputIcon: Database },
  { agent: 'analyst', text: 'Revenue insight found (+฿1,200/hr)', type: 'success', source: 'POS System', output: 'Dashboard', SourceIcon: Server, OutputIcon: LineChart },
  { agent: 'reporting', text: 'Daily Sales Report finalized', type: 'success', source: 'Data Warehouse', output: 'LINE Group', SourceIcon: Database, OutputIcon: MessageCircle },
  { agent: 'vision', text: 'Queue too long (Avg 5 mins)', type: 'alert', source: 'CCTV Camera', output: 'Staff LINE', SourceIcon: Camera, OutputIcon: MessageCircle },
];

const initialActivities = [
  { id: 1, text: 'System initialized covering 4 sources', time: '1m ago', type: 'success' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [aiStatusIdx, setAiStatusIdx] = useState(0);

  const [pipelineStep, setPipelineStep] = useState(0);
  const [liveWorkflows, setLiveWorkflows] = useState<any[]>([]);
  const [liveActivities, setLiveActivities] = useState<any[]>(initialActivities);
  
  const [revenue, setRevenue] = useState(1243500);
  const [timeSaved, setTimeSaved] = useState(450);
  const [tasksAuto, setTasksAuto] = useState(12450);

  const formatCurrency = (num: number) => {
    return `+฿${(num / 1000000).toFixed(2)}M`;
  };

  useEffect(() => {
    const loopInterval = setInterval(() => {
      setAiStatusIdx(prev => (prev + 1) % POSSIBLE_EVENTS.length);
    }, 2500);

    const pipelineInterval = setInterval(() => {
      setPipelineStep(prev => (prev + 1) % 5);
    }, 3500); 

    return () => {
      clearInterval(loopInterval);
      clearInterval(pipelineInterval);
    };
  }, []);

  // Update workflows and metrics when step changes
  useEffect(() => {
    if (pipelineStep === 0) return; // Starting point, no completion yet
    
    // Determine which event just completed (Step 1 means vision finished, etc.)
    const completedAgentMap: Record<number, string> = { 1: 'vision', 2: 'analyst', 3: 'marketing', 4: 'reporting' };
    const completedAgent = completedAgentMap[pipelineStep];
    
    if (completedAgent) {
      const evt = POSSIBLE_EVENTS.find(e => e.agent === completedAgent);
      if (evt) {
        const id = Date.now();
        setLiveWorkflows(prev => [{ id, ...evt }, ...prev].slice(0, 2));
        setLiveActivities(prev => [{ id, text: evt.text, time: 'just now', type: evt.type }, ...prev].slice(0, 7));

        if (evt.text.includes("+3 customers")) { setRevenue(r => r + 1050); setTasksAuto(t => t + 3); }
        if (evt.text.includes("Optimized Ads")) { setRevenue(r => r + 2400); setTasksAuto(t => t + 15); }
        if (evt.text.includes("Revenue insight")) { setRevenue(r => r + 15000); setTasksAuto(t => t + 1); }
        if (evt.text.includes("Report") || evt.text.includes("Queue")) { setTimeSaved(t => t + 0.5); setTasksAuto(t => t + 5); }
      }
    }
  }, [pipelineStep]);

  const getAgentState = (agentId: string) => {
    const seq = ['vision', 'analyst', 'marketing', 'reporting'];
    const currentActiveAgent = seq[pipelineStep === 4 ? 0 : pipelineStep];
    const prevAgent = pipelineStep === 0 ? 'reporting' : seq[pipelineStep - 1];
    const nextAgent = seq[(pipelineStep + 1) % seq.length];

    if (agentId === currentActiveAgent) {
      const texts: Record<string, string> = { vision: 'Detecting...', analyst: 'Analyzing data...', marketing: 'Optimizing...', reporting: 'Generating...' };
      return { status: 'processing', text: texts[agentId] || 'Processing...' };
    }
    if (agentId === prevAgent) return { status: 'completed', text: 'Task finished' };
    if (agentId === nextAgent) return { status: 'waiting', text: 'Standing by' };
    return { status: 'idle', text: '-' };
  };

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    router.push(`/generate?intent=${encodeURIComponent(prompt)}`);
  };

  const handleChipClick = (text: string) => {
    setPrompt(prompt ? `${prompt} ${text}` : text);
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success': return <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />;
      case 'pending': return <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse" />;
      case 'alert': return <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />;
      default: return <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8fafc] text-slate-900">
      <div className="flex-1 p-6 lg:px-10 lg:py-8 w-full flex flex-col xl:grid xl:grid-cols-10 gap-8 xl:gap-8">
          
          <div className="xl:col-span-7 flex flex-col gap-8 lg:gap-8">
              {/* HERO SECTION */}
              <section className="relative w-full bg-gradient-to-br from-[#38bdf8] to-[#2563eb] p-6 lg:p-8 rounded-3xl shadow-md text-white flex flex-col xl:grid xl:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                <div className="xl:col-span-7 w-full relative z-10 flex flex-col">
                  <h1 className="text-3xl lg:text-4xl font-extrabold mb-2 leading-tight tracking-tight max-w-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-sky-400 bg-[length:200%_auto] animate-text-shimmer">
                    AI That Runs Your Business
                  </h1>
                  <p className="text-base lg:text-lg text-sky-50 mb-6 font-medium tracking-wide max-w-lg">
                    Increase revenue, reduce cost, and automate operations
                  </p>

                  <div className="bg-white rounded-2xl p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] focus-within:ring-4 focus-within:ring-indigo-300/50 transition-all max-w-2xl border border-white relative z-20">
                    <textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="เช่น: สร้างรายงานยอดขายรายวันอัตโนมัติ"
                      className="w-full bg-transparent resize-none h-16 md:h-20 p-3 text-lg text-slate-800 placeholder-slate-400 outline-none rounded-xl font-medium"
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2 gap-3 border-t border-slate-100 mt-1 pt-3">
                      <div className="flex flex-wrap gap-2">
                          <button onClick={() => handleChipClick('เพิ่มยอดขาย')} className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 text-slate-600 text-[13px] font-bold transition-colors">เพิ่มยอดขาย</button>
                          <button onClick={() => handleChipClick('สร้างรายงาน')} className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 text-slate-600 text-[13px] font-bold transition-colors">สร้างรายงาน</button>
                          <button onClick={() => handleChipClick('วิเคราะห์ลูกค้า')} className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 text-slate-600 text-[13px] font-bold transition-colors hidden lg:block">วิเคราะห์ลูกค้า</button>
                      </div>
                      <button 
                        onClick={handleGenerate}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md hover:shadow-blue-500/30 flex items-center justify-center gap-2 group transition-all shrink-0 w-full sm:w-auto"
                      >
                        <Sparkles size={18} className="group-hover:animate-pulse" /> Generate Workflow
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm font-bold text-sky-50/90 tracking-wide relative z-20">
                    <span className="flex items-center gap-1.5 opacity-90"><Zap size={16} /> ⚡ ได้ผลลัพธ์ใน 10 วินาที</span>
                    <span className="flex items-center gap-1.5 opacity-90"><ShieldCheck size={16} /> 🔒 PDPA Ready</span>
                    <span className="flex items-center gap-1.5 opacity-90"><Camera size={16} /> 🤖 AI Vision Ready</span>
                  </div>
                </div>

                {/* ANIMATED AI INFOGRAPHIC */}
                <div className="xl:col-span-5 w-full min-h-[300px] aspect-[4/3] rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 flex flex-col relative shadow-2xl overflow-hidden z-10">
                  
                  {/* Glowing ambient background for core */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-300/30 rounded-full blur-[60px] pointer-events-none" />

                  {/* Connecting Lines SVG */}
                  <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <motion.path d="M 40 45 C 150 45, 120 150, 200 150" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" strokeDasharray="6 6" animate={{ strokeDashoffset: [24, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                    <motion.path d="M 40 150 L 200 150" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" strokeDasharray="6 6" animate={{ strokeDashoffset: [24, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                    <motion.path d="M 40 255 C 150 255, 120 150, 200 150" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" strokeDasharray="6 6" animate={{ strokeDashoffset: [24, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                    
                    <motion.path d="M 200 150 C 280 150, 250 45, 360 45" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" strokeDasharray="6 6" animate={{ strokeDashoffset: [24, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                    <motion.path d="M 200 150 L 360 150" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" strokeDasharray="6 6" animate={{ strokeDashoffset: [24, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                    <motion.path d="M 200 150 C 280 150, 250 255, 360 255" stroke="rgba(255,255,255,0.3)" fill="none" strokeWidth="2" strokeDasharray="6 6" animate={{ strokeDashoffset: [24, 0] }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                  </svg>

                  <div className="flex items-stretch justify-between h-full w-full relative z-10">
                    
                    {/* LEFT (Inputs) */}
                    <div className="flex flex-col justify-between items-center py-4">
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center shadow-lg"><Camera size={20} className="text-white"/></motion.div>
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center shadow-lg"><MessageCircle size={20} className="text-white"/></motion.div>
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center shadow-lg"><Database size={20} className="text-white"/></motion.div>
                    </div>

                    {/* CENTER (AI Core) */}
                    <div className="flex flex-col items-center justify-center relative w-full h-full">
                      <div className="flex items-center justify-center mb-1 relative z-10">
                         <AudomasLogo size={110} animated={true} />
                      </div>
                      <span className="text-white font-extrabold tracking-widest uppercase text-sm shadow-sm drop-shadow-md relative z-20">Audomas AI</span>
                      
                      {/* Live Text Loop */}
                      <div className="h-5 overflow-hidden w-48 relative flex justify-center mt-2">
                        <AnimatePresence mode="wait">
                            <motion.span 
                              key={aiStatusIdx}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -15 }}
                              transition={{ duration: 0.3 }}
                              className="text-[11px] text-sky-100 font-semibold absolute whitespace-nowrap"
                            >
                              {POSSIBLE_EVENTS[aiStatusIdx]?.text || "Processing data..."}
                            </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* RIGHT (Outputs) */}
                    <div className="flex flex-col justify-between items-center py-4">
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.2 }} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center shadow-lg"><BellRing size={20} className="text-white"/></motion.div>
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.7 }} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center shadow-lg"><FileText size={20} className="text-white"/></motion.div>
                      <motion.div animate={{ y: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 1.2 }} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center shadow-lg"><Workflow size={20} className="text-white"/></motion.div>
                    </div>

                  </div>
                </div>

                {/* BACKGROUND DECORATIVE GLOWS */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-400/20 rounded-full blur-[70px] pointer-events-none" />
              </section>

              {/* QUICK START BUSINESS USE CASES */}
              <section className="w-full mt-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold tracking-tight text-slate-800">Quick Start</h3>
                  <span className="text-xs font-semibold text-slate-500">Business Templates</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {/* Content Creation */}
                  <div onClick={() => handleChipClick('สร้างคอนเทนต์อัตโนมัติ')} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-300 hover:shadow-md hover:-translate-y-1 transition-all group">
                     <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                        <FileText size={22} />
                     </div>
                     <span className="text-[13px] font-bold text-slate-700">Content Creation</span>
                  </div>
                  {/* Marketing Automation */}
                  <div onClick={() => handleChipClick('รันแคมเปญการตลาดอัตโนมัติ')} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all group">
                     <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                        <Target size={22} />
                     </div>
                     <span className="text-[13px] font-bold text-slate-700">Marketing Automation</span>
                  </div>
                  {/* Customer Analytics */}
                  <div onClick={() => handleChipClick('วิเคราะห์พฤติกรรมลูกค้า')} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all group">
                     <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                        <LineChart size={22} />
                     </div>
                     <span className="text-[13px] font-bold text-slate-700">Customer Analytics</span>
                  </div>
                  {/* AI Vision Monitoring */}
                  <div onClick={() => handleChipClick('ตั้งค่า AI Vision กล้องวงจรปิด')} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all group">
                     <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 mb-3 group-hover:scale-110 transition-transform">
                        <Camera size={22} />
                     </div>
                     <span className="text-[13px] font-bold text-slate-700">AI Vision Monitoring</span>
                  </div>
                  {/* Automated Reporting */}
                  <div onClick={() => handleChipClick('สรุปรายงานยอดขายอัตโนมัติ')} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-300 hover:shadow-md hover:-translate-y-1 transition-all group">
                     <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                        <Database size={22} />
                     </div>
                     <span className="text-[13px] font-bold text-slate-700">Automated Reporting</span>
                  </div>
                </div>
              </section>

              {/* SYSTEM LAYER DIVIDER */}
              <div className="flex items-center gap-4 py-2">
                 <div className="h-px bg-slate-200 flex-1" />
                 <span className="text-xs uppercase tracking-widest font-bold text-slate-400">System Infrastructure Layer</span>
                 <div className="h-px bg-slate-200 flex-1" />
              </div>

              {/* ACTIVE AI SQUAD */}
              <section className="w-full">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-bold tracking-tight text-slate-800">Active AI Squad</h3>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">All Systems Nominal</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {AI_AGENTS.map(agent => {
                    const agentState = getAgentState(agent.id);
                    const isProcessing = agentState.status === 'processing';
                    const isCompleted = agentState.status === 'completed';
                    const isWaiting = agentState.status === 'waiting';

                    return (
                      <div key={agent.id} className={`p-4 rounded-2xl bg-white border transition-all duration-500 flex flex-col gap-3 relative overflow-hidden ${isProcessing ? `border-${agent.color.split('-')[1]}-400 ${agent.activeShadow} scale-[1.02] bg-slate-50` : isWaiting ? 'border-indigo-100 opacity-80' : 'border-slate-200 shadow-sm opacity-60'}`}>
                         {isProcessing && <div className={`absolute top-0 left-0 w-full h-1 ${agent.bg} ${agent.color.replace('text-', 'bg-')} bg-opacity-80 animate-pulse`} />}
                         
                         <div className="flex justify-between items-start">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${agent.bg} ${agent.color} ${isProcessing ? 'scale-110' : ''} transition-transform`}>
                              <agent.icon size={20} />
                           </div>
                           <div className="flex items-center gap-1.5">
                             {isCompleted && <Sparkles size={12} className="text-emerald-500" />}
                             <div className={`w-2 h-2 rounded-full ${isProcessing ? `${agent.color.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor] animate-pulse` : isWaiting ? 'bg-amber-400 opacity-70' : isCompleted ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                             <span className={`text-[10px] font-bold uppercase ${isProcessing ? agent.color : isCompleted ? 'text-emerald-500' : isWaiting ? 'text-amber-500' : 'text-slate-400'}`}>
                                {agentState.status}
                             </span>
                           </div>
                         </div>
                         <div>
                           <h4 className="font-bold text-slate-800 text-[14px]">{agent.name}</h4>
                           <p className={`text-[11px] font-semibold mt-0.5 ${isProcessing ? 'text-slate-700 animate-pulse' : 'text-slate-400'}`}>
                              {agentState.text}
                           </p>
                         </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* LIVE WORKFLOW STREAM */}
              <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col flex-1 min-h-[300px]">
                <h3 className="text-lg font-bold mb-4 tracking-tight text-slate-800 flex items-center gap-2">
                   <Workflow size={18} className="text-blue-500" /> Active Workflows
                </h3>
                
                <div className="flex-1 flex flex-col gap-4 overflow-hidden relative">
                  {liveWorkflows.length === 0 && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                        <AudomasLogo size={60} animated={true} />
                        <span className="mt-4 text-sm font-semibold animate-pulse">Waiting for signals from environment...</span>
                     </div>
                  )}
                  
                  <AnimatePresence>
                    {liveWorkflows.map((flow) => {
                      const agentDef = AI_AGENTS.find(a => a.id === flow.agent);
                      return (
                        <motion.div 
                          key={flow.id}
                          initial={{ opacity: 0, y: -20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4 }}
                          className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl p-4 w-full group hover:border-blue-200 hover:shadow-sm"
                        >
                          {/* Left: Data Source */}
                          <div className="flex flex-col items-center justify-center gap-1 w-24 shrink-0">
                             <div className="w-10 h-10 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center">
                                <flow.SourceIcon size={18} className="text-slate-600" />
                             </div>
                             <span className="text-[10px] font-bold text-slate-500 text-center">{flow.source}</span>
                          </div>

                          {/* Middle: Connection & AI */}
                          <div className="flex-1 flex items-center px-4 relative">
                             {/* Animated flow line */}
                             <div className="h-[2px] flex-1 bg-slate-200 relative overflow-hidden rounded-full">
                                <motion.div 
                                  className={`absolute top-0 bottom-0 left-0 w-1/3 ${agentDef?.color.replace('text-', 'bg-')}`}
                                  initial={{ x: "-100%" }}
                                  animate={{ x: "400%" }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                />
                             </div>
                             
                             {/* Display the active AI */}
                             <div className={`mx-2 px-3 py-1.5 rounded-full border ${agentDef?.border} ${agentDef?.bg} ${agentDef?.color} flex items-center gap-2 shadow-sm relative z-10 bg-opacity-70 backdrop-blur-sm`}>
                               <AudomasLogo size={16} animated={true} className="shrink-0" />
                               <span className="text-[11px] font-bold whitespace-nowrap">{agentDef?.name}</span>
                             </div>

                             <div className="h-[2px] flex-1 bg-slate-200 relative overflow-hidden rounded-full">
                                <motion.div 
                                  className={`absolute top-0 bottom-0 left-0 w-1/3 ${agentDef?.color.replace('text-', 'bg-')}`}
                                  initial={{ x: "-100%" }}
                                  animate={{ x: "400%" }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }}
                                />
                             </div>
                          </div>

                          {/* Right: Output */}
                          <div className="flex flex-col items-center justify-center gap-1 w-24 shrink-0">
                             <div className="w-10 h-10 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center relative">
                                <flow.OutputIcon size={18} className={flow.type === 'alert' ? 'text-amber-500' : 'text-slate-600'} />
                                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${flow.type === 'alert' ? 'bg-amber-500 animate-bounce' : 'bg-green-500'}`} />
                             </div>
                             <span className="text-[10px] font-bold text-slate-500 text-center">{flow.output}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </section>

          </div>

          {/* RIGHT PANEL - LIVE FEED */}
          <aside className="xl:col-span-3 flex flex-col gap-6 w-full shrink-0 h-full">
            
            {/* AUDOMAS METRICS CARDS */}
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-4 shrink-0">
               <div className="bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/20 rounded-2xl p-5 flex items-center justify-between text-white overflow-hidden relative">
                 <div className="flex flex-col relative z-10 w-1/2">
                   <h3 className="text-sm font-semibold text-sky-100 mb-0.5">Revenue Impact</h3>
                   <motion.span 
                     key={revenue}
                     initial={{ scale: 1.1, color: "#bae6fd" }}
                     animate={{ scale: 1, color: "#ffffff" }}
                     className="text-2xl font-extrabold tracking-tight"
                   >
                     {formatCurrency(revenue)}
                   </motion.span>
                 </div>
                 
                 {/* Sparkline Graph */}
                 <div className="w-[45%] h-10 relative z-0 flex items-center justify-end">
                    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none overflow-visible">
                       <defs>
                          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                          </linearGradient>
                       </defs>
                       <motion.path 
                          d="M0 40 L0 30 Q15 5 35 25 T65 15 T100 5 L100 40 Z" 
                          fill="url(#revGrad)" 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ duration: 1 }}
                       />
                       <motion.path 
                          d="M0 30 Q15 5 35 25 T65 15 T100 5" 
                          fill="none" 
                          stroke="#93c5fd" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          initial={{ pathLength: 0 }} 
                          animate={{ pathLength: 1 }} 
                          transition={{ duration: 2, ease: "easeOut" }}
                       />
                       {/* Animated pulse dot */}
                       <motion.circle 
                          cx="100" cy="5" r="3" fill="#ffffff" 
                          className="drop-shadow-md"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
                          transition={{ repeat: Infinity, duration: 2 }}
                       />
                    </svg>
                 </div>
               </div>
               
               <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-5 flex items-center justify-between overflow-hidden relative group">
                 <div className="flex flex-col relative z-10 w-1/2">
                   <h3 className="text-sm font-semibold text-slate-500 mb-0.5 whitespace-nowrap">Operations Auto</h3>
                   <div className="flex items-center gap-2">
                     <motion.span 
                       key={tasksAuto}
                       initial={{ y: -5 }} animate={{ y: 0 }}
                       className="text-2xl font-extrabold text-slate-800 tracking-tight"
                     >
                       {tasksAuto.toLocaleString()}
                     </motion.span>
                     <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase tracking-wider">Live</span>
                   </div>
                 </div>

                 {/* Sparkline Graph */}
                 <div className="w-[45%] h-10 relative z-0 flex items-center justify-end">
                    <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none overflow-visible">
                       <defs>
                          <linearGradient id="opsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                       </defs>
                       <motion.path 
                          d="M0 40 L0 35 L20 20 L40 25 L65 10 L85 15 L100 0 L100 40 Z" 
                          fill="url(#opsGrad)" 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ duration: 1, delay: 0.2 }}
                       />
                       <motion.path 
                          d="M0 35 L20 20 L40 25 L65 10 L85 15 L100 0" 
                          fill="none" 
                          stroke="#10b981" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }} 
                          animate={{ pathLength: 1 }} 
                          transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
                       />
                       {/* Animated pulse dot */}
                       <motion.circle 
                          cx="100" cy="0" r="3" fill="#10b981" 
                          className="drop-shadow-md"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
                          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                       />
                    </svg>
                 </div>
               </div>
            </div>

            {/* AIRGAPX VAULT STATUS */}
            <div className="bg-[#0f172a] shadow-lg shadow-slate-900/10 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shrink-0 group">
              <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Offline Network</span>
                 <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-emerald-400" /> AirGapX Vault
                 </h4>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                 <span className="text-[10px] font-extrabold text-emerald-400 tracking-wide">ACTIVE & SECURED</span>
              </div>
            </div>

            {/* LIVE ACTIVITY FEED */}
            <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-5 flex-1 flex flex-col overflow-hidden min-h-[400px]">
              <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
                 <h3 className="text-base font-bold flex items-center gap-2 text-slate-800 tracking-tight">
                    <Activity className="text-blue-500" size={18} /> Engine Activity
                 </h3>
                 <span className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1.5 rounded-full border border-blue-100 uppercase tracking-wide">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" /> Scanning
                 </span>
              </div>

              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
                 <AnimatePresence>
                   {liveActivities.map(item => (
                     <motion.div 
                       key={item.id}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, height: 0 }}
                       className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm flex items-start gap-3"
                     >
                       <div className="mt-1 shrink-0">
                         {getStatusIcon(item.type)}
                       </div>
                       <div className="flex flex-col flex-1 gap-1">
                         <p className="text-slate-700 font-semibold leading-snug">{item.text}</p>
                         <span className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">{item.time}</span>
                       </div>
                     </motion.div>
                   ))}
                 </AnimatePresence>
              </div>
            </div>
          </aside>

        </div>
    </div>
  );
}
