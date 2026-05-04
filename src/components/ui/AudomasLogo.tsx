"use client";

import React from "react";

/*
 * AudomasLogo — Premium animated version
 * 
 * All animation is pure CSS via className injections.
 * The `animated` prop gates the data-stream lines.
 * Stream direction: INWARD — all dots move toward center (60,60).
 */
export const AudomasLogo = ({
  className = "",
  size = 40,
  animated = true,
}: {
  className?: string;
  size?: number | string;
  animated?: boolean;
}) => {
  const id = "al"; // short prefix to avoid SVG gradient ID conflicts

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Audomas"
    >
      <defs>
        {/* Core gradient: deep blue → electric cyan */}
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0066CC" />
          <stop offset="0.5" stopColor="#0099DD" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>

        {/* Stream line gradient (low opacity) */}
        <linearGradient id={`${id}-stream`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#00D4FF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#0066CC" stopOpacity="0.2" />
        </linearGradient>

        {/* Outer glow filter for hexagon */}
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Soft glow for center node */}
        <filter id={`${id}-cglow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Clip to keep streams inside SVG bounds */}
        <clipPath id={`${id}-clip`}>
          <rect width="120" height="120" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>

        {/* ── Static connection lines ── */}
        <g
          stroke={`url(#${id}-stream)`}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.55"
        >
          <path d="M60,40 C60,30 40,30 25,25" />
          <path d="M60,40 C60,30 80,30 95,25" />
          <path d="M60,80 C60,90 40,90 25,95" />
          <path d="M60,80 C60,90 80,90 95,95" />
          <path d="M42.68,60 C30,60 20,60 15,60" />
          <path d="M77.32,60 C90,60 100,60 105,60" />
        </g>

        {/* ── Animated data streams (CSS only, flowing INWARD) ── */}
        {animated && (
          <g
            stroke="#00D4FF"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          >
            {/* Top-left → core */}
            <path
              d="M60,40 C60,30 40,30 25,25"
              strokeDasharray="5 76"
              strokeDashoffset="0"
              style={{ animation: "audomas-stream-in 2.2s linear infinite" }}
            />
            {/* Top-right → core */}
            <path
              d="M60,40 C60,30 80,30 95,25"
              strokeDasharray="5 76"
              strokeDashoffset="0"
              style={{ animation: "audomas-stream-in 3.0s linear infinite 0.6s" }}
            />
            {/* Bottom-left → core */}
            <path
              d="M60,80 C60,90 40,90 25,95"
              strokeDasharray="5 76"
              strokeDashoffset="0"
              style={{ animation: "audomas-stream-in 2.6s linear infinite 1.1s" }}
            />
            {/* Bottom-right → core */}
            <path
              d="M60,80 C60,90 80,90 95,95"
              strokeDasharray="5 76"
              strokeDashoffset="0"
              style={{ animation: "audomas-stream-in 2.8s linear infinite 0.3s" }}
            />
            {/* Left-mid → core */}
            <path
              d="M42.68,60 C30,60 20,60 15,60"
              strokeDasharray="5 48"
              strokeDashoffset="0"
              style={{ animation: "audomas-stream-in 1.9s linear infinite 0.8s" }}
            />
            {/* Right-mid → core */}
            <path
              d="M77.32,60 C90,60 100,60 105,60"
              strokeDasharray="5 48"
              strokeDashoffset="0"
              style={{ animation: "audomas-stream-in 2.1s linear infinite 0.15s" }}
            />
          </g>
        )}

        {/* ── Satellite nodes (sparkling stars) ── */}
        <g fill={`url(#${id}-grad)`} opacity="0.85">
          <path d="M25,19 L32,25 L25,31 L18,25 Z"
            style={animated ? { animation: "audomas-node-sparkle 1.8s ease-in-out infinite 0s", transformOrigin: "25px 25px" } : {}} />
          <path d="M95,19 L102,25 L95,31 L88,25 Z"
            style={animated ? { animation: "audomas-node-sparkle 2.2s ease-in-out infinite 0.4s", transformOrigin: "95px 25px" } : {}} />
          <path d="M25,89 L32,95 L25,101 L18,95 Z"
            style={animated ? { animation: "audomas-node-sparkle 2.0s ease-in-out infinite 1.0s", transformOrigin: "25px 95px" } : {}} />
          <path d="M95,89 L102,95 L95,101 L88,95 Z"
            style={animated ? { animation: "audomas-node-sparkle 1.9s ease-in-out infinite 0.6s", transformOrigin: "95px 95px" } : {}} />
          <path d="M15,54 L21,60 L15,66 L9,60 Z"
            style={animated ? { animation: "audomas-node-sparkle 2.4s ease-in-out infinite 0.2s", transformOrigin: "15px 60px" } : {}} />
          <path d="M105,54 L111,60 L105,66 L99,60 Z"
            style={animated ? { animation: "audomas-node-sparkle 2.1s ease-in-out infinite 0.9s", transformOrigin: "105px 60px" } : {}} />
        </g>

        {/* ── Central hexagon / AI core ── */}
        <g filter={`url(#${id}-glow)`}
          style={animated ? { animation: "audomas-core-breathe 3.5s ease-in-out infinite", transformOrigin: "60px 60px" } : {}}>
          {/* Outer hex ring */}
          <path
            d="M60,35 L81.65,47.5 L81.65,72.5 L60,85 L38.35,72.5 L38.35,47.5 Z"
            fill={`url(#${id}-grad)`}
            fillOpacity="0.12"
            stroke={`url(#${id}-grad)`}
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* 3-axis internal lines */}
          <path d="M60,60 L60,35" stroke={`url(#${id}-grad)`} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M60,60 L81.65,72.5" stroke={`url(#${id}-grad)`} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M60,60 L38.35,72.5" stroke={`url(#${id}-grad)`} strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* ── Center bright orb ── */}
        <circle
          cx="60"
          cy="60"
          r="5.5"
          fill="#00D4FF"
          filter={`url(#${id}-cglow)`}
          style={animated ? { animation: "audomas-orb-glow 2s ease-in-out infinite", transformOrigin: "60px 60px" } : {}}
        />
        {/* Hard bright center point (The star flare) */}
        <circle cx="60" cy="60" r="2.5" fill="#FFFFFF" opacity="0.9">
           {animated && (
             <animate
               attributeName="r"
               values="2;4;2"
               dur="1.5s"
               repeatCount="indefinite"
             />
           )}
        </circle>
      </g>
    </svg>
  );
};
