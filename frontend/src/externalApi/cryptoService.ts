export default async function fetchCrypto() {
  const res = await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbols=[%22BTCUSDT%22,%22ETHUSDT%22,%22BNBUSDT%22,%22SOLUSDT%22]",
  );

  if (!res.ok) {
    throw new Error("Can't fetch crypto prices");
  }

  return res.json();
}
