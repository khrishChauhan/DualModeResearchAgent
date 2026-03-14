"use client";

import { useState } from "react";
import { AnalysisMode, AnalysisResponse, fetchAnalysis } from "@/lib/api";
import TickerInput from "./components/TickerInput";
import ModeSelector from "./components/ModeSelector";
import KPISection from "./components/KPISection";
import RiskSection from "./components/RiskSection";
import PeerComparison from "./components/PeerComparison";
import ThesisSection from "./components/ThesisSection";

export default function Home() {
  const [ticker, setTicker] = useState("NVDA");
  const [mode, setMode] = useState<AnalysisMode>("deep");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!ticker.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchAnalysis(ticker.trim(), mode);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#1f1f1f] font-sans">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Top Section */}
        <section className="mb-10 text-center flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1f1f1f] mb-3">
            AI Equity Research Agent
          </h1>
          <p className="text-base text-gray-600 max-w-2xl text-center">
            Automated financial research and stock analysis reports using SEC filings.
          </p>
        </section>

        {/* Input Section */}
        <section className="mb-12">
          <div className="bg-white border border-[#e5e5e5] rounded-xl shadow-sm p-6 flex flex-col md:flex-row items-end gap-4">
            <div className="w-full md:flex-1">
              <TickerInput value={ticker} onChange={setTicker} />
            </div>
            <div className="w-full md:w-64">
              <ModeSelector value={mode} onChange={setMode} />
            </div>
            <button
              id="analyze-button"
              onClick={handleAnalyze}
              disabled={loading || !ticker.trim()}
              className="w-full md:w-auto h-[46px] flex items-center justify-center gap-2 rounded-lg bg-[#1f1f1f] px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </section>

        {/* Error State */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
             <p className="font-medium">Analysis Failed</p>
             <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="relative mx-auto mb-6 h-12 w-12 text-[#2f6f4f]">
              <svg className="animate-spin h-full w-full" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-lg font-medium text-[#1f1f1f]">
              Gathering financial data for {ticker}...
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {mode === "deep" ? "Running deep analysis with peer comparison and investment thesis..." : "Running quick financial overview and risk assessment..."}
            </p>
          </div>
        )}

        {/* Results Dashboard */}
        {result && !loading && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1f1f1f]">{result.ticker} Research Report</h2>
              </div>
              <span className="rounded bg-white px-3 py-1 text-sm font-medium text-[#1f1f1f] border border-[#e5e5e5]">
                {mode === "deep" ? "Deep" : "Quick"} Analysis
              </span>
            </div>

            <KPISection data={result.financial_overview} />
            
            <RiskSection data={result.risk_assessment} />

            {mode === "deep" && result.peer_comparison && (
              <PeerComparison
                data={result.peer_comparison}
                ticker={result.ticker}
              />
            )}

            {mode === "deep" && result.thesis && (
              <ThesisSection data={result.thesis} />
            )}
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && !error && (
          <div className="mx-auto max-w-lg py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-[#e5e5e5] bg-white">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#1f1f1f]">
              Ready to Analyze
            </h3>
            <p className="text-sm text-gray-500">
              Enter a stock ticker and select your analysis mode to get started.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-[#e5e5e5] py-6 text-center mt-12">
        <p className="text-sm text-gray-500">
          AI Equity Research Agent • Data sourced from SEC filings • Not financial advice
        </p>
      </footer>
    </div>
  );
}
