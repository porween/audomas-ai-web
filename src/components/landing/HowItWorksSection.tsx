import { MessageCircle, BrainCircuit, Reply, CheckCircle, Database } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-400" />,
      title: "Customer Message",
      desc: "Customer asks a question on LINE or FB."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
      title: "AI Analysis",
      desc: "AI understands intent instantly."
    },
    {
      icon: <Reply className="w-6 h-6 text-indigo-400" />,
      title: "Smart Reply",
      desc: "AI recommends products & prices."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-400" />,
      title: "Close Deal",
      desc: "AI follows up & secures payment."
    },
    {
      icon: <Database className="w-6 h-6 text-slate-400" />,
      title: "Log & Backup",
      desc: "Data synced to CRM & AirGapX."
    }
  ];

  return (
    <section className="py-24 bg-[#020617] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A seamless, automated flow from inquiry to closed sale.</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-800 z-0">
             <div className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 w-full animate-[pulse_3s_ease-in-out_infinite]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 shadow-lg relative group-hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute inset-0 bg-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {step.icon}
                  <div className="absolute -bottom-3 bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 w-6 h-6 rounded-full flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
