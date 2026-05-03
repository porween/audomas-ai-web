import { CalendarCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SalesFinalCtaSection() {
  return (
    <section className="py-24 bg-[#050B1A] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Let AI start working for you today
        </h2>
        
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Stop missing out on leads. Deploy your Audomas AI Sales Agent and watch your conversion rates and revenue grow.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1"
          >
            <CalendarCheck className="w-5 h-5" />
            Book Demo / See Real Use Case
          </Link>
          <Link 
            href="#live-demo"
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-slate-800 text-white border border-slate-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors"
          >
            Try Demo Again
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
