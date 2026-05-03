"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const INITIAL_LOGS = [
  { id: 1, agent: "LEAD_ANALYST", action: "analyzing 'Q3 Financial Data'" },
  { id: 2, agent: "SALES_EXEC", action: "drafting 'Enterprise Proposal'..." },
  { id: 3, agent: "COMPLIANCE", action: "validating 'Proposal T&C'..." },
  { id: 4, agent: "EXECUTIVE_REVIEW", action: "flagged 'Action Required'." },
  { id: 5, agent: "SYSTEM_GATEWAY", action: "awaiting dispatch auth..." },
];

export function TaskLogPanel() {
  const [logs, setLogs] = useState(INITIAL_LOGS);

  // Optional: Add simple rotation for continuous effect
  useEffect(() => {
    const timer = setInterval(() => {
      setLogs(prev => {
        const next = [...prev];
        const first = next.shift();
        if (first) next.push(first);
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel w-72 rounded-xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.5)] skew-y-[2deg] bg-[#020617]/40 backdrop-blur-xl text-[10px] sm:text-[11px]"
    >
      <div className="font-bold tracking-widest text-slate-200 mb-3 border-b border-white/10 pb-2">
        LIVE TASK LOG
      </div>
      
      <div className="space-y-2 font-mono flex flex-col justify-start min-h-[140px]">
        {logs.map((log, i) => (
          <motion.div 
            key={`${log.id}-${i}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start tracking-tight leading-relaxed"
          >
            <div className="text-slate-400 break-words w-full">
              {log.agent === "EXECUTIVE_REVIEW" && (
                <span className="text-amber-500 mr-2 animate-pulse">-{">"}</span>
              )}
              <span className="text-slate-300">[{log.agent}]</span>
              <span className="text-slate-400 ml-1.5">{log.action}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Decorative scanning line overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
        <motion.div 
          animate={{ y: ["-10%", "110%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-full h-10 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent block"
        />
      </div>
    </motion.div>
  );
}
