"use client";

import { InvestmentThesis } from "@/lib/api";

interface ThesisSectionProps {
  data: InvestmentThesis;
}

export default function ThesisSection({ data }: ThesisSectionProps) {
  return (
    <section className="animate-fadeIn" style={{ animationDelay: "300ms" }}>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 shadow-lg shadow-purple-500/25">
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
              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">Investment Thesis</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Bull Case */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/5 transition-transform duration-500 group-hover:scale-150" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <svg
                  className="h-5 w-5 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-emerald-400">
                Bull Case
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              {data.bull_case}
            </p>
          </div>
        </div>

        {/* Bear Case */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/5">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-rose-500/5 transition-transform duration-500 group-hover:scale-150" />
          <div className="relative">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10">
                <svg
                  className="h-5 w-5 text-rose-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-rose-400">Bear Case</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              {data.bear_case}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
