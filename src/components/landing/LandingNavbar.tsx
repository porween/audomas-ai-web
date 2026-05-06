"use client";

import { AudomasLogo } from "@/components/ui/AudomasLogo";
import { useState, useRef, useEffect } from "react";
import { Menu, X, Play, Zap, ArrowRight, ChevronDown, BarChart3, Users, Clock, ShieldAlert, HeartPulse, Search, Eye } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visionDropdownOpen, setVisionDropdownOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: 'en' | 'th') => {
    router.replace(pathname, { locale: newLocale });
  };
  
  const navLinks = [
    { name: t('Navbar.ai_sales'), href: "#ai-sales" },
    { name: t('Navbar.ai_vision'), href: "#ai-vision", hasDropdown: true },
    { name: t('Navbar.how_it_works'), href: "#how-it-works" },
    { name: t('Navbar.solutions'), href: "#solutions" },
    { name: t('Navbar.pricing'), href: "#pricing" },
    { name: t('Navbar.security'), href: "/security" },
  ];

  const visionSolutions = [
    { name: "Retail Analytics", icon: BarChart3, href: "#ai-vision" },
    { name: "People Counting", icon: Users, href: "#ai-vision" },
    { name: "Queue Monitoring", icon: Clock, href: "#ai-vision" },
    { name: "Intrusion / Perimeter Alert", icon: ShieldAlert, href: "#ai-vision" },
    { name: "Factory Safety Monitoring", icon: HeartPulse, href: "#ai-vision" },
    { name: "Smart Search / Event Search", icon: Search, href: "#ai-vision" },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setVisionDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-[15px] border-b border-white/[0.08] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          
          {/* Left: Logo */}
          <Link 
            href="/" 
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              setIsOpen(false);
            }}
            className="flex items-center gap-2.5 group shrink-0 transition-transform duration-500 hover:scale-[1.5] origin-left"
          >
            <div className="relative">
              <AudomasLogo size={38} animated={true} />
              <div className="absolute inset-0 rounded-full blur-[15px] bg-blue-400/0 group-hover:bg-blue-400/40 transition-all duration-700 scale-150" />
            </div>
            <div className="flex flex-col">
              <span
                className="select-none text-xl font-bold tracking-tight text-sky-300 leading-none"
                style={{ filter: "drop-shadow(0 0 10px rgba(56, 189, 248, 0.2))" }}
              >
                Audomas
              </span>
              <span className="select-none text-[8px] font-semibold uppercase tracking-widest text-slate-500 mt-0.5">
                An Audomas Company
              </span>
            </div>
          </Link>

          {/* Center: Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative h-full flex items-center"
                onMouseEnter={() => link.hasDropdown && setVisionDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setVisionDropdownOpen(false)}
              >
                <Link 
                  href={link.href} 
                  className={`text-[13px] font-semibold flex items-center gap-1.5 transition-colors tracking-wide ${visionDropdownOpen && link.hasDropdown ? "text-white" : "text-slate-400 hover:text-white"}`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${visionDropdownOpen ? "rotate-180" : ""}`} />}
                </Link>

                {/* AI Vision Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {visionDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[280px] pt-4 pointer-events-auto"
                      >
                        <div className="bg-[#0b1220] border border-white/10 rounded-2xl shadow-2xl p-2.5 overflow-hidden ring-1 ring-white/5">
                           {visionSolutions.map((sol) => (
                             <Link
                               key={sol.name}
                               href={sol.href}
                               onClick={() => setVisionDropdownOpen(false)}
                               className="flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-white/5 group transition-all"
                             >
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                                   <sol.icon className="w-4 h-4 text-blue-400" />
                                </div>
                                <span className="text-[12px] font-bold text-slate-300 group-hover:text-white transition-colors">{sol.name}</span>
                             </Link>
                           ))}
                           <div className="mt-1 p-2 border-t border-white/5">
                              <Link 
                                href="#ai-vision" 
                                className="flex items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors group"
                              >
                                {t('Hero.cta_demo')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </Link>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="#ir" className="text-[12px] font-semibold text-slate-400 hover:text-white transition-colors">
              IR
            </Link>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-slate-500 mx-2">
              <button onClick={() => handleLanguageChange('th')} className={locale === 'th' ? 'text-white' : 'hover:text-slate-300 transition-colors'}>TH</button>
              <span>|</span>
              <button onClick={() => handleLanguageChange('en')} className={locale === 'en' ? 'text-white' : 'hover:text-slate-300 transition-colors'}>EN</button>
            </div>
            <Link
              href="/dashboard"
              className="text-[13px] font-bold text-slate-400 hover:text-white transition-colors px-2"
            >
              {t('Navbar.login')}
            </Link>
            <Link href="#demo" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#06C755] px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-[#05b34c] shadow-[0_0_15px_rgba(6,199,85,0.4)] hover:shadow-[0_0_25px_rgba(6,199,85,0.6)]">
              Book a Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
             <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10 md:hidden">
              <button 
                onClick={() => handleLanguageChange('th')}
                className={`px-2 py-0.5 text-[9px] font-bold rounded-full transition-all ${locale === 'th' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                TH
              </button>
              <button 
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-0.5 text-[9px] font-bold rounded-full transition-all ${locale === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
            </div>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0F172A] border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-8 space-y-1 flex flex-col">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-slate-400 hover:text-blue-400 transition-colors py-3 text-sm font-semibold border-b border-white/5 flex items-center justify-between group"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
              
              <div className="pt-6 space-y-4">
                <Link
                  href="/dashboard"
                  className="w-full py-3.5 text-sm font-bold text-slate-300 rounded-xl flex items-center justify-center border border-slate-700 bg-slate-800/50"
                  onClick={() => setIsOpen(false)}
                >
                  {t('Navbar.login')}
                </Link>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="#live-demo"
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 py-3.5 text-sm font-bold text-slate-200 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.35)]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Play className="w-4 h-4 text-blue-400" />
                    {t('Navbar.see_demo')}
                  </Link>
                  <Link
                    href="#pricing"
                    className="btn-audomas-primary py-3.5 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <Zap className="w-4 h-4" />
                    {t('Navbar.try_free')}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
