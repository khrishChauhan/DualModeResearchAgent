"use client";

import { PeerComparison as PeerComparisonType } from "@/lib/api";

interface PeerComparisonProps {
  data: PeerComparisonType;
  ticker: string;
}

export default function PeerComparison({ data, ticker }: PeerComparisonProps) {
  const companyPct = (data.company_operating_margin * 100).toFixed(1);
  const peerPct = (data.peer_operating_margin * 100).toFixed(1);
  const companyWidth = Math.min(data.company_operating_margin * 100, 100);
  const peerWidth = Math.min(data.peer_operating_margin * 100, 100);

  return (
    <section className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
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
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">Peer Comparison</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-center gap-4 text-center">
          <div className="flex-1">
            <div className="mb-1 text-sm font-medium text-slate-400">Company</div>
            <div className="text-2xl font-bold text-emerald-400">{ticker}</div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-600/50 bg-slate-700/50">
            <span className="text-lg font-bold text-slate-300">vs</span>
          </div>
          <div className="flex-1">
            <div className="mb-1 text-sm font-medium text-slate-400">Peer</div>
            <div className="text-2xl font-bold text-cyan-400">{data.peer}</div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700/30 bg-slate-900/50 p-5">
          <h4 className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Operating Margin Comparison
          </h4>

          {/* Company bar */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-300">{ticker}</span>
              <span className="text-lg font-bold text-emerald-400">{companyPct}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20 transition-all duration-1000 ease-out"
                style={{ width: `${companyWidth}%` }}
              />
            </div>
          </div>

          {/* Peer bar */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-300">{data.peer}</span>
              <span className="text-lg font-bold text-cyan-400">{peerPct}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 shadow-lg shadow-cyan-500/20 transition-all duration-1000 ease-out"
                style={{ width: `${peerWidth}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
