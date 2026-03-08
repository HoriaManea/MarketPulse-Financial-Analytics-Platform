import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/dashboard";
import { useQuery } from "@tanstack/react-query";
import LogIn from "./components/LogIn";

async function fetchData() {
  const res = await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbols=[%22BTCUSDT%22,%22ETHUSDT%22,%22BNBUSD%22,%22SOLUSD%22]",
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export default function App() {
  const { data } = useQuery({
    queryKey: ["crypto"],
    queryFn: fetchData,
    refetchInterval: 1000,
  });

  console.log(data);

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard data={data} />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
}
