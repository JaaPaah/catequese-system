import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Catequizandos from "./pages/Catequizandos";

import Turmas from "./pages/Turmas";

import Login from "./pages/Login";

import Presencas from "./pages/Presencas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/catequizandos" element={<Catequizandos />} />

        <Route path="/turmas" element={<Turmas />} />

        <Route path="/presencas" element={<Presencas />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
