from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rates import get_rates
from forex import get_forex_stats, get_forex_dominance

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
def forex():
    return get_forex_dominance()

