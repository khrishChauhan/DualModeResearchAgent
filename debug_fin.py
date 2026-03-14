from core.financials import get_financials
import json

ticker = "NVDA"
data = get_financials(ticker, filing_year=2023)
print(f"Results count: {len(data.get('results', []))}")
if len(data.get('results', [])) < 1:
    print(f"Full response: {json.dumps(data, indent=2)}")
