import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { ShieldCheck, GraduationCap, LogIn } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");

  const [tipo, setTipo] = useState("adm");

  function entrar() {
    if (!nome.trim()) {
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        nome,
        role: tipo,
      }),
    );

    if (tipo === "adm") {
      navigate("/adm");
    } else {
      navigate("/aluno");
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">CatequeseSystem</h1>

          <p className="text-gray-400 mt-3">Sistema de gerenciamento</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-gray-300 text-sm">Nome</label>

            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Tipo de acesso</label>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <button
                onClick={() => setTipo("adm")}
                className={`
                  p-4
                  rounded-2xl
                  border
                  transition
                  flex
                  flex-col
                  items-center
                  gap-3

                  ${
                    tipo === "adm"
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-slate-900 border-slate-700 text-gray-300"
                  }
                `}
              >
                <ShieldCheck size={28} />
                Administrador
              </button>

              <button
                onClick={() => setTipo("aluno")}
                className={`
                  p-4
                  rounded-2xl
                  border
                  transition
                  flex
                  flex-col
                  items-center
                  gap-3

                  ${
                    tipo === "aluno"
                      ? "bg-green-600 border-green-500 text-white"
                      : "bg-slate-900 border-slate-700 text-gray-300"
                  }
                `}
              >
                <GraduationCap size={28} />
                Aluno
              </button>
            </div>
          </div>

          <button
            onClick={entrar}
            className="w-full bg-blue-600 hover:bg-blue-500 transition py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}
