"use client";

import { InvestmentThesis } from "@/lib/api";

interface ThesisSectionProps {
  data: InvestmentThesis;
}

export default function ThesisSection({ data }: ThesisSectionProps) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f] flex items-center gap-2">
        <svg className="w-5 h-5 text-[#2f6f4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Investment Thesis
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="group rounded-xl border border-[#e5e5e5] border-t-4 border-t-[#2f6f4f] bg-[#faf9f6] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default">
          <div className="mb-4 flex items-center gap-2 border-b border-[#e5e5e5] pb-3 transition-colors duration-300 group-hover:border-[#2f6f4f]/30">
            <div className="flex items-center justify-center bg-[#2f6f4f]/10 rounded-full h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#2f6f4f]/20">
              <svg className="h-4 w-4 text-[#2f6f4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-[#1f1f1f] uppercase tracking-wide transition-colors duration-300 group-hover:text-[#2f6f4f]">Bull Case</h4>
          </div>
          <p className="text-sm text-[#1f1f1f] leading-relaxed transition-colors duration-300 group-hover:text-gray-900">
            {data.bull_case}
          </p>
        </div>

        <div className="group rounded-xl border border-[#e5e5e5] border-t-4 border-t-red-700 bg-[#faf9f6] p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default">
          <div className="mb-4 flex items-center gap-2 border-b border-[#e5e5e5] pb-3 transition-colors duration-300 group-hover:border-red-700/30">
            <div className="flex items-center justify-center bg-red-700/10 rounded-full h-8 w-8 transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-700/20">
              <svg className="h-4 w-4 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-[#1f1f1f] uppercase tracking-wide transition-colors duration-300 group-hover:text-red-700">Bear Case</h4>
          </div>
          <p className="text-sm text-[#1f1f1f] leading-relaxed transition-colors duration-300 group-hover:text-gray-900">
            {data.bear_case}
          </p>
        </div>
      </div>
    </section>
  );
}
