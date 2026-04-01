export type ForexRate = {
  "1. From_Currency Code": string;
  "2. From_Currency Name": string;
  "3. To_Currency Code": string;
  "4. To_Currency Name": string;
  "5. Exchange Rate": string;
  "6. Last Refreshed": string;
  "7. Time Zone": string;
  "8. Bid Price": string;
  "9. Ask Price": string;
};

export type ForexResponse = {
  "Realtime Currency Exchange Rate": ForexRate;
};

export default async function currentEurUsrService(): Promise<ForexResponse[]> {
  const urls = [
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=API_KEY`,
  ];

  const responses = await Promise.all(urls.map((url) => fetch(url)));

  const data = await Promise.all(
    responses.map((res) => {
      if (!res.ok) {
        throw new Error("Fetch failed");
      }
      return res.json();
    }),
  );

  return data;
}
