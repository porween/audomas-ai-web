import { XCircle, CheckCircle2 } from "lucide-react";

export function BeforeAfterSection() {
  const beforePoints = [
    "Slow response times (hours or days)",
    "Missed leads outside working hours",
    "Manual, time-consuming follow-ups",
    "No structured data tracking or audit"
  ];

  const afterPoints = [
    "Instant replies (under 2 seconds)",
    "AI closes deals 24/7 without sleep",
    "Automatic, intelligent follow-up sequences",
    "Full audit logs & secure backup (AirGapX)"
  ];

  return (
    <section className="py-24 bg-[#050B1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stop losing sales. Let AI handle it.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">Compare your current manual process with an automated AI Sales Agent.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <div className="bg-slate-900/50 border border-red-500/20 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Before</h3>
            </div>
            
            <ul className="space-y-5">
              {beforePoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500/70 mt-0.5 shrink-0" />
                  <span className="text-slate-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-blue-900/10 border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.1)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 blur-[80px] rounded-full"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/40 shadow-inner">
                <CheckCircle2 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">With Audomas AI</h3>
            </div>
            
            <ul className="space-y-5 relative z-10">
              {afterPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-white font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
