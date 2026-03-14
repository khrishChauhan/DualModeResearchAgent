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
    <div className="grid-bg relative min-h-screen">
      {/* Ambient background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[100px]" />
        <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.04] blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-purple-500/[0.03] blur-[100px]" />
      </div>

      {/* Top nav bar */}
      <header className="animate-slideDown sticky top-0 z-50 border-b border-slate-800/60 bg-[#0b0f1a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/20">
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
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                AI Equity Research
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            <span className="text-xs font-medium text-slate-400">
              System Online
            </span>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 py-10">
        {/* Hero Section */}
        <section className="animate-fadeIn mb-12 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="text-xs font-semibold tracking-wide text-emerald-300">
              Powered by LLM + SEC Filings
            </span>
          </div>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            AI Equity Research{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Agent
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-base text-slate-400">
            Automated financial analysis using large language models and SEC
            filings. Get institutional-grade equity research in seconds.
          </p>
        </section>

        {/* Input Controls */}
        <section
          className="animate-fadeIn mx-auto mb-14 max-w-2xl"
          style={{ animationDelay: "150ms" }}
        >
          <div className="rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <TickerInput value={ticker} onChange={setTicker} />
              <ModeSelector value={mode} onChange={setMode} />
            </div>
            <button
              id="analyze-button"
              onClick={handleAnalyze}
              disabled={loading || !ticker.trim()}
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:from-emerald-400 hover:to-cyan-400 hover:shadow-xl hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin-slow"
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
                  Analyzing {ticker}...
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                  Run Analysis
                </>
              )}
            </button>
          </div>
        </section>

        {/* Error State */}
        {error && (
          <div className="animate-fadeIn mx-auto mb-8 max-w-2xl">
            <div className="flex items-start gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5 backdrop-blur-sm">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-rose-300">
                  Analysis Failed
                </p>
                <p className="mt-1 text-sm text-rose-200/70">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="animate-fadeIn mx-auto max-w-2xl py-20 text-center">
            <div className="relative mx-auto mb-6 h-16 w-16">
              <div className="absolute inset-0 rounded-full border-2 border-slate-700" />
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-400" />
              <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-cyan-400" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
              <div className="absolute inset-4 animate-spin rounded-full border-2 border-transparent border-t-blue-400" style={{ animationDuration: "2s" }} />
            </div>
            <p className="text-lg font-semibold text-white">
              Analyzing{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {ticker}
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              {mode === "deep"
                ? "Running deep analysis with peer comparison and investment thesis..."
                : "Running quick financial overview and risk assessment..."}
            </p>
          </div>
        )}

        {/* Results Dashboard */}
        {result && !loading && (
          <div className="space-y-10">
            {/* Result Header */}
            <div className="animate-fadeIn flex items-center justify-between rounded-2xl border border-slate-700/40 bg-gradient-to-r from-slate-800/60 to-slate-900/60 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg font-extrabold text-white shadow-lg shadow-emerald-500/20">
                  {result.ticker.slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {result.ticker}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {mode === "deep" ? "Deep" : "Quick"} Analysis Report
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">
                  Complete
                </span>
              </div>
            </div>

            {/* Financial Overview */}
            <KPISection data={result.financial_overview} />

            {/* Risk Assessment */}
            <RiskSection data={result.risk_assessment} />

            {/* Peer Comparison (Deep mode only) */}
            {mode === "deep" && result.peer_comparison && (
              <PeerComparison
                data={result.peer_comparison}
                ticker={result.ticker}
              />
            )}

            {/* Investment Thesis (Deep mode only) */}
            {mode === "deep" && result.thesis && (
              <ThesisSection data={result.thesis} />
            )}
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && !error && (
          <div
            className="animate-fadeIn mx-auto max-w-lg py-16 text-center"
            style={{ animationDelay: "300ms" }}
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-700/40 bg-slate-800/50">
              <svg
                className="h-10 w-10 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-300">
              Ready to Analyze
            </h3>
            <p className="text-sm text-slate-500">
              Enter a stock ticker and select your analysis mode to get started.
              Deep mode includes peer comparison and investment thesis.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/40 py-6 text-center">
        <p className="text-xs text-slate-600">
          AI Equity Research Agent • Data sourced from SEC filings • Not
          financial advice
        </p>
      </footer>
    </div>
  );
}
