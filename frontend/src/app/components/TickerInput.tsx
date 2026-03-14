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
        className="text-sm font-medium text-gray-700"
      >
        Stock Ticker
      </label>
      <div className="relative">
        <input
          id="ticker-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          placeholder="e.g. NVDA, AAPL"
          className="w-full rounded-lg border border-[#e5e5e5] bg-white py-2.5 px-3 text-base text-[#1f1f1f] placeholder-gray-400 focus:border-[#2f6f4f] focus:outline-none focus:ring-1 focus:ring-[#2f6f4f]"
        />
      </div>
    </div>
  );
}
