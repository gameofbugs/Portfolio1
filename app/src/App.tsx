// @ts-nocheck
import { Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Admin from "./pages/admin/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
