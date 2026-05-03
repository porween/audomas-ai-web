"use client";

import { CONNECTIONS } from "../../data/mock";
import { Plus } from "lucide-react";

export function ConnectionStatusCard() {
  return (
    <div className="mb-10">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">สถานะการเชื่อมต่อ</h2>
        <button className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors">
          ดูการตั้งค่าทั้งหมด
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {CONNECTIONS.map((conn, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
             <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 shadow-inner border border-slate-100 p-1.5">
                {/* Fallback to initials if image fails or for simplicity, using emoji or styled div */}
                {conn.name.includes("LINE") && <div className="text-emerald-500 font-bold bg-[#06C755] w-full h-full rounded-lg text-white flex items-center justify-center text-[10px]">LINE</div>}
                {conn.name.includes("Instagram") && <div className="w-full h-full rounded-lg bg-gradient-to-tr from-amber-500 to-fuchsia-600 p-[1px]"><div className="w-full h-full bg-white rounded-md flex items-center justify-center"><div className="w-3 h-3 border-2 border-slate-800 rounded-[4px]"></div></div></div>}
                {conn.name.includes("Facebook") && <div className="text-blue-600 font-bold bg-[#1877F2] w-full h-full rounded-full text-white flex items-center justify-center text-[14px]">f</div>}
                {conn.name.includes("n8n") && <div className="text-rose-500 font-bold text-[14px] flex">n<span className="opacity-50">8</span>n</div>}
                {conn.name.includes("Camera") && <span className="text-xl">📹</span>}
                {conn.name.includes("Drive") && <span className="text-xl">🔺</span>}
             </div>
             <div>
               <p className="text-sm font-bold text-slate-800">{conn.name}</p>
               <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 <span className="text-xs text-emerald-600 font-medium">{conn.status === 'connected' ? 'เชื่อมต่อแล้ว' : 'รอการเชื่อมต่อ'}</span>
               </div>
             </div>
          </div>
        ))}
        
        <button className="bg-white border text-center border-dashed border-slate-300 hover:border-purple-400 hover:bg-purple-50 rounded-2xl px-6 py-3 flex flex-col items-center justify-center gap-1 transition-colors text-slate-500 hover:text-purple-600 min-w-[140px]">
          <Plus className="w-5 h-5" />
          <span className="text-xs font-semibold">เพิ่มการเชื่อมต่อ</span>
        </button>
      </div>
    </div>
  );
}
