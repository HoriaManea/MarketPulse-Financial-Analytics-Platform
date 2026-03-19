export default async function marketCapDominanceService() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
  );

  if (!res.ok) {
    throw new Error("Can't fetch data stats");
  }

  return res.json();
}
