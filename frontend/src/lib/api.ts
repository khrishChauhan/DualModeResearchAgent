// API types and helper for the AI Equity Research Agent backend

export interface FinancialOverview {
  revenue_growth: string;
  operating_margin_trend: string;
}

export interface RiskAssessment {
  industry_risks: string[];
  operational_risks: string[];
  regulatory_risks: string[];
}

export interface PeerComparison {
  peer: string;
  peer_operating_margin: number;
  company_operating_margin: number;
}

export interface InvestmentThesis {
  bull_case: string;
  bear_case: string;
}

export interface AnalysisResponse {
  ticker: string;
  financial_overview: FinancialOverview;
  risk_assessment: RiskAssessment;
  peer_comparison?: PeerComparison;
  thesis?: InvestmentThesis;
}

export type AnalysisMode = "quick" | "deep";

const API_BASE = "http://localhost:8000";

export async function fetchAnalysis(
  ticker: string,
  mode: AnalysisMode
): Promise<AnalysisResponse> {
  const url = `${API_BASE}/analyze?ticker=${encodeURIComponent(
    ticker.toUpperCase()
  )}&mode=${mode}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Analysis failed (${response.status}): ${errorText || "Unknown error"}`
    );
  }

  return response.json();
}
