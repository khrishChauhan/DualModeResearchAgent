"use client";

import { FinancialOverview } from "@/lib/api";

interface KPISectionProps {
  data: FinancialOverview;
}

export default function KPISection({ data }: KPISectionProps) {
  return (
    <section className="animate-fadeIn">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">Financial Overview</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Revenue Growth Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/5 transition-transform duration-500 group-hover:scale-150" />
          <div className="relative">
            <div className="mb-1 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Revenue Growth
              </h3>
            </div>
            <p className="mt-3 text-base leading-relaxed text-slate-200">
              {data.revenue_growth}
            </p>
          </div>
        </div>

        {/* Operating Margin Trend Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/5 transition-transform duration-500 group-hover:scale-150" />
          <div className="relative">
            <div className="mb-1 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Operating Margin Trend
              </h3>
            </div>
            <p className="mt-3 text-base leading-relaxed text-slate-200">
              {data.operating_margin_trend}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
