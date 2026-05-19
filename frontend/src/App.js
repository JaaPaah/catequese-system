import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./services/ProtectedRoute";

import Catequizandos from "./pages/Catequizandos";

import Turmas from "./pages/Turmas";

import Login from "./pages/Login";

import AlunoPresenca from "./pages/AlunoPresenca";

import Presencas from "./pages/Presencas";

import Avisos from "./pages/Avisos";

import AvisosAluno from "./pages/AvisosAluno";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/adm"
          element={
            <ProtectedRoute role="adm">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/catequizandos"
          element={
            <ProtectedRoute role="adm">
              <Catequizandos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/turmas"
          element={
            <ProtectedRoute role="adm">
              <Turmas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/presencas"
          element={
            <ProtectedRoute role="adm">
              <Presencas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/avisos"
          element={
            <ProtectedRoute role="adm">
              <Avisos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/aluno"
          element={
            <ProtectedRoute role="aluno">
              <AlunoPresenca />
            </ProtectedRoute>
          }
        />

        <Route
          path="/avisos-aluno"
          element={
            <ProtectedRoute role="aluno">
              <AvisosAluno />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
