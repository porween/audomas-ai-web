"use client";

import { RECENT_WORKFLOWS } from "../../data/mock";
import { ArrowRight, MoreVertical, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export function WorkflowTable() {
  return (
    <div className="mb-10">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800">เวิร์กโฟลว์ล่าสุด</h2>
        <button className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1">
          ดูทั้งหมด <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 w-[35%]">เวิร์กโฟลว์</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500">ประเภท</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500">สถานะ</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500">เริ่มทำงาน</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500">ผลลัพธ์</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 text-right">แอ็กชัน</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {RECENT_WORKFLOWS.map((workflow, index) => (
                <tr key={workflow.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                         {/* Mock Icons based on Source */}
                         {workflow.source.includes("Instagram") && <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-fuchsia-600 p-[1px]"><div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center"><div className="w-2.5 h-2.5 border-2 border-slate-800 rounded-sm"></div></div></div>}
                         {workflow.source.includes("Camera") && <div className="text-orange-500">📷</div>}
                         {workflow.source.includes("LINE") && <div className="text-emerald-500 font-bold bg-[#06C755] w-6 h-6 rounded text-white flex items-center justify-center text-[10px]">LINE</div>}
                         {workflow.source.includes("Google") && <div className="text-blue-500">📊</div>}
                         {workflow.source.includes("Facebook") && <div className="text-blue-600 font-bold bg-[#1877F2] w-6 h-6 rounded-full text-white flex items-center justify-center text-[12px]">f</div>}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 mb-0.5">{workflow.name}</p>
                        <p className="text-xs text-slate-500">{workflow.source}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-slate-600 font-medium">{workflow.type}</span>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={workflow.status} progress={workflow.progress} />
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                    {workflow.startedAt}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-slate-800">
                    {workflow.result}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {workflow.status === 'success' && (
                        <button className="text-xs font-semibold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors border border-purple-100">
                          ดูผลลัพธ์
                        </button>
                      )}
                      {workflow.status === 'running' && (
                        <button className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                          ดูรายละเอียด
                        </button>
                      )}
                       {workflow.status === 'failed' && (
                        <button className="text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors border border-rose-100">
                          ดูสาเหตุ
                        </button>
                      )}
                      <button className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 border-t border-slate-100 text-center">
             <button className="text-xs font-semibold text-purple-600 hover:text-purple-800">ดูเวิร์กโฟลว์ทั้งหมด</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, progress }: { status: string, progress: number }) {
  if (status === 'success') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
        เสร็จสิ้น <CheckCircle2 className="w-3.5 h-3.5" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100">
        ล้มเหลว <XCircle className="w-3.5 h-3.5" />
      </div>
    );
  }

  if (status === 'running') {
    return (
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">
          กำลังทำงาน <Loader2 className="w-3.5 h-3.5 animate-spin" />
        </div>
        <div className="flex-1 w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs font-bold text-orange-600">{progress}%</span>
      </div>
    );
  }

  return null;
}
