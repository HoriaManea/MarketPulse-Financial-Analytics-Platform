import random

FOREX = [
    {
        "id":1,
        "title": "EUR/USD",
        "base": "EUR",
        "quote": "USD",
        "price": 1.08,
        "symbol": "€",
        "flags": ["EU", "US"]
    },
    {
        "id": 2,
        "title": "GBP/USD",
        "base": "GBP",
        "quote": "USD",
        "price": 1.27,
        "symbol": "£",
        "flags": ["GB", "US"]
    },
    {
        "id": 3,
        "title": "USD/CHF",
        "base": "USD",
        "quote": "CHF",
        "price": 0.92,
        "symbol": "$",
        "flags": ["US", "CH"]
    },
{
    "id": 4,
    "title": "USD/JPY",
    "base": "USD",
    "quote": "JPY",
    "price": 150.25,
    "symbol": "$",
    "flags": ["US", "JP"]
}

]

def get_rates():
    for pair in FOREX:
        variation = random.uniform(-0.005, 0.005)
        pair["price"] = round(pair["price"] + variation, 4)

    return FOREX