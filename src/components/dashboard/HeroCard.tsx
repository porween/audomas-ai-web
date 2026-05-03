"use client";

import { Send, Zap, Lock, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroCard() {
  const [query, setQuery] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "เช่น: เพิ่มยอดขาย 20% จากข้อมูลลูกค้า",
    "เช่น: ตรวจจับลูกค้าเข้าร้าน + แจ้งเตือนทันที",
    "เช่น: สร้างรายงานยอดขายรายวันอัตโนมัติ"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const suggestions = [
    "เพิ่มยอดขาย",
    "วิเคราะห์ลูกค้า",
    "แจ้งเตือนกล้อง",
    "สร้างรายงาน",
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 mb-8 z-10 w-full">
      {/* Soft Gradients / Glassmorphism */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-300/30 via-purple-300/30 to-blue-300/30 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-200/30 to-indigo-200/30 blur-[60px] rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center gap-12">
        
        {/* Left Content Area */}
        <div className="flex-1 max-w-3xl w-full">

          <h1 className="text-4xl md:text-[3.25rem] font-extrabold text-slate-900 mb-5 tracking-tight leading-[1.15]">
            AI Automation that Drives<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
              Real Business Results
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 font-medium max-w-2xl leading-relaxed">
            Increase revenue, reduce cost, and automate operations in seconds.
          </p>

          {/* MAIN INPUT COMMAND - Sticky, glowing feel */}
          <div className="relative mb-5 group max-w-2xl">
             {/* Glow effect under input */}
             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
             
             <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-indigo-500/10 border border-slate-200/60 overflow-hidden">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full text-slate-800 bg-transparent py-5 pl-6 pr-16 focus:outline-none font-medium placeholder:text-transparent text-lg md:text-xl"
                />
                
                {/* Rotating Placeholder Overlay */}
                {!query && (
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-lg md:text-xl font-medium w-[calc(100%-80px)] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="block truncate"
                      >
                        {placeholders[placeholderIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}

                <button 
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900 hover:bg-indigo-600 text-white rounded-[14px] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(79,70,229,0.7)] hover:scale-105"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
             </div>
          </div>

          {/* Trust + Speed Indicators */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 max-w-2xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white/60 px-3 py-1.5 rounded-full border border-slate-200/50 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>ได้ผลลัพธ์ภายใน 10 วินาที</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white/60 px-3 py-1.5 rounded-full border border-slate-200/50 backdrop-blur-sm">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>ปลอดภัยระดับองค์กร (PDPA Ready)</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {suggestions.map((sug, i) => (
              <button 
                key={i}
                onClick={() => setQuery(sug)}
                className="px-4 py-2 rounded-xl border border-slate-200/60 bg-white/80 text-sm font-bold text-indigo-900 hover:text-white hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area - Avatar & Status */}
        <div className="hidden xl:flex flex-col items-center shrink-0 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 blur-3xl rounded-full" />
          
          <div className="w-56 h-56 relative animate-[float_4s_ease-in-out_infinite] z-10 flex items-center justify-center">
            {/* Glossy AI Avatar Sphere */}
            <div className="w-44 h-44 rounded-full bg-gradient-to-br from-indigo-50/90 to-purple-50/40 shadow-[inset_0_4px_20px_rgba(255,255,255,1),0_15px_50px_rgba(79,70,229,0.4)] backdrop-blur-2xl border border-white/80 flex items-center justify-center overflow-hidden">
               {/* Inner Eye / Core */}
               <div className="w-24 h-24 rounded-full bg-gradient-to-t from-indigo-600 to-purple-400 flex items-center justify-center relative shadow-[inset_0_-4px_15px_rgba(0,0,0,0.3)]">
                  <div className="w-16 h-16 rounded-full bg-indigo-950 overflow-hidden relative shadow-inner">
                     {/* Scanning line */}
                     <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/90 shadow-[0_0_15px_rgba(34,211,238,1)] animate-[scan_2s_ease-in-out_infinite]" />
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white blur-[2px]" />
                  </div>
               </div>
            </div>
            
            <Sparkles className="absolute -top-4 left-6 w-8 h-8 text-indigo-400 animate-pulse" />
            <Sparkles className="absolute bottom-6 right-4 w-6 h-6 text-purple-400 animate-pulse delay-150" />
          </div>

          <div className="mt-8 px-5 py-2.5 bg-slate-900 backdrop-blur-md rounded-full shadow-xl flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-bold text-white tracking-widest uppercase">AI พร้อมทำงาน 24/7</span>
          </div>
        </div>

      </div>
    </div>
  );
}
