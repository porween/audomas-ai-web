"use client";

import { motion } from "framer-motion";

const LEFT_PATHS = [
  { id: "l1", d: "M 250 160 C 400 160, 450 360, 600 360", dur: 4, delayOffset: 0 },
  { id: "l2", d: "M 250 360 L 600 360", dur: 3.5, delayOffset: 1 },
  { id: "l3", d: "M 250 560 C 400 560, 450 360, 600 360", dur: 4, delayOffset: 2 },
];

const RIGHT_PATHS = [
  { id: "r1", d: "M 600 360 C 750 360, 800 160, 950 160", dur: 4, delayOffset: 0.5 },
  { id: "r2", d: "M 600 360 L 950 360", dur: 3.5, delayOffset: 1.5 },
  { id: "r3", d: "M 600 360 C 750 360, 800 560, 950 560", dur: 4, delayOffset: 2.5 },
];

const ALL_PATHS = [...LEFT_PATHS, ...RIGHT_PATHS];

export function AnimatedConnectionLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      <svg 
        className="w-full max-w-[1200px] h-[720px] opacity-90"
        viewBox="0 0 1200 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
            <stop offset="50%" stopColor="rgba(56, 189, 248, 0.4)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
          </linearGradient>
          
          <filter id="blurGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Static Structural Lines */}
        {ALL_PATHS.map((path) => (
          <g key={`static-${path.id}`}>
            {/* Deep intense atmospheric glow */}
            <path d={path.d} stroke="url(#cyanGlow)" strokeWidth="8" opacity="0.1" filter="url(#blurGlow)" />
            {/* Thinner concentrated line */}
            <path d={path.d} stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1" />
          </g>
        ))}

        {/* Traveling Data Particles */}
        <g filter="url(#blurGlow)">
          {ALL_PATHS.map((path) => {
            return [0, 1, 2].map((trailIdx) => {
              const trailDelay = trailIdx * 0.15;
              const actualDelay = (path.delayOffset - trailDelay + path.dur) % path.dur;
              const size = trailIdx === 0 ? 3 : 2 - (trailIdx * 0.4);
              const opacity = trailIdx === 0 ? 1 : 1 - (trailIdx * 0.3);
              const color = trailIdx === 0 ? "#ffffff" : "#22d3ee"; // Cyan
              
              return (
                <g key={`particle-${path.id}-${trailIdx}`}>
                  <animateMotion 
                    dur={`${path.dur}s`} 
                    repeatCount="indefinite" 
                    path={path.d} 
                    begin={`-${actualDelay}s`} 
                  />
                  <circle r={size} fill={color}>
                    <animate 
                      attributeName="opacity" 
                      values={`0;${opacity};${opacity};0`} 
                      keyTimes="0;0.1;0.9;1" 
                      dur={`${path.dur}s`} 
                      repeatCount="indefinite" 
                      begin={`-${actualDelay}s`} 
                    />
                  </circle>
                </g>
              );
            });
          })}
        </g>
      </svg>
    </div>
  );
}
