"use client";

import React from "react";
import { motion } from "framer-motion";

export const AudomasLogo = ({ 
  className = "", 
  size = 40,
  animated = false
}: { 
  className?: string, 
  size?: number | string,
  animated?: boolean
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ai-core-gradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="ai-line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#38bdf8" stopOpacity="0.4"/>
          <stop offset="1" stopColor="#6366f1" stopOpacity="0.4"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Base Connection Lines */}
      <g stroke="url(#ai-line-gradient)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M 60,40 C 60,30 40,30 25,25" />
        <path d="M 60,40 C 60,30 80,30 95,25" />
        <path d="M 60,80 C 60,90 40,90 25,95" />
        <path d="M 60,80 C 60,90 80,90 95,95" />
        <path d="M 42.68,60 C 30,60 20,60 15,60" />
        <path d="M 77.32,60 C 90,60 100,60 105,60" />
      </g>

      {/* Animated Flowing Dots (All flowing INWARDS to Core) */}
      <motion.g stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="url(#dot-glow)">
        {/* IN: Top Left to Core */}
        <motion.path 
          d="M 60,40 C 60,30 40,30 25,25" 
          strokeDasharray="4 80"
          animate={animated ? { strokeDashoffset: [0, 84] } : {}}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0 }}
        />
        {/* IN: Top Right to Core */}
        <motion.path 
          d="M 60,40 C 60,30 80,30 95,25" 
          strokeDasharray="4 80"
          animate={animated ? { strokeDashoffset: [0, 84] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
        />
        {/* IN: Bottom Left to Core */}
        <motion.path 
          d="M 60,80 C 60,90 40,90 25,95" 
          strokeDasharray="4 80"
          animate={animated ? { strokeDashoffset: [0, 84] } : {}}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear", delay: 0.2 }}
        />
        {/* IN: Bottom Right to Core */}
        <motion.path 
          d="M 60,80 C 60,90 80,90 95,95" 
          strokeDasharray="4 80"
          animate={animated ? { strokeDashoffset: [0, 84] } : {}}
          transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 0.8 }}
        />
        {/* IN: Left Mid to Core */}
        <motion.path 
          d="M 42.68,60 C 30,60 20,60 15,60" 
          strokeDasharray="4 50"
          animate={animated ? { strokeDashoffset: [0, 54] } : {}}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay: 0.1 }}
        />
        {/* IN: Right Mid to Core */}
        <motion.path 
          d="M 77.32,60 C 90,60 100,60 105,60" 
          strokeDasharray="4 50"
          animate={animated ? { strokeDashoffset: [0, 54] } : {}}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear", delay: 0.6 }}
        />
      </motion.g>

      {/* Satellite Nodes (AI Agents) - Blinking/Pulsing */}
      <motion.g fill="url(#ai-core-gradient)" style={{ transformOrigin: "center" }}>
        {/* Node 1 */}
        <motion.path d="M25,19 L32,25 L25,31 L18,25 Z" animate={animated ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} style={{ transformOrigin: "25px 25px" }} />
        {/* Node 2 */}
        <motion.path d="M95,19 L102,25 L95,31 L88,25 Z" animate={animated ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}} transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }} style={{ transformOrigin: "95px 25px" }} />
        {/* Node 3 */}
        <motion.path d="M25,89 L32,95 L25,101 L18,95 Z" animate={animated ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}} transition={{ repeat: Infinity, duration: 1.6, delay: 0.8 }} style={{ transformOrigin: "25px 95px" }} />
        {/* Node 4 */}
        <motion.path d="M95,89 L102,95 L95,101 L88,95 Z" animate={animated ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} style={{ transformOrigin: "95px 95px" }} />
        {/* Node 5 */}
        <motion.path d="M15,54 L21,60 L15,66 L9,60 Z" animate={animated ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} style={{ transformOrigin: "15px 60px" }} />
        {/* Node 6 */}
        <motion.path d="M105,54 L111,60 L105,66 L99,60 Z" animate={animated ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}} transition={{ repeat: Infinity, duration: 1.7, delay: 0.6 }} style={{ transformOrigin: "105px 60px" }} />
      </motion.g>

      {/* Central AI Core (Isometric Cube / Hexagon Engine) - Pulsing */}
      <motion.g 
        filter="url(#glow)"
        style={{ transformOrigin: "60px 60px" }}
        animate={animated ? { scale: [1, 1.05, 1], opacity: [0.85, 1, 0.85] } : {}}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <path 
          d="M60,35 L81.65,47.5 L81.65,72.5 L60,85 L38.35,72.5 L38.35,47.5 Z" 
          fill="url(#ai-core-gradient)" 
          fillOpacity="0.15" 
          stroke="url(#ai-core-gradient)" 
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Inner geometric lines forming a 3D isometric cube */}
        <path d="M60,60 L60,35" stroke="url(#ai-core-gradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M60,60 L81.65,72.5" stroke="url(#ai-core-gradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M60,60 L38.35,72.5" stroke="url(#ai-core-gradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      
      {/* Very center bright core node */}
      <motion.circle 
         cx="60" cy="60" r="5" 
         fill="#fff" 
         style={{ transformOrigin: "60px 60px" }}
         animate={animated ? { scale: [0.8, 1.5, 0.8], opacity: [0.7, 1, 0.7] } : {}}
         transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      />
    </svg>
  );
};
