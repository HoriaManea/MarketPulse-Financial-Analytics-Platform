import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LogIn from "./pages/LogIn";
import CryptoDashboard from "./pages/CryptoDashboard";
import ForexDashboard from "./pages/ForexDashboard";
import CommoditiesDashodard from "./pages/CommoditiesDashboard";
import StocksDashboard from "./pages/StocksDashboard";
import { Settings } from "lucide-react";
import TableSkeleton from "./components/ui/table-skeleton";

const router = createBrowserRouter([
  {
    path: "/cryptocurrency-dashboard",
    element: <CryptoDashboard />,
  },
  {
    path: "/forex-dashboard",
    element: <ForexDashboard  />,
  },
  {
    path: "/commodities-dashboard",
    element: <CommoditiesDashodard />,
  },
  {
    path: "/stocks-dashboard",
    element: <StocksDashboard />,
  },
  {
    path: "/settings-dashboard",
    element: <Settings />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/skeleton",
    element: <TableSkeleton />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
