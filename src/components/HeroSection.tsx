"use client";

import { motion } from "framer-motion";
import { Database, MessageCircle, Globe, Reply, Rocket, RefreshCw } from "lucide-react";
import { CoreCard } from "./CoreCard";
import { Navbar } from "./Navbar";
import { AnimatedConnectionLines } from "./AnimatedConnectionLines";

const TRIGGERS = [
  { id: "web", label: "เว็บไซต์ / โฆษณา", icon: Globe, pos: "left-[80px] top-[124px]" },
  { id: "chat", label: "แชทลูกค้า", icon: MessageCircle, pos: "left-[80px] top-[324px]" },
  { id: "crm", label: "ข้อมูล CRM", icon: Database, pos: "left-[80px] top-[524px]" },
];

const OUTCOMES = [
  { id: "reply", label: "ตอบกลับอัตโนมัติ", icon: Reply, pos: "right-[80px] top-[124px]" },
  { id: "ads", label: "ยิงแอดอัตโนมัติ", icon: Rocket, pos: "right-[80px] top-[324px]" },
  { id: "update", label: "อัปเดต CRM", icon: RefreshCw, pos: "right-[80px] top-[524px]" },
];

const RESULTS = [
  { value: "+120%", label: "ยอดผู้สนใจ" },
  { value: "-30%", label: "ลดต้นทุน" },
  { value: "24/7", label: "ทำงานอัตโนมัติ" },
  { value: "< 5s", label: "ตอบสนอง" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

function FlowNode({ label, icon: Icon, type }: { label: string, icon: any, type: "input" | "output" }) {
  const isInput = type === "input";
  return (
    <motion.div 
      className={`w-56 h-[72px] px-4 rounded-xl flex items-center gap-3 relative overflow-hidden group shadow-lg bg-[#1e293b]/60 backdrop-blur-md border border-slate-700/50 hover:border-slate-600/80 transition-colors`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${isInput ? 'from-sky-500/0 via-sky-500/10 to-sky-500/0' : 'from-blue-500/0 via-blue-500/10 to-blue-500/0'} opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-white/5 shadow-sm relative z-10`}>
        <Icon className={`w-5 h-5 ${isInput ? 'text-sky-400' : 'text-blue-400'}`} />
      </div>
      
      <div className="font-extrabold text-[11px] uppercase tracking-wide text-white leading-tight relative z-10 drop-shadow-sm">
        {label}
      </div>
      
      {/* Connector dots */}
      <div className={`absolute top-1/2 -mt-1.5 w-3 h-3 rounded-full bg-[#0a192f] flex items-center justify-center z-10 ${isInput ? '-right-1.5' : '-left-1.5'}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${isInput ? 'bg-sky-500 animate-pulse' : 'bg-blue-600'}`} />
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <div className="relative h-[100dvh] bg-[#0B1121] overflow-hidden flex flex-col font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[150px] rounded-[100%] pointer-events-none" />
      
      {/* Floating particles background layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/20 blur-[2px]"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
      
      {/* Minimized Navbar spacing to push content up */}
      <div className="h-14 xl:h-16 shrink-0 relative z-50">
        <Navbar />
      </div>

      {/* Extreme compression flex setup: use stacked layout with precise margin tracking */}
      <main className="flex-1 flex flex-col items-center relative z-10 pt-10 pb-6 w-full">
        
        {/* Compressed Header Wrapper */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto px-6 relative z-30 flex flex-col items-center shrink-0 w-full"
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-3xl md:text-[3.25rem] font-extrabold tracking-tight mb-3 leading-tight scale-90 md:scale-100 drop-shadow-xl"
          >
            <span className="text-white">AI Automation สำหรับ </span><br className="hidden md:block"/>
            <span className="text-white">
              ธุรกิจที่ต้องการผลลัพธ์จริง
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-slate-300 text-sm md:text-base max-w-xl font-medium tracking-wide mb-6">
            เปลี่ยนทุกการโต้ตอบกับลูกค้าเป็นรายได้อัตโนมัติด้วย AI Agents ระดับองค์กร
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-0 scale-90 md:scale-100 origin-top">
            <button className="px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] backdrop-blur-md">
              ขอรับ Demo ระดับองค์กร
            </button>
            <button className="px-7 py-3 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-medium rounded-lg transition-colors border border-slate-700/50 backdrop-blur-md">
              ดูตัวอย่างระบบ
            </button>
          </motion.div>
        </motion.div>

        {/* Scaled Pipeline Container - using exact CSS scaling to compress vertical height seamlessly */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="hidden xl:flex relative w-[1200px] h-[720px] scale-[0.65] 2xl:scale-[0.75] origin-center -mt-[140px] -mb-[100px] shrink-0 items-center justify-center"
        >
          <AnimatedConnectionLines />

          {/* Left Triggers */}
          <div className="absolute left-[80px] top-[90px] text-[12px] font-extrabold text-slate-500 tracking-[0.2em] uppercase">
            จุดเริ่มต้น (TRIGGERS)
          </div>
          {TRIGGERS.map((node) => (
            <div key={node.id} className={`absolute z-20 ${node.pos}`}>
              <FlowNode label={node.label} icon={node.icon} type="input" />
            </div>
          ))}

          {/* Right Outcomes */}
          <div className="absolute right-[80px] top-[90px] text-[12px] font-extrabold text-slate-500 tracking-[0.2em] uppercase">
            การทำงาน (ACTIONS)
          </div>
          {OUTCOMES.map((node) => (
            <div key={node.id} className={`absolute z-20 ${node.pos}`}>
              <FlowNode label={node.label} icon={node.icon} type="output" />
            </div>
          ))}

          {/* Core Central Node */}
          <div className="absolute left-[440px] top-[200px] z-30">
            <CoreCard />
          </div>
        </motion.div>

        {/* Mobile View Placeholder for Flow Layer */}
        <div className="xl:hidden w-full max-w-lg px-6 my-8 flex flex-col items-center">
          <CoreCard />
        </div>

        {/* Repositioned Compact Business Results Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative z-40 w-full max-w-5xl px-4 sm:px-6 mx-auto shrink-0 pb-2"
        >
          <div className="glass-panel py-3.5 px-8 rounded-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            {RESULTS.map((res, i) => (
              <div key={i} className="flex items-center justify-center flex-1 border-white/10 last:border-0 w-full md:w-auto gap-3 md:border-r">
                <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {res.value}
                </span>
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest text-left leading-tight drop-shadow-sm">
                  {res.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
}
