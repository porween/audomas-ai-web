"use client";

import { motion } from "framer-motion";
import { Server, Database, ShieldAlert, Cpu } from "lucide-react";

export function AirGapXSection() {
  return (
    <section className="relative w-full py-24 bg-[#020617] overflow-hidden flex flex-col items-center justify-center border-y border-emerald-900/30">
      {/* Background Vault Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          {/* Visual Vault Diagram */}
          <div className="w-full md:w-1/2 flex justify-center relative">
            <div className="relative w-72 h-72">
              {/* Outer Rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="absolute inset-0 border border-emerald-500/20 rounded-full border-dashed"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute inset-4 border border-emerald-500/10 rounded-full"
              />
              
              {/* Core Vault */}
              <div className="absolute inset-8 rounded-full bg-[#061f14] border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex items-center justify-center">
                <div className="text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2 relative">
                    <Server className="w-8 h-8 text-emerald-400 relative z-10" />
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-emerald-400"
                      animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <span className="text-emerald-400 font-black tracking-widest text-sm uppercase">AirGapX</span>
                  <span className="text-[10px] text-emerald-500/70 font-bold uppercase tracking-widest mt-1">Vault ทำงานปกติ</span>
                </div>
              </div>

              {/* Floating nodes */}
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-4 -left-4 w-12 h-12 bg-[#020617] border border-emerald-500/30 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 text-emerald-500" />
              </motion.div>
              <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#020617] border border-emerald-500/30 rounded-xl flex items-center justify-center">
                <Cpu className="w-5 h-5 text-emerald-500" />
              </motion.div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 mb-6">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
               <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase">ฟีเจอร์ระดับองค์กร</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-5 drop-shadow-md">
              แยกส่วนอย่างสมบูรณ์ด้วย <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">AirGapX</span>
            </h2>
            
            <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">
              สำหรับอุตสาหกรรมที่ต้องการความปลอดภัยสูงสุด ติดตั้ง Audomas AI ในระบบออฟไลน์แบบ 100% หรือบนเซิร์ฟเวอร์ On-Premise ของคุณเอง ไม่ต้องใช้อินเทอร์เน็ต ข้อมูลไม่รั่วไหล
            </p>

            <ul className="space-y-4">
              {[
                "ทำงานแบบออฟไลน์ 100%",
                "ติดตั้งบนเซิร์ฟเวอร์ On-Premise",
                "ปราศจากความเสี่ยงข้อมูลรั่วไหล"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-slate-300 font-bold text-sm tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
