"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AgentCardProps {
  title: string;
  icon: LucideIcon;
  status?: "idle" | "active" | "error" | "alert";
  className?: string;
}

export function AgentCard({ title, icon: Icon, status = "idle", className }: AgentCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      className={cn("relative flex flex-col items-center justify-end h-56 w-48 mx-auto group cursor-pointer", className)}
    >
      {/* Holographic Upward Beam */}
      <div 
        className="absolute bottom-16 w-28 h-28 bg-gradient-to-t from-cyan-400/30 via-cyan-400/5 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
      />

      {/* Floating Hologram Icon */}
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[5.5rem] z-20 text-cyan-50 drop-shadow-[0_0_15px_rgba(34,211,238,0.9)]"
      >
        <div className="glass-card p-3 rounded-full backdrop-blur-md shadow-[inset_0_0_20px_rgba(34,211,238,0.3),0_0_30px_rgba(6,182,212,0.2)]">
          <Icon className="w-8 h-8 md:w-10 md:h-10 text-cyan-200" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* 3D Circular Pedestal Base */}
      <div className="absolute bottom-12 w-36 h-10 bg-white/5 backdrop-blur-md rounded-[100%] shadow-[0_10px_30px_rgba(6,182,212,0.15)] flex items-center justify-center overflow-hidden z-10 transition-all duration-500 group-hover:shadow-[0_15px_40px_rgba(6,182,212,0.3)] group-hover:bg-white/10">
        {/* Inner glow ring */}
        <div className="w-24 h-5 rounded-[100%] bg-cyan-400/10 flex items-center justify-center shadow-[inset_0_0_20px_rgba(34,211,238,0.4)]">
          <div className="w-16 h-2 bg-cyan-300/60 rounded-[100%] blur-[3px]" />
        </div>
      </div>

      {/* Text Label Below Pedestal */}
      <div className="absolute bottom-0 w-40 text-center z-20 flex flex-col items-center">
        <h3 className="text-[11px] leading-tight font-extrabold uppercase tracking-widest text-slate-200">
          {title}
        </h3>
        
        {/* Status Indicator pulse */}
        {status === "active" && (
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] mt-2 opacity-60 group-hover:opacity-100" />
        )}
        {status === "alert" && (
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] mt-2 animate-pulse" />
        )}
      </div>
    </motion.div>
  );
}
