"use client";

import { AnalysisMode } from "@/lib/api";

interface ModeSelectorProps {
  value: AnalysisMode;
  onChange: (value: AnalysisMode) => void;
}

export default function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5 focus-within:z-10">
      <label
        htmlFor="mode-selector"
        className="text-sm font-medium text-gray-700 cursor-pointer"
      >
        Analysis Mode
      </label>
      <div className="relative group">
        <select
          id="mode-selector"
          name="mode"
          value={value}
          onChange={(e) => onChange(e.target.value as AnalysisMode)}
          className="w-full appearance-none rounded-lg border border-[#e5e5e5] bg-[#faf9f6] py-2.5 pl-3 pr-10 text-base font-semibold text-[#1f1f1f] focus-visible:border-[#2f6f4f] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2f6f4f] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md focus:bg-white"
        >
          <option value="quick">Quick Analysis</option>
          <option value="deep">Deep Analysis</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 group-focus-within:text-[#2f6f4f] transition-colors duration-300">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
