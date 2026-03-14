"""
FastAPI server for the AI Equity Research Agent.

Wraps the LangGraph workflow as a REST API so the Next.js
frontend (or any HTTP client) can trigger analysis.

Run with:
    uvicorn server:app --reload

Docs at:
    http://127.0.0.1:8000/docs
"""

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from core.workflow import build_graph
from core.rag import get_client, create_collection, ingest_document, COLLECTION_NAME
from core.sec_fetch import fetch_latest_10k_risks, fetch_indian_stock_risks

# ── Initialise the app ────────────────────────────────────────────────────────

app = FastAPI(
    title="AI Equity Research Agent API",
    description="Automated financial analysis using LLMs and SEC filings",
    version="1.0.0",
)

# CORS — allow the Next.js frontend (and any other origin) to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Build the LangGraph workflow once at startup
graph = build_graph()


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    """Health-check endpoint."""
    return {"message": "Equity Research Agent API running"}


@app.get("/analyze")
def analyze(
    ticker: str = Query(..., description="Stock ticker symbol, e.g. NVDA"),
    mode: str = Query("quick", description="Analysis mode: 'quick' or 'deep'"),
):
    """
    Run the full equity research pipeline for a given ticker.

    - **quick** mode: financials → KPI analysis → RAG risk retrieval → risk summary → report
    - **deep** mode: adds peer comparison, DCF valuation, investment thesis,
      senior analyst reflection, and confidence scoring
    """

    # ── Validate inputs ───────────────────────────────────────────────────
    ticker = ticker.strip().upper()
    if not ticker:
        raise HTTPException(status_code=400, detail="Ticker symbol is required")

    mode = mode.strip().lower()
    if mode not in ("quick", "deep"):
        raise HTTPException(
            status_code=400,
            detail=f"Invalid mode '{mode}'. Must be 'quick' or 'deep'.",
        )

    # ── Auto-ingest SEC data if not already in Qdrant ─────────────────────
    client = get_client()
    filing_year = 2023  # default

    already_ingested = False
    if client.collection_exists(COLLECTION_NAME):
        from qdrant_client import models as qdrant_models

        results = client.scroll(
            collection_name=COLLECTION_NAME,
            scroll_filter=qdrant_models.Filter(
                must=[
                    qdrant_models.FieldCondition(
                        key="ticker",
                        match=qdrant_models.MatchValue(value=ticker),
                    )
                ]
            ),
            limit=1,
            with_payload=True,
        )
        if results[0]:
            filing_year = results[0][0].payload.get("year", 2023)
            already_ingested = True

    if not already_ingested:
        # Auto-fetch from SEC EDGAR (US) or Yahoo Finance (Indian stocks)
        try:
            if ticker.endswith(".NS") or ticker.endswith(".BO"):
                risk_text, filing_year = fetch_indian_stock_risks(ticker)
            else:
                risk_text, filing_year = fetch_latest_10k_risks(ticker)
        except Exception as e:
            raise HTTPException(
                status_code=502,
                detail=f"Failed to fetch SEC/Yahoo data for {ticker}: {e}",
            )

        if not client.collection_exists(COLLECTION_NAME):
            create_collection()
        ingest_document(risk_text, ticker, filing_year)

    # ── Run the LangGraph workflow ────────────────────────────────────────
    try:
        final_state = graph.invoke(
            {"ticker": ticker, "mode": mode, "filing_year": filing_year}
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis pipeline failed for {ticker}: {e}",
        )

    # ── Return the assembled report ───────────────────────────────────────
    report = final_state.get("report", {})
    return report
