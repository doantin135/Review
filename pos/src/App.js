import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PosPage from "./pages/PosPage";
import ManagePage from "./pages/ManagePage";

export default function App() {
  return (
    <Router>
      <nav className="flex gap-4 p-4 bg-gray-200">
        <Link to="/">POS</Link>
        <Link to="/manage">Quản lý</Link>
      </nav>
      <Routes>
        <Route path="/" element={<PosPage />} />
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    </Router>
  );
}
