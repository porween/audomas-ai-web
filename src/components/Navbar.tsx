import Link from "next/link";

export function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between px-6 lg:px-12 py-6">
      <div className="flex items-center gap-3">
        <img 
          src="/logo.png" 
          alt="Audomas Icon" 
          className="w-[38px] h-[38px] object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]" 
        />
        <span className="text-[22px] font-extrabold tracking-wide text-white drop-shadow-md">
          AUDOMAS
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <Link href="#" className="hover:text-cyan-400 transition-colors">Platform</Link>
        <Link href="#" className="hover:text-cyan-400 transition-colors">Solutions</Link>
        <Link href="#" className="hover:text-cyan-400 transition-colors">Use Cases</Link>
        <Link href="#" className="hover:text-cyan-400 transition-colors">Security & Audit</Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Login
        </button>
        <button className="px-5 py-2 text-sm font-medium bg-slate-100 text-slate-900 hover:bg-white rounded-full transition-colors">
          Contact Sales
        </button>
      </div>
    </nav>
  );
}
