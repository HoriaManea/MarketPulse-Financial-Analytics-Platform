type Params = {
  pair: string;
  period: string;
};

export default async function fetchTradingViewForexService({
  pair,
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
    `http://localhost:8000/forex-trading-chart?pair=${pair}&interval=${interval}&limit=${limit}`,
  );

  if (!res.ok) {
    throw new Error("Can't fetch forex data!");
  }

  return res.json();
}
