"use client";

import { FinancialOverview } from "@/lib/api";

interface KPISectionProps {
  data: FinancialOverview;
}

export default function KPISection({ data }: KPISectionProps) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f] flex items-center gap-2">
        <svg className="w-5 h-5 text-[#2f6f4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Financial Overview
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Revenue Growth Card */}
        <div className="group rounded-xl border border-[#e5e5e5] border-t-4 border-t-[#2f6f4f] bg-[#faf9f6] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default">
          <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide transition-colors duration-300 group-hover:text-[#2f6f4f]">Revenue Growth</h4>
          <p className="text-[#1f1f1f] text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1">
            {data.revenue_growth}
          </p>
        </div>

        {/* Operating Margin Trend Card */}
        <div className="group rounded-xl border border-[#e5e5e5] border-t-4 border-t-[#b59a5c] bg-[#faf9f6] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default">
          <h4 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide transition-colors duration-300 group-hover:text-[#b59a5c]">Operating Margin Trend</h4>
          <p className="text-[#1f1f1f] text-2xl font-bold transition-transform duration-300 group-hover:translate-x-1">
            {data.operating_margin_trend}
          </p>
        </div>
      </div>
    </section>
  );
}
