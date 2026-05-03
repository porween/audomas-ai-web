"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

export function PricingSection() {
  const tiers = [
    {
      name: "SME",
      price: "฿2,900",
      period: "/month",
      desc: "Perfect for small teams starting with AI automation.",
      features: ["Up to 5 AI Agents", "Standard integrations", "1,000 tasks/month", "Email support"],
      button: "Start Free Trial",
      popular: false,
    },
    {
      name: "Business",
      price: "฿9,900",
      period: "/month",
      desc: "Full power of AI execution for growing companies.",
      features: ["Unlimited AI Agents", "Premium CRM integrations", "10,000 tasks/month", "Priority 24/7 support", "Custom workflows"],
      button: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "AirGapX and maximum security for large organizations.",
      features: ["On-premise deployment", "AirGapX Offline Vault", "Unlimited tasks", "Dedicated success manager", "Custom AI model tuning"],
      button: "Contact Sales",
      popular: false,
    }
  ];

  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Scale your business with AI that pays for itself. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 ${tier.popular ? 'bg-gradient-to-b from-blue-900/50 to-[#0f172a] border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.15)] md:-translate-y-4 md:hover:-translate-y-6' : 'bg-[#0f172a]/50 border-white/10 hover:border-white/20'} border backdrop-blur-xl transition-all duration-300`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-sky-400 rounded-full text-[11px] font-extrabold text-white uppercase tracking-widest flex items-center gap-1 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" /> Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-sm text-slate-400 font-medium mb-6 min-h-[40px]">{tier.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-slate-500 font-medium">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                    <Check className={`w-5 h-5 shrink-0 ${tier.popular ? 'text-blue-400' : 'text-emerald-400'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3.5 rounded-xl font-bold transition-all ${tier.popular ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg hover:shadow-blue-500/25' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                {tier.button}
              </button>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
