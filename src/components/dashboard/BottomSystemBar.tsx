"use client";

import { Activity, Server, Cpu, Database, Camera, RefreshCw } from "lucide-react";

export function BottomSystemBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 w-full bg-slate-50 border-t border-slate-200 shadow-sm z-40 px-4 md:px-8 flex items-center justify-between overflow-x-auto text-[11px] text-slate-500 hide-scrollbar">
      <div className="flex items-center gap-6 whitespace-nowrap">
        <StatusItem icon={<Activity className="w-3 h-3" />} label="ระบบทำงานปกติ" ok />
        <div className="w-px h-4 bg-slate-300" />
        <StatusItem icon={<Server className="w-3 h-3" />} label="API Gateway" ok />
        <StatusItem icon={<Cpu className="w-3 h-3" />} label="n8n Engine" ok />
        <StatusItem icon={<Database className="w-3 h-3" />} label="AI Services" ok />
        <StatusItem icon={<Camera className="w-3 h-3" />} label="Camera Server" ok />
      </div>
      
      <div className="flex items-center gap-2 whitespace-nowrap ml-6">
        <span>อัปเดตล่าสุด 10:30 น.</span>
        <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 transition-colors">
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function StatusItem({ icon, label, ok }: { icon: React.ReactNode, label: string, ok: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span>{label}</span>
      <div className={`w-1.5 h-1.5 rounded-full ${ok ? 'bg-emerald-500' : 'bg-rose-500'}`} />
    </div>
  );
}
