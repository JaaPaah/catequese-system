import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { User, Lock, Shield, GraduationCap, Loader2 } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

import { signInWithEmailAndPassword } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../services/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");

  const [senha, setSenha] = useState("");

  const [tipo, setTipo] = useState("adm");

  const [loading, setLoading] = useState(false);

  async function fazerLogin(e) {
    e.preventDefault();

    if (!usuario || !senha) {
      toast.error("Preencha todos os campos");

      return;
    }

    try {
      setLoading(true);

      const response = await signInWithEmailAndPassword(auth, usuario, senha);

      const uid = response.user.uid;

      const userRef = doc(db, "usuarios", uid);

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("Usuário não encontrado");

        setLoading(false);

        return;
      }

      const dadosUsuario = userSnap.data();

      if (dadosUsuario.role !== tipo) {
        toast.error("Tipo de acesso inválido");

        setLoading(false);

        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          uid,
          nome: dadosUsuario.nome,
          role: dadosUsuario.role,
          turma: dadosUsuario.turma || "",
        }),
      );

      toast.success("Login realizado");

      setTimeout(() => {
        if (dadosUsuario.role === "adm") {
          navigate("/adm");
        } else {
          navigate("/aluno");
        }
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("E-mail ou senha inválidos");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center mx-auto mb-5">
            <Shield className="text-blue-400" size={40} />
          </div>

          <h1 className="text-4xl font-bold text-white">Catequese</h1>

          <p className="text-gray-400 mt-3">Sistema de gerenciamento</p>
        </div>

        <form onSubmit={fazerLogin} className="space-y-6">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">
              Tipo de acesso
            </label>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTipo("adm")}
                className={`
                  p-4
                  rounded-2xl
                  border
                  transition
                  flex
                  flex-col
                  items-center
                  gap-2

                  ${
                    tipo === "adm"
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-slate-900 border-slate-700 text-gray-300"
                  }
                `}
              >
                <Shield size={24} />
                Admin
              </button>

              <button
                type="button"
                onClick={() => setTipo("aluno")}
                className={`
                  p-4
                  rounded-2xl
                  border
                  transition
                  flex
                  flex-col
                  items-center
                  gap-2

                  ${
                    tipo === "aluno"
                      ? "bg-green-600 border-green-500 text-white"
                      : "bg-slate-900 border-slate-700 text-gray-300"
                  }
                `}
              >
                <GraduationCap size={24} />
                Aluno
              </button>
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">E-mail</label>

            <div className="relative">
              <User size={18} className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">Senha</label>

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-4 text-gray-400" />

              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 transition py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
