"use client";

import { TrendingUp, TrendingDown, Users, ShieldAlert, BarChart3, ArrowRight } from "lucide-react";

export function QuickActionPanel() {
  const outcomes = [
    { 
      label: "เพิ่มยอดขาย", 
      result: "วิเคราะห์ลูกค้า + แนะนำสินค้าอัตโนมัติ",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      hover: "hover:border-emerald-300"
    },
    { 
      label: "ลดต้นทุน", 
      result: "ลดงาน manual ด้วย automation",
      icon: <TrendingDown className="w-6 h-6" />,
      color: "text-rose-600",
      bg: "bg-rose-50",
      hover: "hover:border-rose-300"
    },
    { 
      label: "เข้าใจลูกค้า", 
      result: "วิเคราะห์ behavior จาก data + กล้อง",
      icon: <Users className="w-6 h-6" />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      hover: "hover:border-indigo-300"
    },
    { 
      label: "ป้องกันปัญหา", 
      result: "แจ้งเตือน real-time จาก AI Vision / IoT",
      icon: <ShieldAlert className="w-6 h-6" />,
      color: "text-amber-600",
      bg: "bg-amber-50",
      hover: "hover:border-amber-300"
    },
    { 
      label: "สร้างรายงาน", 
      result: "สรุปข้อมูลอัตโนมัติทุกวัน",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-blue-600",
      bg: "bg-blue-50",
      hover: "hover:border-blue-300"
    },
  ];

  return (
    <div className="mb-14">
      <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 px-1">
        เริ่มต้นเร็วด้วย AI ที่ให้ผลลัพธ์จริง
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {outcomes.map((outcome, i) => (
          <button 
            key={i}
            className={`group flex flex-col items-start bg-white rounded-[20px] border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] ${outcome.hover}`}
          >
            <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center mb-4 transition-colors ${outcome.bg} ${outcome.color}`}>
              {outcome.icon}
            </div>
            <span className="text-lg font-bold text-slate-900 mb-2">
              {outcome.label}
            </span>
            <span className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6 flex-1">
              {outcome.result}
            </span>

            <div className="flex items-center gap-1.5 text-[13px] font-bold text-indigo-600 mt-auto">
              เริ่มใช้งาน <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
