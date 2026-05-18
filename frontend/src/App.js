import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./services/ProtectedRoute";

import Catequizandos from "./pages/Catequizandos";

import Turmas from "./pages/Turmas";

import Login from "./pages/Login";

import AlunoPresenca from "./pages/AlunoPresenca";

import AlunoAvisos from "./pages/AlunoAvisos";

import Presencas from "./pages/Presencas";

export default function App() {

    localStorage.setItem(
    "user",
    JSON.stringify({
      nome: "AlunoTeste",
      role: "aluno",
    })
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adm" element={
          <ProtectedRoute role="adm">
            <Dashboard /> 
            </ProtectedRoute>
        }/>

        <Route path="/catequizandos" element={
          <ProtectedRoute role="adm">
          <Catequizandos />
        </ProtectedRoute>
        } />

        <Route path="/turmas" element={
          <ProtectedRoute role="adm"> 
          <Turmas />
          </ProtectedRoute>
        }/>

        <Route path="/presencas" element={
          <ProtectedRoute role="adm"> 
          <Presencas />
           </ProtectedRoute>
          } />

        <Route path="/login" element={
          <Login />
        } />

        <Route path="/aluno" element={
          <ProtectedRoute role="aluno"> 
          <AlunoPresenca />
          </ProtectedRoute>
        } />
        <Route path="/AlunoAvisos" element={
          <ProtectedRoute role="aluno"> 
          <AlunoAvisos />
          </ProtectedRoute>
        } />
      </Routes>

      
    </BrowserRouter>
    
  );
}
