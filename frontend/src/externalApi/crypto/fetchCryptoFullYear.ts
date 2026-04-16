export default async function fetchCryptoFullYear() {
  const res = await fetch(
    "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1M&limit=12",
  );

  if (!res.ok) {
    throw new Error("Can't fetch last twelve months crypto price !");
  }

  return res.json();
}
