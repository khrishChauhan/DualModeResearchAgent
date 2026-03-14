"use client";

interface TickerInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TickerInput({ value, onChange }: TickerInputProps) {
  return (
    <div className="flex flex-col gap-1.5 focus-within:z-10">
      <label
        htmlFor="ticker-input"
        className="text-sm font-medium text-gray-700 cursor-pointer"
      >
        Stock Ticker
      </label>
      <div className="relative group">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-[#2f6f4f] transition-colors duration-300">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          id="ticker-input"
          type="text"
          name="ticker"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="e.g. NVDA, AAPL…"
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded-lg border border-[#e5e5e5] bg-[#faf9f6] py-2.5 pl-10 pr-3 text-base font-semibold text-[#1f1f1f] placeholder-gray-400 focus-visible:border-[#2f6f4f] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2f6f4f] transition-all duration-200 uppercase placeholder:normal-case shadow-sm hover:shadow-md focus:bg-white"
        />
      </div>
    </div>
  );
}
