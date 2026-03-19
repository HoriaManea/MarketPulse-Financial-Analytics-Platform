type CryptopParam = {
  crypto: string;
};

export default async function lastTwelveMonthsService({
  crypto,
}: CryptopParam) {
  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${crypto}USDT&interval=1M&limit=12`,
  );

  if (!res.ok) {
    throw new Error("Can't fetch last twelve months crypto price !");
  }

  return res.json();
}
