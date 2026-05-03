import { ShieldAlert, Server, HardDrive, FileCheck } from "lucide-react";

export function EnterpriseTrustSection() {
  const features = [
    {
      icon: <FileCheck className="w-8 h-8 text-blue-400" />,
      title: "Full Audit Logs",
      desc: "Every AI decision, recommendation, and chat is logged immutably for compliance and quality control."
    },
    {
      icon: <Server className="w-8 h-8 text-blue-400" />,
      title: "Flexible Deployment",
      desc: "Deploy on-cloud, on-premise, or hybrid. You maintain absolute control over your infrastructure."
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-blue-400" />,
      title: "PDPA & Privacy Ready",
      desc: "Built from the ground up to handle customer data securely, complying with strict local privacy laws."
    },
    {
      icon: <HardDrive className="w-8 h-8 text-blue-400" />,
      title: "AirGapX Offline Backup",
      desc: "Automated LTO-based cold storage backups ensure your sales data is safe from ransomware and outages."
    }
  ];

  return (
    <section className="py-24 bg-[#050B1A] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Built for serious businesses</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Enterprise-grade security, control, and reliability. We don't just automate; we protect.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:bg-slate-800/80 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-blue-900/20 flex items-center justify-center border border-blue-500/20 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
