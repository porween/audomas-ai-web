"use client";

import { Camera, Radio, Users, Crosshair } from "lucide-react";

export function AiVisionCard() {
  return (
    <div className="mb-14">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
          <Camera className="w-4 h-4 text-rose-500" />
          AI Vision Live
        </h2>
        <div className="flex items-center gap-2 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Live Stream</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Fake Camera Preview */}
        <div className="md:col-span-2 relative bg-slate-900 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200 aspect-video md:aspect-[21/9]">
          {/* Simulated Image background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-luminosity" />
          
          {/* Glassmorphic Overlay for Text */}
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col gap-2 z-20">
            <div className="flex items-center gap-2 text-white">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold tracking-wide">Live: 12 คนในร้าน</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Crosshair className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-semibold">Hot zone: Counter</span>
            </div>
          </div>

          {/* Simulated Bounding Boxes */}
          <div className="absolute top-[30%] left-[45%] w-16 h-32 border-2 border-cyan-400 rounded-sm z-10 hidden md:block">
            <div className="absolute -top-5 left-[-2px] bg-cyan-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
              Customer: 92%
            </div>
          </div>
          <div className="absolute top-[40%] right-[30%] w-20 h-40 border-2 border-cyan-400/60 rounded-sm z-10 hidden md:block">
            <div className="absolute -top-5 left-[-2px] bg-cyan-400/60 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
              Customer: 85%
            </div>
          </div>
          <div className="absolute bottom-[20%] left-[20%] w-24 h-24 border-2 border-rose-500 rounded-sm z-10 bg-rose-500/10">
            <div className="absolute -top-5 left-[-2px] bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1">
              <Radio className="w-2 h-2 animate-pulse" /> Anomalous Behavior
            </div>
          </div>

          {/* Corner Decals */}
          <div className="absolute top-4 right-4 text-white/50 text-[10px] font-mono tracking-widest z-20">CAM-01 / REC</div>
          <div className="absolute bottom-4 left-4 text-white/50 text-[10px] font-mono tracking-widest z-20">192.168.1.104</div>
          
          <div className="absolute bottom-0 text-white/20 p-4 font-mono text-[9px] w-full text-center">
             [ AI PROCESSOR: ACTIVE | FPS: 30 | LATENCY: 12ms ]
          </div>
        </div>

        {/* Vision Analytics Panel */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Traffic Analysis</h3>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-3xl font-extrabold text-slate-900">342</span>
              <span className="text-sm font-semibold text-emerald-600 mb-1">+14% วันนี้</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">ลูกค้าเข้าร้านทั้งหมด</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm flex-1 flex flex-col">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Recent Detections</h3>
            
            <div className="space-y-3 flex-1">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-rose-500 shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                <div>
                  <p className="text-sm font-bold text-slate-800">ลูกค้าหยิบสินค้าแต่ไม่ชำระเงิน</p>
                  <p className="text-xs text-slate-500">Zone: Shelf A • 2 นาทีที่แล้ว</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-800">คิวจ่ายเงินยาวกว่าปกติ (5 คิว)</p>
                  <p className="text-xs text-slate-500">Zone: Counter • 15 นาทีที่แล้ว</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 bg-slate-900 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-indigo-600 transition-colors">
              ตั้งค่าการแจ้งเตือน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
