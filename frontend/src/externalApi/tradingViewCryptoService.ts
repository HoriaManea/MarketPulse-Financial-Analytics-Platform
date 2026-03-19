type Params = {
  crypto: string;
  period: string;
};

export default async function tradingViewCryptoService({
  crypto,
  period,
}: Params) {
  let interval = "1d";
  let limit = 30;

  if (period === "Last Day") {
    interval = "1h";
    limit = 24;
  }

  if (period === "Last Week") {
    interval = "1d";
    limit = 7;
  }

  if (period === "Last Month") {
    interval = "1d";
    limit = 30;
  }

  const res = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${crypto}USDT&interval=${interval}&limit=${limit}`,
  );

  if (!res.ok) {
    throw new Error("Can't fetch crypto data!");
  }

  return res.json();
}
