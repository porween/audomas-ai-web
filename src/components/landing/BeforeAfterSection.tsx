import { XCircle, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function BeforeAfterSection() {
  const t = useTranslations('BeforeAfter');

  const beforePoints = [
    t('before_1'),
    t('before_2'),
    t('before_3'),
    t('before_4')
  ];

  const afterPoints = [
    t('after_1'),
    t('after_2'),
    t('after_3'),
    t('after_4')
  ];

  return (
    <section className="py-24 lg:py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('before_title')}</h3>
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
          <div className="bg-blue-900/20 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden shadow-[0_10px_40px_rgba(37,99,235,0.15)] hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 blur-[80px] rounded-full"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/40 shadow-inner">
                <CheckCircle2 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('after_title')}</h3>
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
