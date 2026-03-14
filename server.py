from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import traceback

# Correctly import the workflow from the core package
from core.workflow import build_graph

app = FastAPI()

# 2. Add CORS middleware to allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Initialize the graph once at startup
try:
    graph = build_graph()
except Exception as e:
    print(f"Error building graph: {e}")
    graph = None

@app.get("/")
def root():
    return {"message": "Equity Research Agent API running"}

# 3. Create endpoint GET /analyze
@app.get("/analyze")
async def analyze(
    ticker: str = Query(..., description="Stock ticker symbol"),
    mode: str = Query("quick", description="Analysis mode: quick or deep"),
):
    """
    Exposes the LangGraph equity research workflow.
    """
    if not graph:
        raise HTTPException(status_code=500, detail="Analysis graph not initialized")

    try:
        # Pre-process inputs
        ticker = ticker.strip().upper()
        mode = mode.strip().lower()

        # 4. Run the LangGraph workflow
        # Defaulting filing_year to 2023 for general extraction
        result_state = graph.invoke({
            "ticker": ticker,
            "mode": mode,
            "filing_year": 2023 
        })

        # 5. Return the result JSON (stored in the 'report' key of the graph state)
        report = result_state.get("report", {})
        
        if not report:
             raise Exception("Analysis pipeline returned an empty report.")

        return report

    except Exception as e:
        # 6. Add try/except so errors return JSON instead of crashing
        error_details = traceback.format_exc()
        print(f"Pipeline Error for {ticker}: {error_details}")
        
        # Check for specific known errors (like API keys)
        error_msg = str(e)
        if "API Key" in error_msg or "401" in error_msg:
            error_msg = "Authentication error: Please check your AI API keys in the .env file."
        
        raise HTTPException(
            status_code=500, 
            detail={
                "error": "Internal Server Error",
                "message": error_msg,
                "ticker": ticker
            }
        )
