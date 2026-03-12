export async function cryptoNewsService() {
  const res = await fetch("https://cryptocurrency.cv/api/news");

  if (!res) {
    throw new Error("Cant fetch crypto news");
  }

  return res.json();
}
