import { MessageSquare, Play, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function SalesAgentHeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#020617] to-[#020617] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              New: LINE & Facebook Integrations
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              AI Sales Agent that closes deals for you <span className="text-blue-500">24/7</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Automatically reply to customers on LINE and Facebook, qualify leads, recommend products, and close sales — without hiring more staff.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8">
              <Link 
                href="#live-demo"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                <Play className="w-5 h-5 fill-current" />
                See AI in Action (Live Demo)
              </Link>
              <Link 
                href="#demo"
                className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <MessageSquare className="w-5 h-5" />
                Try chatting with AI now
              </Link>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-400 font-medium">
              <ShieldCheck className="w-5 h-5 text-slate-500" />
              Built with enterprise-grade audit, control, and AirGapX offline backup.
            </div>
          </div>
          
          {/* Right Visual Content (Chat Simulation) */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-full">
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>
            
            <div className="relative bg-[#0F172A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
              {/* Chat Header */}
              <div className="bg-slate-800/80 backdrop-blur-md px-4 py-3 border-b border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-inner">
                  AI
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Audomas Sales Agent</div>
                  <div className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    Online
                  </div>
                </div>
                <div className="ml-auto flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                </div>
              </div>
              
              {/* Chat Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
                {/* Customer Message */}
                <div className="self-end bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] text-sm shadow-sm">
                  Hi, I'm interested in the premium package. Does it include installation?
                </div>
                <div className="text-xs text-slate-500 self-end mr-1 -mt-3">LINE • 10:42 AM</div>
                
                {/* AI Processing Indicator */}
                <div className="flex items-center gap-2 self-start mb-2">
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                  </div>
                  <span className="text-xs text-slate-500">AI is typing...</span>
                </div>
                
                {/* AI Response */}
                <div className="self-start bg-slate-800 text-slate-200 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm shadow-sm">
                  Hello! 👋 Yes, our Premium Package includes <strong>free standard installation</strong> within the metro area. <br/><br/>
                  We currently have a 10% discount running until Friday. Would you like me to send you the official quotation?
                </div>
                <div className="text-xs text-slate-500 self-start ml-1 -mt-3">10:42 AM</div>

                {/* Customer Message */}
                <div className="self-end bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] text-sm shadow-sm mt-2">
                  Yes please, send the quote.
                </div>
                
                {/* AI Action/Response */}
                <div className="self-start bg-slate-800 text-slate-200 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm shadow-sm flex flex-col gap-2">
                  <p>Great! I've generated Quote #Q-8492 for you.</p>
                  <div className="bg-slate-900 rounded-lg p-3 border border-slate-700 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">Quotation_Premium.pdf</div>
                      <div className="text-slate-400 text-xs">Ready to pay • ฿15,000</div>
                    </div>
                  </div>
                  <p>You can securely pay directly via the link in the document to confirm your installation schedule.</p>
                </div>
              </div>
              
              {/* Chat Input Area */}
              <div className="bg-slate-800 px-4 py-3 border-t border-slate-700 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center text-slate-400">+</div>
                <div className="flex-1 bg-slate-900 rounded-full h-9 border border-slate-700 px-4 flex items-center text-sm text-slate-500">
                  Type a message...
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -left-6 top-1/4 bg-white rounded-xl p-3 shadow-lg flex items-center gap-3 animate-bounce shadow-blue-500/10">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-slate-800 font-bold text-sm">Deal Closed!</div>
                <div className="text-slate-500 text-xs">+฿15,000 Revenue</div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
