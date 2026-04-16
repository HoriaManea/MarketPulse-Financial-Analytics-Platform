export default async function fetchCryptoDominance() {
  const res = await fetch("http://localhost:8000/crypto-dominance");

  if (!res.ok) {
    throw new Error("Can't fetch data stats");
  }

  return res.json();
}
