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
      <Route path="/cryptocurrency-dashboard" element={<CryptoDashboard />} />
      <Route path="/forex-dashboard" element={<ForexDashboard />} />
      <Route path="/commodities-dashboard" element={<CommoditiesDashodard />} />
      <Route path="/stocks-dashboard" element={<StocksDashboard />} />
      <Route path="/news-dashboard" element={<NewsDashboard />} />
      <Route path="/settings-dashboard" element={<Settings />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
}
