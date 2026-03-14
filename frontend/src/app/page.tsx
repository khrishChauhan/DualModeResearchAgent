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
    <div className="min-h-screen bg-[#f7f7f7] bg-dot-pattern text-[#1f1f1f] font-sans">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Top Section */}
        <section className="mb-10 text-center flex flex-col items-center animate-slide-up">
          <div className="inline-flex items-center justify-center rounded-full border border-[#2f6f4f]/20 bg-[#2f6f4f]/5 px-3 py-1 mb-5">
            <span className="text-xs font-semibold text-[#2f6f4f] uppercase tracking-wider">Research Terminal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1f1f1f] mb-4">
            AI Equity Research Agent
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl text-center">
            Automated financial research and stock analysis reports using SEC filings.
          </p>
        </section>

        {/* Input Section */}
        <section className="mb-12">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}
            className="group/form bg-[#faf9f6]/95 backdrop-blur-sm border border-[#e5e5e5] rounded-xl shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-gray-300 transition-all duration-300 p-6 flex flex-col md:flex-row items-end gap-4"
          >
            <div className="w-full md:flex-1">
              <TickerInput value={ticker} onChange={setTicker} />
            </div>
            <div className="w-full md:w-64">
              <ModeSelector value={mode} onChange={setMode} />
            </div>
            <button
              type="submit"
              id="analyze-button"
              disabled={loading || !ticker.trim()}
              className="group/btn w-full md:w-auto h-[46px] flex items-center justify-center gap-2 rounded-lg bg-[#1f1f1f] px-8 text-base font-medium text-white shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1f1f1f]"
              aria-live="polite"
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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
                  <span>Analyzing…</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </section>

        {/* Error State */}
        {error && (
          <div 
            className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700"
            role="alert"
          >
             <p className="font-medium">Analysis Failed</p>
             <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Loading State Skeleton */}
        {loading && (
          <div className="space-y-8 animate-pulse" aria-live="polite" aria-busy="true">
            <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
              <div className="h-8 w-64 bg-gray-200 rounded" aria-hidden="true"></div>
              <div className="h-8 w-24 bg-gray-200 rounded" aria-hidden="true"></div>
            </div>

            <section>
              <div className="h-6 w-40 bg-gray-200 rounded mb-4" aria-hidden="true"></div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-[#e5e5e5] bg-gray-100 h-28" aria-hidden="true"></div>
                <div className="rounded-xl border border-[#e5e5e5] bg-gray-100 h-28" aria-hidden="true"></div>
              </div>
            </section>

            <section>
              <div className="h-6 w-36 bg-gray-200 rounded mb-4" aria-hidden="true"></div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-[#e5e5e5] bg-gray-100 h-48" aria-hidden="true"></div>
                <div className="rounded-xl border border-[#e5e5e5] bg-gray-100 h-48" aria-hidden="true"></div>
                <div className="rounded-xl border border-[#e5e5e5] bg-gray-100 h-48" aria-hidden="true"></div>
              </div>
            </section>

            {mode === "deep" && (
              <>
                <section>
                  <div className="h-6 w-44 bg-gray-200 rounded mb-4" aria-hidden="true"></div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-[#e5e5e5] bg-gray-100 h-32" aria-hidden="true"></div>
                    <div className="rounded-xl border border-[#e5e5e5] bg-gray-100 h-32" aria-hidden="true"></div>
                  </div>
                </section>
                <section>
                  <div className="h-6 w-40 bg-gray-200 rounded mb-4" aria-hidden="true"></div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-[#e5e5e5] bg-gray-100 h-40" aria-hidden="true"></div>
                    <div className="rounded-xl border border-[#e5e5e5] bg-gray-100 h-40" aria-hidden="true"></div>
                  </div>
                </section>
              </>
            )}
            <div className="sr-only">Analyzing {ticker}… Please wait.</div>
          </div>
        )}

        {/* Results Dashboard */}
        {result && !loading && (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1f1f1f]">{result.ticker} Research Report</h2>
              </div>
              <span className="rounded bg-[#faf9f6] px-3 py-1 text-sm font-medium text-[#1f1f1f] border border-[#e5e5e5]">
                {mode === "deep" ? "Deep" : "Quick"} Analysis
              </span>
            </div>

            <div className="animate-slide-up">
              <KPISection data={result.financial_overview} />
            </div>
            
            <div className="animate-slide-up delay-100">
              <RiskSection data={result.risk_assessment} />
            </div>

            {mode === "deep" && result.peer_comparison && (
              <div className="animate-slide-up delay-200">
                <PeerComparison
                  data={result.peer_comparison}
                  ticker={result.ticker}
                />
              </div>
            )}

            {mode === "deep" && result.thesis && (
              <div className="animate-slide-up delay-300">
                <ThesisSection data={result.thesis} />
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && !error && (
          <div className="mx-auto max-w-lg py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-[#e5e5e5] bg-[#faf9f6] text-gray-400">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
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

      <footer className="border-t border-[#e5e5e5] py-6 text-center mt-12 mb-8 animate-fade-in delay-400">
        <p className="text-sm text-gray-500">
          AI Equity Research Agent &bull; Data sourced from SEC filings &bull; Not financial advice
        </p>
      </footer>
    </div>
  );
}
