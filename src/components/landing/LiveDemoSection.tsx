"use client";

import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";

export function LiveDemoSection() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: 'Hello! I am the Audomas AI Sales Agent. How can I help you today?' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "Interested in your product",
    "Ask for price",
    "Compare options"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "I can certainly help with that! Our team would love to discuss this further.";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes("price") || lowerText.includes("cost")) {
        aiResponse = "Our pricing starts at ฿1,500/month for the Starter plan, and ฿4,500/month for Pro. Would you like me to send a detailed breakdown?";
      } else if (lowerText.includes("interested")) {
        aiResponse = "That's fantastic! To give you the best recommendation, what industry is your business in?";
      } else if (lowerText.includes("compare")) {
        aiResponse = "Sure! The main difference is that Pro includes 24/7 AI chat and AirGapX backup, while Starter is basic lead gen. Should we set up a 10-min demo call?";
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section id="live-demo" className="py-24 bg-[#020617] border-y border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Try AI Sales Agent</h2>
          <p className="text-slate-400">Interact with the agent live. See how naturally it handles customer inquiries.</p>
        </div>

        <div className="bg-[#0F172A] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Sales Agent Demo</h3>
              <p className="text-green-400 text-xs flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                Online & Ready
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 flex flex-col">
            {messages.map((msg, i) => (
              <div key={i} className={`flex max-w-[80%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'} gap-3`}>
                <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${msg.role === 'user' ? 'bg-slate-700' : 'bg-blue-600'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex max-w-[80%] self-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex shrink-0 items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span className="text-sm text-slate-400">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          <div className="px-6 py-3 flex gap-2 overflow-x-auto no-scrollbar border-t border-slate-800 bg-slate-900/50">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply)}
                disabled={isTyping}
                className="whitespace-nowrap px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full text-xs font-medium text-slate-300 transition-colors disabled:opacity-50"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Type like a customer..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-4 pr-14 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
