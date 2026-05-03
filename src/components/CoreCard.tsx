"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Activity, Briefcase, Database, SearchCheck, MessageSquare } from "lucide-react";

export function CoreCard() {
  const miniAgents = [
    { label: "การตลาด", icon: MessageSquare, pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
    { label: "การขาย", icon: Briefcase, pos: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2" },
    { label: "ปฏิบัติการ", icon: SearchCheck, pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
    { label: "ข้อมูล", icon: Database, pos: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" },
  ];

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#0B1121]/80 backdrop-blur-3xl border border-white/10 p-6 rounded-[2.5rem] flex flex-col items-center justify-between w-80 h-[320px] relative z-20 group shadow-[0_0_80px_rgba(37,99,235,0.2)]"
    >
      <div className="absolute -top-8 text-[10px] font-bold text-slate-500 tracking-[0.2em] md:tracking-[0.3em] uppercase text-center w-full">
        ระบบตัดสินใจ AI
      </div>

      {/* Orbiting Ring Wrapper */}
      <div className="relative flex-1 flex items-center justify-center w-full mt-2 mb-4">
        
        {/* The rotating container */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[210px] h-[210px] rounded-full border border-blue-900/30 border-dashed"
        >
          {/* Mini Agents */}
          {miniAgents.map((agent, i) => (
            <div key={i} className={`absolute ${agent.pos}`}>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full bg-[#0B1121] shadow-lg flex flex-col items-center justify-center relative group/agent overflow-hidden border border-slate-700/80 hover:border-blue-500/50 transition-colors"
              >
                <agent.icon className="w-4 h-4 text-cyan-400" />
                <div className="absolute -bottom-6 text-[9px] font-bold text-slate-300 tracking-wider uppercase opacity-0 group-hover/agent:opacity-100 transition-opacity whitespace-nowrap bg-slate-900 px-1.5 py-0.5 rounded shadow-lg border border-slate-700 z-50">
                  {agent.label}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Central Glowing Orb / Star graphic */}
        <div className="relative flex items-center justify-center z-10 bg-[#060b17] border border-blue-500/20 rounded-full w-28 h-28 shadow-[0_0_50px_rgba(37,99,235,0.3)]">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl scale-150" 
          />
          <div className="absolute inset-0 rounded-full border border-white/5" />
          <BrainCircuit className="w-12 h-12 text-blue-400 relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
        </div>
      </div>

      <div className="w-full mt-auto relative z-20">
        <button className="relative px-6 py-2.5 rounded-xl overflow-hidden w-full font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(6,182,212,0.3)] group/btn border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-90 group-hover/btn:opacity-100 transition-opacity" />
          <span className="relative text-white flex items-center justify-center gap-2 text-[13px] tracking-wide">
            <Activity className="w-4 h-4 animate-pulse" />
            AI Core ทำงานปกติ
          </span>
        </button>
      </div>


    </motion.div>
  );
}
