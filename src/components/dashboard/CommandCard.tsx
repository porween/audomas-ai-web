"use client";

import { Send, Pencil, LineChart, ShieldAlert, Boxes, Thermometer } from "lucide-react";
import { useState } from "react";

export function CommandCard() {
  const [query, setQuery] = useState("");

  const examples = [
    { label: "สร้างโพสต์สินค้าใหม่", icon: <Pencil className="w-3.5 h-3.5" /> },
    { label: "วิเคราะห์ลูกค้าจากกล้อง", icon: <LineChart className="w-3.5 h-3.5" /> },
    { label: "สรุปรายงานยอดขายรายวัน", icon: <Boxes className="w-3.5 h-3.5" /> },
    { label: "ตรวจสอบสต็อกสินค้า", icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { label: "ตั้งค่าแจ้งเตือนอุณหภูมิ", icon: <Thermometer className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-10 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-bold text-slate-800">สั่งงาน AI ได้ทันที</h2>
        <span className="text-xs text-purple-500 font-medium bg-purple-50 px-2 py-0.5 rounded-full">
          พิมพ์หรือเลือกตัวอย่าง
        </span>
      </div>

      <div className="relative mb-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="เช่น สร้างโพสต์โปรโมชันสินค้า, วิเคราะห์พฤติกรรมลูกค้าจากกล้อง, สรุปรายงานยอดขาย..."
          className="w-full text-slate-800 bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-5 pr-16 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all font-medium placeholder:text-slate-400/80 shadow-inner"
        />
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
          disabled={!query}
        >
          <Send className="w-5 h-5 ml-1" />
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 mb-2.5">ตัวอย่างคำสั่ง</p>
        <div className="flex flex-wrap gap-2">
          {examples.map((ex, i) => (
            <button 
              key={i}
              onClick={() => setQuery(ex.label)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:text-purple-700 hover:border-purple-300 hover:bg-purple-50 transition-colors bg-white group"
            >
              <span className="text-purple-500 group-hover:text-purple-600">
                {ex.icon}
              </span>
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
