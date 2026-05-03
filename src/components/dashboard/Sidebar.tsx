"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Workflow, 
  MessageSquare, 
  Blocks, 
  Eye, 
  PieChart, 
  Settings
} from "lucide-react";
import { AudomasLogo } from "@/components/ui/AudomasLogo";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Workflows', icon: Workflow, href: '/dashboard/workflows' },
    { name: 'AI Chat', icon: MessageSquare, href: '/dashboard/chat' },
    { name: 'Integrations', icon: Blocks, href: '/dashboard/integrations' },
    { name: 'AI Vision / IoT', icon: Eye, href: '/dashboard/vision' },
    { name: 'Reports', icon: PieChart, href: '/dashboard/reports' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  return (
    <aside className="w-full bg-white border-r border-slate-200 hidden md:flex flex-col z-20 shrink-0 h-full">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <AudomasLogo size={36} animated={true} />
        <span className="font-bold text-xl tracking-wide bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Audomas</span>
      </div>
      
      <nav className="flex-1 p-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
