"use client";

import { InvestmentThesis } from "@/lib/api";

interface ThesisSectionProps {
  data: InvestmentThesis;
}

export default function ThesisSection({ data }: ThesisSectionProps) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f]">Investment Thesis</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#2f6f4f]" />
            <h4 className="text-base font-semibold text-[#1f1f1f]">Bull Case</h4>
          </div>
          <p className="text-sm text-[#1f1f1f] leading-relaxed">
            {data.bull_case}
          </p>
        </div>

        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-700" />
            <h4 className="text-base font-semibold text-[#1f1f1f]">Bear Case</h4>
          </div>
          <p className="text-sm text-[#1f1f1f] leading-relaxed">
            {data.bear_case}
          </p>
        </div>
      </div>
    </section>
  );
}
