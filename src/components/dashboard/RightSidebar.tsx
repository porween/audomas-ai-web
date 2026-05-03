"use client";

import { Activity, Bell, CheckCircle, Clock } from "lucide-react";
import { SUMMARY_TODAY, ALERTS } from "../../data/mock";

export function RightSidebar() {
  return (
    <aside className="w-[320px] h-full border-l border-slate-200/60 bg-white/40 flex flex-col p-6 overflow-y-auto shrink-0 hidden xl:flex gap-8 pb-20 backdrop-blur-xl">
      
      {/* Live Dashboard Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">Live Dashboard</h2>
        </div>
      </div>

      {/* Primary Metrics (Vercel style - large numbers, tight layout) */}
      <section className="grid grid-cols-2 gap-3">
        <MetricCard 
          label="Total Workflows" 
          value={SUMMARY_TODAY.totalWorkflows} 
          trend={`↑ ${SUMMARY_TODAY.totalWorkflowsTrend}%`} 
          color="text-indigo-600"
        />
        <MetricCard 
          label="Tasks Completed" 
          value={SUMMARY_TODAY.successTasks} 
          trend={`↑ ${SUMMARY_TODAY.successTasksTrend}%`} 
          color="text-emerald-600"
        />
        <MetricCard 
          label="Time Saved" 
          value={`${SUMMARY_TODAY.timeSaved}h`} 
          trend={`↑ ${SUMMARY_TODAY.timeSavedTrend}%`} 
          color="text-purple-600"
          className="col-span-2"
        />
      </section>

      {/* Recent Activity Feed */}
      <section className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Activity Feed</h3>
        </div>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {ALERTS.map((alert, i) => (
            <div key={alert.id} className="relative flex items-start gap-4">
               {/* Timeline Dot */}
              <div className="absolute left-1.5 md:left-1/2 md:-translate-x-1/2 -top-1 w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white" />
              <div className={`mt-0.5 absolute left-1.5 md:left-1/2 md:-translate-x-1/2 -top-1 w-2.5 h-2.5 rounded-full border-2 border-white z-10 ${alert.severity === 'urgent' ? 'bg-rose-500' : 'bg-emerald-500'}`} />

               {/* Activity Content */}
              <div className="ml-6 md:ml-0 md:w-[calc(50%-1.5rem)] md:odd:text-right md:even:text-left [&:nth-child(even)]:md:ml-auto bg-white/60 backdrop-blur-md rounded-xl p-3 border border-slate-200/50 shadow-sm w-full">
                <div className="flex items-center gap-1.5 mb-1 justify-between md:odd:justify-end md:even:justify-start">
                  <span className="text-[10px] font-semibold text-slate-400">{alert.time}</span>
                  {alert.severity === 'urgent' && (
                    <span className="text-[9px] font-bold bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded uppercase tracking-wider">Alert</span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-800">{alert.title}</h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{alert.description}</p>
              </div>
            </div>
          ))}

          {/* Dummy new feed entries to demonstrate real-time feel */}
          <div className="relative flex items-start gap-4 pt-2 opacity-50">
             <div className="absolute left-1.5 md:left-1/2 md:-translate-x-1/2 -top-1 w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white z-10" />
              <div className="ml-6 md:ml-0 md:w-[calc(50%-1.5rem)] md:even:text-left md:ml-auto w-full">
                 <div className="h-10 border border-dashed border-slate-300 rounded-xl flex items-center justify-center">
                    <Activity className="w-4 h-4 text-slate-400 animate-pulse" />
                 </div>
              </div>
          </div>
        </div>
      </section>

    </aside>
  );
}

function MetricCard({ label, value, trend, color, className = "" }: { label: string, value: string | number, trend: string, color: string, className?: string }) {
  return (
    <div className={`bg-white/60 backdrop-blur-md rounded-xl p-4 border border-slate-200/50 shadow-sm flex flex-col justify-between ${className}`}>
      <span className="text-[11px] font-medium text-slate-500 mb-2">{label}</span>
      <div className="flex items-end justify-between">
        <span className={`text-2xl font-bold tracking-tight ${color}`}>{value}</span>
        <span className="text-[10px] font-semibold text-emerald-500 mb-1">{trend}</span>
      </div>
    </div>
  );
}
