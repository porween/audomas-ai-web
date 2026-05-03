"use client";

import { motion } from "framer-motion";

export function StatusPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-panel w-72 rounded-xl p-5 shadow-2xl flex flex-col space-y-3 font-mono text-[11px]"
    >
      <div className="text-slate-200 font-bold mb-1 tracking-widest text-xs">GLOBAL STATUS</div>
      
      <div className="flex items-center justify-between">
        <span className="text-slate-400 uppercase tracking-wider">Network Status:</span>
        <span className="text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">SECURE</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-slate-400 uppercase tracking-wider">Airgap Status:</span>
        <span className="text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">ACTIVE</span>
      </div>

      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 uppercase tracking-wider">AI Squad Utilization:</span>
          <span className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">78%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-[inset_0_0_5px_rgba(0,0,0,0.5)] border border-slate-700">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
