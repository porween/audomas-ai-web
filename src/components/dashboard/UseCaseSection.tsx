"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PenTool, Megaphone, Users, Camera, FileText, Sparkles } from "lucide-react";

export function UseCaseSection() {
  const useCases = useMemo(() => [
    {
      title: "สร้างคอนเทนต์",
      description: "สร้างโพสต์ บทความ และโปรโมชันอัตโนมัติ",
      icon: <PenTool className="w-5 h-5 text-purple-400" />,
      glowColor: "rgba(168, 85, 247, 0.4)",
      borderHover: "hover:border-purple-500/50",
      bgHover: "hover:bg-purple-500/10",
    },
    {
      title: "การตลาดอัตโนมัติ",
      description: "วางแผนแคมเปญ วิเคราะห์ และปรับปรุงโฆษณา",
      icon: <Megaphone className="w-5 h-5 text-rose-400" />,
      glowColor: "rgba(244, 63, 94, 0.4)",
      borderHover: "hover:border-rose-500/50",
      bgHover: "hover:bg-rose-500/10",
    },
    {
      title: "วิเคราะห์พฤติกรรมลูกค้า",
      description: "วิเคราะห์ข้อมูลจาก POS และกล้องวงจรปิด",
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      glowColor: "rgba(16, 185, 129, 0.4)",
      borderHover: "hover:border-emerald-500/50",
      bgHover: "hover:bg-emerald-500/10",
    },
    {
      title: "AI วิเคราะห์ภาพ",
      description: "ตรวจจับสิ่งผิดปกติและแจ้งเตือนทันที",
      icon: <Camera className="w-5 h-5 text-sky-400" />,
      glowColor: "rgba(14, 165, 233, 0.4)",
      borderHover: "hover:border-sky-500/50",
      bgHover: "hover:bg-sky-500/10",
      badge: "ACTIVE",
      badgeColor: "text-sky-300 bg-sky-500/20 border-sky-500/30",
    },
    {
      title: "สร้างรายงานอัตโนมัติ",
      description: "สรุปข้อมูลและส่งผ่าน LINE/Email อัตโนมัติ",
      icon: <FileText className="w-5 h-5 text-blue-400" />,
      glowColor: "rgba(59, 130, 246, 0.4)",
      borderHover: "hover:border-blue-500/50",
      bgHover: "hover:bg-blue-500/10",
    }
  ], []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <section className="w-full relative z-10 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 px-1 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 mb-1">
            <Sparkles className="text-blue-400 w-5 h-5 md:w-6 md:h-6" /> เคสการใช้งาน AI ยอดนิยม
          </h2>
          <p className="text-blue-100/70 text-xs md:text-sm font-medium">เทมเพลตพร้อมใช้งานสำหรับทุกขั้นตอนของธุรกิจคุณ</p>
        </div>
        <button className="text-xs md:text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 group px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 backdrop-blur-md">
          ดูเทมเพลตทั้งหมด <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {useCases.map((useCase, i) => (
          <motion.div 
            variants={itemVariants}
            key={i} 
            whileHover={{ y: -5 }}
            className={`group flex flex-col bg-[#0f172a]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-5 cursor-pointer transition-all duration-300 overflow-hidden relative shadow-lg ${useCase.borderHover} ${useCase.bgHover}`}
          >
            {/* Hover Glow Effect */}
            <div 
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: useCase.glowColor }}
            />

            {/* Top row with Icon and Badge */}
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {useCase.icon}
              </div>
              
              {useCase.badge && (
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border tracking-widest ${useCase.badgeColor} flex items-center gap-1.5`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  {useCase.badge}
                </span>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 relative z-10">
              <h3 className="text-[14px] font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                {useCase.title}
              </h3>
              <p className="text-[12px] text-slate-400 font-medium leading-relaxed mb-5 group-hover:text-slate-300 transition-colors">
                {useCase.description}
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 group-hover:text-white transition-colors relative z-10 uppercase tracking-wider">
              ใช้งาน Agent <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            
            {/* Animated Bottom Border */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-all duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
