"use client";

interface TickerInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TickerInput({ value, onChange }: TickerInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="ticker-input"
        className="text-xs font-semibold uppercase tracking-widest text-slate-400"
      >
        Stock Ticker
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-5 w-5 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94"
            />
          </svg>
        </div>
        <input
          id="ticker-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="e.g. NVDA, AAPL, TSLA"
          className="w-full rounded-xl border border-slate-700/50 bg-slate-800/60 py-3.5 pl-12 pr-4 text-lg font-bold tracking-wider text-white placeholder-slate-500 shadow-inner backdrop-blur-sm transition-all duration-300 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>
    </div>
  );
}
