import { CarFront, ShieldPlus, Stethoscope, ShoppingBag } from "lucide-react";

export function SalesUseCaseSection() {
  const industries = [
    {
      icon: <CarFront className="w-6 h-6 text-slate-300" />,
      title: "Used Car Dealerships",
      desc: "Qualify buyers, schedule test drives, and answer finance questions instantly."
    },
    {
      icon: <ShieldPlus className="w-6 h-6 text-slate-300" />,
      title: "Insurance Agents",
      desc: "Compare plans, collect preliminary information, and set up consultations."
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-slate-300" />,
      title: "Clinics & Wellness",
      desc: "Book appointments, answer service pricing, and send pre-visit instructions."
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-slate-300" />,
      title: "E-commerce Stores",
      desc: "Recommend products, handle order tracking, and close sales in DMs."
    }
  ];

  return (
    <section className="py-24 bg-[#020617] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-white mb-4">Perfect for:</h2>
            <p className="text-slate-400 mb-8">
              Audomas AI Sales Agent adapts to your specific industry terminology and sales flow. It learns your products and sells them exactly how your top performer would.
            </p>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {industries.map((ind, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    {ind.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{ind.title}</h3>
                    <p className="text-slate-400 text-sm">{ind.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
