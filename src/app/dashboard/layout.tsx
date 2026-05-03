import { Sidebar } from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans relative selection:bg-blue-500/30 lg:grid lg:grid-cols-12">
      <div className="hidden lg:block lg:col-span-2 h-full z-20 shadow-sm">
        <Sidebar />
      </div>
      <div className="lg:col-span-10 flex flex-col overflow-hidden relative h-full">
        <main className="flex-1 overflow-y-auto w-full scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}
