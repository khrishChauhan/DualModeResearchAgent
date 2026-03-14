"use client";

import { PeerComparison as PeerComparisonType } from "@/lib/api";

interface PeerComparisonProps {
  data: PeerComparisonType;
  ticker: string;
}

export default function PeerComparison({ data, ticker }: PeerComparisonProps) {
  const companyPct = (data.company_operating_margin * 100).toFixed(1);
  const peerPct = (data.peer_operating_margin * 100).toFixed(1);

  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f] flex items-center gap-2">
        <svg className="w-5 h-5 text-[#2f6f4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Peer Comparison: {data.peer}
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Company Card */}
        <div className="group rounded-xl border border-[#e5e5e5] border-t-4 border-t-[#2f6f4f] bg-[#faf9f6] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default">
          <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide transition-colors duration-300 group-hover:text-[#2f6f4f]">{ticker} Operating Margin</h4>
          <div className="flex items-end gap-2 transition-transform duration-300 group-hover:translate-x-1">
            <span className="text-3xl font-bold text-[#1f1f1f]">{companyPct}%</span>
          </div>
        </div>

        {/* Peer Card */}
        <div className="group rounded-xl border border-[#e5e5e5] border-t-4 border-t-[#1f1f1f] bg-[#faf9f6] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default">
          <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide transition-colors duration-300 group-hover:text-[#1f1f1f]">{data.peer} Operating Margin</h4>
          <div className="flex items-end gap-2 transition-transform duration-300 group-hover:translate-x-1">
            <span className="text-3xl font-bold text-[#1f1f1f]">{peerPct}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
