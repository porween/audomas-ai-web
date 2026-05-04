"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";

export function StatusPanel() {
  const t = useTranslations('Hero'); // Using Hero namespace for general status labels if available
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: 'en' | 'th') => {
    router.replace(pathname, { locale: newLocale });
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-panel w-72 rounded-xl p-5 shadow-2xl flex flex-col space-y-3 font-mono text-[11px]"
    >
      <div className="text-slate-200 font-bold mb-1 tracking-widest text-xs">GLOBAL STATUS</div>
      
      <div className="flex items-center justify-between">
        <span className="text-slate-400 uppercase tracking-wider">Network Status:</span>
        <span className="text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">SECURE</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-slate-400 uppercase tracking-wider">Airgap Status:</span>
        <span className="text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">ACTIVE</span>
      </div>

      <div className="pt-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 uppercase tracking-wider">AI Squad Utilization:</span>
          <span className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">78%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-[inset_0_0_5px_rgba(0,0,0,0.5)] border border-slate-700">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-3">
        <button 
          onClick={() => handleLanguageChange('th')}
          className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${locale === 'th' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          TH
        </button>
        <button 
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${locale === 'en' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          EN
        </button>
      </div>
    </motion.div>
  );
}
