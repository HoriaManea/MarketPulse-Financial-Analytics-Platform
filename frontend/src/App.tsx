import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
}
