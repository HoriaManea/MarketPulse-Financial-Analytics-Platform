type ForexPair = {
  id: number;
  pair: string;
  base: string;
  quote: string;
  bid?: number;
  ask?: number;
  price?: number;
  flags: string[];
};

export default async function fetchForex(): Promise<ForexPair[]> {
  const urls = ["http://127.0.0.1:8000/rates"];

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
