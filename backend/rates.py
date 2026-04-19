import random
from constants import FOREX


def get_rates():
    for pair in FOREX:
        variation = random.uniform(-0.005, 0.005)
        pair["price"] = round(pair["price"] + variation, 4)

    return FOREX