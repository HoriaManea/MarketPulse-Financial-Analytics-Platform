import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import CryptoDashboard from "./pages/CryptoDashboard";
import ForexDashboard from "./pages/ForexDashboard";
import CommoditiesDashodard from "./pages/CommoditiesDashboard";
import StocksDashboard from "./pages/StocksDashboard";
import { Settings } from "lucide-react";
import NewsDashboard from "./pages/NewsDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CryptoDashboard />} />
      <Route path="/forexdashboard" element={<ForexDashboard />} />
      <Route path="/commodities" element={<CommoditiesDashodard />} />
      <Route path="/stocks" element={<StocksDashboard />} />
      <Route path="/news" element={<NewsDashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
}
