export default async function fetchForexDominance() {
  const res = await fetch("http://localhost:8000/forex-last-year-results");

  if (!res.ok) {
    throw new Error("Can't fetch forex dominance stats");
  }

  return res.json();
}
