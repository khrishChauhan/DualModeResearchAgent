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
    <div className="rounded-xl border border-[#e5e5e5] bg-white p-6 shadow-sm flex flex-col">
      <div className="mb-4 border-b border-[#e5e5e5] pb-3 flex items-center justify-between">
        <h4 className="text-base font-semibold text-[#1f1f1f]">{title}</h4>
        <span className="bg-gray-100 text-[#1f1f1f] text-xs font-semibold px-2 py-1 rounded">
          {risks.length} Issues
        </span>
      </div>
      <ul className="list-disc pl-5 space-y-2 text-sm text-[#1f1f1f] flex-grow">
        {risks.map((risk, index) => (
          <li key={index} className="leading-relaxed">
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
      <h3 className="mb-4 text-lg font-semibold text-[#1f1f1f]">Risk Assessment</h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RiskCard title="Industry Risks" risks={data.industry_risks} />
        <RiskCard title="Operational Risks" risks={data.operational_risks} />
        <RiskCard title="Regulatory Risks" risks={data.regulatory_risks} />
      </div>
    </section>
  );
}
