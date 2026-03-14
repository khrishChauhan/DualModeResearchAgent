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
      <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f]">Peer Comparison: {data.peer}</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Company Card */}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">{ticker} Operating Margin</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-[#1f1f1f]">{companyPct}%</span>
          </div>
        </div>

        {/* Peer Card */}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">{data.peer} Operating Margin</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-[#1f1f1f]">{peerPct}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
