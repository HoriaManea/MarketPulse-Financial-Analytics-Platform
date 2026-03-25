export default async function currentEurUsrService() {
  const res = await fetch(
    "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=API_KEY",
  );

  if (!res) {
    throw new Error("Cannot fetch Forex data");
  }

  return res.json();
}
