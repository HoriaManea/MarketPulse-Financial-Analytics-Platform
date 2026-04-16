export default async function fetchForexFullYear() {
  const res = await fetch("http://localhost:8000/forex-full-year");

  if (!res.ok) {
    throw new Error("Can't fetch last twelve months crypto price !");
  }

  return res.json();
}
