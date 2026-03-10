import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/dashboard";
import LogIn from "./pages/LogIn";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
}
