"use client";

import { FinancialOverview } from "@/lib/api";

interface KPISectionProps {
  data: FinancialOverview;
}

export default function KPISection({ data }: KPISectionProps) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f]">Financial Overview</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Revenue Growth Card */}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Revenue Growth</h4>
          <p className="text-[#1f1f1f] text-base">
            {data.revenue_growth}
          </p>
        </div>

        {/* Operating Margin Trend Card */}
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Operating Margin Trend</h4>
          <p className="text-[#1f1f1f] text-base">
            {data.operating_margin_trend}
          </p>
        </div>
      </div>
    </section>
  );
}
