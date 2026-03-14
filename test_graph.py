from core.workflow import build_graph
import json

graph = build_graph()
try:
    state = graph.invoke({"ticker": "NVDA", "mode": "quick", "filing_year": 2023})
    print(json.dumps(state.get("report", {}), indent=2))
except Exception as e:
    print(f"Error: {e}")
