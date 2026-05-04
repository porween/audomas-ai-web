import { Bot, MessageSquareOff, BrainCircuit, CheckCircle2, TrendingUp, X } from "lucide-react";
import { useTranslations } from "next-intl";

export function ChatbotVsAiSection() {
  const t = useTranslations('ChatbotVsAi');

  return (
    <section className="py-24 lg:py-32 bg-transparent border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-cyan-500/10 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Chatbot Side */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8 relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-700/50"></div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                <Bot className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300">{t('bot_title')}</h3>
            </div>
            
            <ul className="space-y-5 mb-8">
              <li className="flex items-start gap-3">
                <MessageSquareOff className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
                <span className="text-slate-400">{t('bot_1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500/70 mt-0.5 shrink-0" />
                <span className="text-slate-400">{t('bot_2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500/70 mt-0.5 shrink-0" />
                <span className="text-slate-400">{t('bot_3')}</span>
              </li>
            </ul>
            <div className="pt-6 border-t border-slate-800">
              <p className="text-slate-500 font-bold">{t('summary_bot')}</p>
            </div>
          </div>

          {/* AI Side */}
          <div className="bg-blue-900/10 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(6,182,212,0.25)] transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('ai_title')}</h3>
            </div>
            
            <ul className="space-y-5 mb-8 relative z-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-slate-200 font-medium">{t('ai_1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-slate-200 font-medium">{t('ai_2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-slate-200 font-medium">{t('ai_3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                <span className="text-white font-bold">{t('ai_4')}</span>
              </li>
            </ul>
            <div className="pt-6 border-t border-slate-700/50 relative z-10">
              <p className="text-blue-400 font-bold text-lg">{t('summary_ai')}</p>
            </div>
          </div>
        </div>

        {/* Killer Line */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="inline-block bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4 backdrop-blur-xl shadow-[0_0_30px_rgba(239,68,68,0.1)] hover:-translate-y-1 transition-transform duration-300">
            <p className="text-red-400 text-lg md:text-xl font-bold">
              {t('killer_line')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
