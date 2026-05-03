"use client";

import { motion } from "framer-motion";
import { Lock, FileKey, Server, Shield } from "lucide-react";

export function SecurityComplianceSection() {
  const complianceItems = [
    { title: "รองรับ PDPA", desc: "ออกแบบมาให้สอดคล้องกับกฎหมายคุ้มครองข้อมูลส่วนบุคคลของไทย", icon: <FileKey className="w-5 h-5 text-slate-300" /> },
    { title: "SOC 2 Type II", desc: "มาตรฐานความปลอดภัยระดับองค์กรสากล", icon: <Lock className="w-5 h-5 text-slate-300" /> },
    { title: "ISO 27001", desc: "ระบบบริหารจัดการความมั่นคงปลอดภัยสารสนเทศ", icon: <Shield className="w-5 h-5 text-slate-300" /> },
    { title: "จัดเก็บข้อมูลในไทย", desc: "เลือกจัดเก็บข้อมูลและประมวลผลภายในประเทศได้", icon: <Server className="w-5 h-5 text-slate-300" /> },
  ];

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-transparent to-[#050b1a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-bold text-slate-300 uppercase tracking-widest mb-6">
              <Shield className="w-3.5 h-3.5" /> ปลอดภัยเป็นอันดับแรก
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              ความปลอดภัยระดับธนาคาร <br className="hidden lg:block"/> เพื่อข้อมูลธุรกิจของคุณ
            </h2>
            <p className="text-slate-400 font-medium text-lg max-w-xl mx-auto lg:mx-0">
              ข้อมูลของคุณจะถูกเข้ารหัสทั้งขณะจัดเก็บและส่งผ่านระบบ เราปฏิบัติตามมาตรฐานสากลอย่างเคร่งครัด เพื่อให้คุณใช้งาน AI ได้อย่างอุ่นใจ
            </p>
          </div>

          {/* Right Badges */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {complianceItems.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:bg-slate-800/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
