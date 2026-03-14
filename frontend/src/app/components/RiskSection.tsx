"use client";

import { RiskAssessment } from "@/lib/api";

interface RiskSectionProps {
  data: RiskAssessment;
}

interface RiskCardProps {
  title: string;
  risks: string[];
  color: "amber" | "rose" | "violet";
  icon: React.ReactNode;
}

function RiskCard({ title, risks, color, icon }: RiskCardProps) {
  const colorMap = {
    amber: {
      border: "hover:border-amber-500/30",
      shadow: "hover:shadow-amber-500/5",
      dot: "bg-amber-400 shadow-amber-400/50",
      bg: "bg-amber-500/5",
      iconBg: "from-amber-500 to-orange-600 shadow-amber-500/25",
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    },
    rose: {
      border: "hover:border-rose-500/30",
      shadow: "hover:shadow-rose-500/5",
      dot: "bg-rose-400 shadow-rose-400/50",
      bg: "bg-rose-500/5",
      iconBg: "from-rose-500 to-pink-600 shadow-rose-500/25",
      badge: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    },
    violet: {
      border: "hover:border-violet-500/30",
      shadow: "hover:shadow-violet-500/5",
      dot: "bg-violet-400 shadow-violet-400/50",
      bg: "bg-violet-500/5",
      iconBg: "from-violet-500 to-purple-600 shadow-violet-500/25",
      badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    },
  };

  const colors = colorMap[color];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 ${colors.border} ${colors.shadow} hover:shadow-lg`}
    >
      <div
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${colors.bg} transition-transform duration-500 group-hover:scale-150`}
      />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${colors.iconBg} shadow-lg`}
            >
              {icon}
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              {title}
            </h3>
          </div>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${colors.badge}`}
          >
            {risks.length}
          </span>
        </div>
        <ul className="space-y-2.5">
          {risks.map((risk, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <div
                className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${colors.dot} shadow-sm`}
              />
              <span className="text-sm leading-relaxed text-slate-300">
                {risk}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function RiskSection({ data }: RiskSectionProps) {
  return (
    <section className="animate-fadeIn" style={{ animationDelay: "100ms" }}>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25">
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
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">Risk Assessment</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RiskCard
          title="Industry"
          risks={data.industry_risks}
          color="amber"
          icon={
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
          }
        />
        <RiskCard
          title="Operational"
          risks={data.operational_risks}
          color="rose"
          icon={
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17l-5.36-5.36m12.72 0l-5.36 5.36M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <RiskCard
          title="Regulatory"
          risks={data.regulatory_risks}
          color="violet"
          icon={
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
              />
            </svg>
          }
        />
      </div>
    </section>
  );
}
