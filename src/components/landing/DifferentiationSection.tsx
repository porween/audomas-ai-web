"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, ShieldCheck, Activity } from "lucide-react";

export function DifferentiationSection() {
  const features = [
    {
      title: "ควบคุมโดยมนุษย์ 100%",
      description: "อนุมัติ หยุด หรือปรับเปลี่ยนการทำงานของ AI ได้ก่อนลงมือจริง คุณคือผู้ควบคุมเสมอ",
      icon: <SlidersHorizontal className="w-6 h-6 text-indigo-400" />,
      glow: "rgba(99, 102, 241, 0.15)",
      borderHover: "group-hover:border-indigo-500/50",
    },
    {
      title: "ตรวจสอบได้ทุกขั้นตอน",
      description: "บันทึกทุกการตัดสินใจและการเข้าถึงข้อมูล ดูย้อนหลังได้เสมอเพื่อให้รู้ว่า AI ทำอะไรและทำไปทำไม",
      icon: <Activity className="w-6 h-6 text-sky-400" />,
      glow: "rgba(14, 165, 233, 0.15)",
      borderHover: "group-hover:border-sky-500/50",
    },
    {
      title: "ความปลอดภัยและข้อมูลส่วนตัว",
      description: "ข้อมูลธุรกิจของคุณจะไม่ถูกนำไปใช้ฝึกโมเดลสาธารณะ ระบบถูกแยกส่วนอย่างเข้มงวดเพื่อปกป้องความลับของคุณ",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      glow: "rgba(16, 185, 129, 0.15)",
      borderHover: "group-hover:border-emerald-500/50",
    }
  ];

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
            AI ที่สร้างมาเพื่อ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">มาตรฐานองค์กร</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            ต่างจาก AI ทั่วไป Audomas ถูกออกแบบมาเพื่อการทำงานของธุรกิจโดยเฉพาะ พร้อมการควบคุม ความโปร่งใส และความปลอดภัยที่เหนือกว่า
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative"
            >
              <div 
                className={`absolute inset-0 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 blur-xl`}
                style={{ backgroundColor: feature.glow }}
              />
              
              <div className={`relative h-full glass-panel bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-colors duration-300 ${feature.borderHover}`}>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
