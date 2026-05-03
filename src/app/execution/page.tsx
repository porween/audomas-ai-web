"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Brain, 
  BarChart3, 
  Rocket, 
  CheckCircle2, 
  TrendingUp,
  Users,
  MapPin,
  Send,
  FileText,
  Play,
  Activity,
  Clock,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

// --- Types & Data ---

const steps = [
  { id: 1, title: 'รับข้อมูลจากกล้อง + ระบบ POS', description: 'Data ingestion from CCTV & POS Terminal', icon: Camera },
  { id: 2, title: 'วิเคราะห์พฤติกรรมลูกค้า', description: 'Behavior analysis & pattern recognition', icon: Brain },
  { id: 3, title: 'สร้าง Insight + คำแนะนำ', description: 'Generating business insights & recommendations', icon: BarChart3 },
  { id: 4, title: 'สั่งงานอัตโนมัติ (Automation)', description: 'Triggering downstream actions', icon: Rocket },
];

const initialActivities = [
  { id: 1, text: 'ตรวจพบลูกค้าเข้าใหม่ (2 วินาทีที่แล้ว)', type: 'success', category: 'LIVE', time: 'ตอนนี้' },
  { id: 2, text: 'กำลังวิเคราะห์ข้อมูลพฤติกรรมลูกค้า', type: 'processing', category: 'ACTION', time: '10 วินาทีที่แล้ว' },
  { id: 3, text: 'สร้างรายงานสรุปช่วงเช้าสำเร็จ', type: 'success', category: 'COMPLETED', time: '1 นาทีที่แล้ว' },
  { id: 4, text: 'อัปเดตโมเดล AI', type: 'processing', category: 'SYSTEM', time: '5 นาทีที่แล้ว' },
];

export default function ExecutionResultPage() {
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(2);
  const [progress, setProgress] = useState(45);
  const [customers, setCustomers] = useState(12);
  const [income, setIncome] = useState(18.0);
  const [activities, setActivities] = useState([...initialActivities]);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 0;
        return p + 1.2;
      });
      
      if (Math.random() > 0.85) {
        setCustomers(c => {
            const next = c > 25 ? 12 : c + 1;
            setActivities(prev => [
                { id: Date.now(), text: `ตรวจพบลูกค้าเข้าใหม่ (1 วินาทีที่แล้ว)`, type: 'success', category: 'LIVE', time: 'ตอนนี้' },
                ...prev.slice(0, 3)
            ]);
            return next;
        });
      }
      
      if (Math.random() > 0.95) {
          setIncome(i => +(i + 0.1).toFixed(1));
      }
    }, 150);

    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
     return <SkeletonUI />;
  }

  // Force light mode text colors and backgrounds explicitly, to override layout.tsx
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/20 flex flex-col relative overflow-hidden isolate">
      {/* Soft gradient backgrounds for premium SaaS look */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/60 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-100/50 blur-[120px] pointer-events-none -z-10" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-md flex items-center justify-center p-0.5">
             <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
               <Sparkles className="text-blue-500" size={20} />
             </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl tracking-tight text-slate-900 leading-none">Execution</h1>
            <span className="text-xs font-medium text-slate-500 mt-1">Live AI Control Layer</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </div>
          <span className="text-sm font-semibold text-slate-700 tracking-wide">Live Operations</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-8 z-10 flex flex-col gap-8 max-w-7xl">
        {/* Title Section */}
        <div className="flex flex-col mb-2">
           <h2 className="text-3xl font-bold tracking-tight text-slate-900 opacity-90">AI Automation in Progress</h2>
           <p className="text-slate-500 font-medium text-base mt-2 max-w-2xl">
             AI กำลังวิเคราะห์และดำเนินการ (AI is analyzing and executing business actions in real time)
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
          
          {/* LEFT: Flow Timeline (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white border border-slate-200/70 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden flex-1 group"
            >
              <h3 className="text-lg font-bold flex items-center gap-2 mb-8 text-slate-800">
                <Activity className="text-blue-500" size={20} /> 
                Execution Pipeline
              </h3>
              
              <div className="flex flex-col gap-0 relative">
                 {/* Connection Line Behind Steps */}
                 <div className="absolute left-[23px] top-[40px] bottom-[40px] w-0.5 bg-slate-100 z-0 rounded-full" />
                 
                 {steps.map((step, index) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    const isPending = step.id > currentStep;
                    const isLast = index === steps.length - 1;
                    
                    return (
                      <div key={step.id} className={`relative z-10 flex items-start gap-5 ${!isLast ? 'pb-8' : ''}`}>
                         <div className="relative">
                            {/* Animated Pulse for active step */}
                            {isActive && (
                                <motion.div 
                                  className="absolute -inset-2 bg-blue-100 rounded-full z-0"
                                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                />
                            )}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-[3px] transition-all duration-300 relative z-10 ${
                                isCompleted ? 'bg-white border-green-500 text-green-500' : 
                                isActive ? 'bg-white border-blue-500 text-blue-600 shadow-[0_4px_15px_rgba(59,130,246,0.2)]' : 
                                'bg-white border-slate-200 text-slate-300'
                              }`}>
                                {isCompleted ? <CheckCircle2 size={22} className="stroke-[2.5px]" /> : <step.icon size={22} className={isActive ? "stroke-[2.5px]" : "stroke-2"} />}
                            </div>
                         </div>
                         
                         <div className={`flex-1 pt-1.5 transition-all duration-300 ${isPending ? 'opacity-40' : 'opacity-100'}`}>
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-slate-800 text-[1.05rem]">{step.title}</h4>
                            </div>
                            <p className="text-sm font-medium text-slate-500 mt-1">{step.description}</p>
                            
                            {isCompleted && (
                               <div className="mt-2 text-xs font-bold text-green-600 bg-green-50 border border-green-100 inline-block px-2.5 py-1 rounded-md">COMPLETED</div>
                            )}
                            {isPending && (
                               <div className="mt-2 text-xs font-bold text-slate-400 bg-slate-50 border border-slate-100 inline-block px-2.5 py-1 rounded-md">WAITING</div>
                            )}
                            
                            <AnimatePresence>
                              {isActive && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }} 
                                  animate={{ opacity: 1, height: 'auto' }} 
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                    <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                      <motion.div 
                                        className="bg-blue-500 h-full rounded-full"
                                        style={{ width: `${progress}%` }}
                                      />
                                    </div>
                                    <div className="mt-2 flex items-center gap-1.5 text-blue-600 text-xs font-bold tracking-wide">
                                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                       PROCESSING
                                    </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                         </div>
                      </div>
                    );
                 })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Insights & Actions (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Real-time Business Impact */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
               <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-3">Real-Time Business Impact</h3>
               <div className="grid grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                          <TrendingUp size={18} />
                        </div>
                        <span className="text-sm font-semibold text-slate-500">Revenue Uplift</span>
                     </div>
                     <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-slate-900">+{income.toFixed(1)}%</span>
                     </div>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                          <Users size={18} />
                        </div>
                        <span className="text-sm font-semibold text-slate-500">Active Customers</span>
                     </div>
                     <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-slate-900">{customers}</span>
                     </div>
                  </div>
                  {/* Hotspot Card (Spans full width) */}
                  <div className="col-span-2 bg-gradient-to-r from-orange-50/50 to-red-50/50 rounded-2xl p-5 border border-orange-100 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-500 border border-orange-100">
                           <MapPin size={24} />
                        </div>
                        <div>
                           <span className="text-sm font-bold text-orange-600 block mb-0.5">High Attention Zone Detected</span>
                           <h4 className="text-xl font-bold text-slate-900">Counter Zone</h4>
                        </div>
                     </div>
                     <div className="bg-white rounded-full px-4 py-1.5 border border-orange-100 flex items-center gap-2 shadow-sm">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="text-xs font-bold text-orange-700">HOTSPOT</span>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* AI Recommendation */}
            <motion.div 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
               <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-3">AI Recommendations</h3>
               <div className="bg-white rounded-2xl border border-slate-200/70 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                  <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                        <Brain size={16} className="text-cyan-600" />
                        Smart Actions Suggested
                     </div>
                     <span className="bg-cyan-50 text-cyan-700 border border-cyan-100 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">High Confidence</span>
                  </div>
                  <div className="p-2">
                     <div className="group flex items-start gap-3.5 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100 text-cyan-600">
                            <ArrowUpRight size={14} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                           <p className="text-slate-800 font-semibold text-[15px]">Increase promotion in Counter Zone immediately</p>
                           <p className="text-slate-500 text-sm mt-0.5">Capture the current high foot traffic at the hotspot.</p>
                        </div>
                     </div>
                     <div className="group flex items-start gap-3.5 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-cyan-50 flex items-center justify-center shrink-0 border border-cyan-100 text-cyan-600">
                            <ArrowUpRight size={14} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                           <p className="text-slate-800 font-semibold text-[15px]">Send coupon to new in-store customers to improve conversion</p>
                           <p className="text-slate-500 text-sm mt-0.5">Targeted {customers} customers currently detected.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
               <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Execution</h3>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex justify-center items-center gap-2.5 bg-gradient-to-b from-[#06C755] to-[#05b34c] hover:from-[#07d65b] hover:to-[#06C755] text-white rounded-xl py-3.5 px-4 font-bold transition-all shadow-sm border border-[#06C755]/10"
                  >
                     <Send size={18} /> ส่งไป LINE
                  </motion.button>
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex justify-center items-center gap-2.5 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-xl py-3.5 px-4 font-bold transition-all shadow-sm"
                  >
                     <FileText size={18} /> สร้างรายงาน PDF
                  </motion.button>
                  <motion.button 
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex justify-center items-center gap-2.5 bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white border border-blue-500/20 rounded-xl py-3.5 px-4 font-bold transition-all shadow-sm"
                  >
                     <Play size={18} /> Run Automation
                  </motion.button>
               </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM: Activity Feed */}
        <motion.div 
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
           className="w-full bg-white rounded-2xl border border-slate-200/70 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden"
        >
           <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                 <Clock className="text-slate-400" size={16} /> Activity Stream
              </h3>
              <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm text-xs font-bold text-slate-600 tracking-wider">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                 LIVE STREAM
              </div>
           </div>
           
           <div className="h-[180px] overflow-hidden relative p-2">
              <AnimatePresence>
                 {activities.map((activity) => (
                   <motion.div 
                     key={activity.id}
                     initial={{ opacity: 0, y: -10, scale: 0.98 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group mb-1 border border-transparent hover:border-slate-100"
                   >
                      <div className="flex items-center gap-4">
                         <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-20 text-center ${
                             activity.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 
                             activity.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' : 
                             'bg-blue-50 text-blue-700 border border-blue-100'
                         }`}>
                           {activity.category}
                         </div>
                         <span className="text-slate-800 font-medium text-[15px]">{activity.text}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                         {activity.time}
                      </span>
                   </motion.div>
                 ))}
              </AnimatePresence>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
           </div>
        </motion.div>
        
      </main>
    </div>
  );
}

function SkeletonUI() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden isolate">
       <header className="h-[73px] bg-white border-b border-slate-200 z-50 px-6 py-4 flex items-center justify-between">
          <div className="h-10 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="h-8 w-32 bg-slate-200 rounded-full animate-pulse" />
       </header>
       
       <main className="flex-1 container mx-auto px-4 lg:px-8 py-8 z-10 flex flex-col gap-8 max-w-7xl">
          <div className="h-10 w-64 bg-slate-200 rounded animate-pulse mb-2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
             <div className="lg:col-span-5 h-[500px] bg-white border border-slate-200 rounded-3xl animate-pulse" />
             <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="h-[120px] bg-white border border-slate-200 rounded-2xl animate-pulse" />
                <div className="h-[180px] bg-white border border-slate-200 rounded-2xl animate-pulse" />
                <div className="h-[60px] bg-white border border-slate-200 rounded-2xl animate-pulse" />
             </div>
          </div>
          
          <div className="h-[240px] bg-white border border-slate-200 rounded-2xl animate-pulse" />
       </main>
    </div>
  );
}
