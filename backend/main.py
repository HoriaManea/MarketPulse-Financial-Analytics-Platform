from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rates import get_rates
from forex import get_forex_stats, get_forex_dominance,get_forex_full_year
from crypto import get_crypto_dominance
from constants import FOREX_DATA

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API running"}

@app.get("/rates")
def rates():
    return get_rates()

@app.get("/forex")
def forex():
    return get_forex_stats()

@app.get("/forex-last-year-results")
def forex_dominance():
    return get_forex_dominance()

@app.get("/forex-full-year")
def forex_full_year():
    return get_forex_full_year()

@app.get("/forex-trading-chart")
def forex_trading_chart(pair: str = "EURUSD", limit: int = 100):
    return FOREX_DATA.get(pair, [])[:limit]

#  Crypto

@app.get("/crypto-dominance")
def forex_full_year():
    return get_crypto_dominance()

