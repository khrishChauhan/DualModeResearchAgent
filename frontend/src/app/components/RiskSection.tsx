"use client";

import { RiskAssessment } from "@/lib/api";

interface RiskSectionProps {
  data: RiskAssessment;
}

interface RiskCardProps {
  title: string;
  risks: string[];
}

function RiskCard({ title, risks }: RiskCardProps) {
  return (
    <div className="group rounded-xl border border-[#e5e5e5] border-t-4 border-t-[#1f1f1f] bg-[#faf9f6] p-6 shadow-sm flex flex-col transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default">
      <div className="mb-4 border-b border-[#e5e5e5] pb-3 flex items-center justify-between transition-colors duration-300 group-hover:border-gray-300">
        <h4 className="text-base font-semibold text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#2f6f4f]">{title}</h4>
        <span className="bg-[#f0ebe1] text-[#1f1f1f] text-xs font-semibold px-2 py-1 rounded transition-colors duration-300 group-hover:bg-[#e4dfd5]">
          {risks.length} {risks.length === 1 ? 'Issue' : 'Issues'}
        </span>
      </div>
      <ul className="list-disc pl-5 space-y-2 text-sm text-[#1f1f1f] flex-grow">
        {risks.map((risk, index) => (
          <li key={index} className="leading-relaxed transition-all duration-300 hover:text-[#2f6f4f] hover:translate-x-1 cursor-default">
            {risk}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RiskSection({ data }: RiskSectionProps) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f] flex items-center gap-2">
        <svg className="w-5 h-5 text-[#2f6f4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Risk Assessment
      </h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RiskCard title="Industry Risks" risks={data.industry_risks} />
        <RiskCard title="Operational Risks" risks={data.operational_risks} />
        <RiskCard title="Regulatory Risks" risks={data.regulatory_risks} />
      </div>
    </section>
  );
}
