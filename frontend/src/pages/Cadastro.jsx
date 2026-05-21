import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  UserPlus,
  Mail,
  Lock,
  User,
  GraduationCap,
  Shield,
  Loader2,
} from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";

import { auth, db } from "../services/firebase";

export default function Cadastro() {
  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  const [role, setRole] = useState("aluno");

  const [turma, setTurma] = useState("");

  const [turmas, setTurmas] = useState([]);

  const [loading, setLoading] = useState(false);

  async function carregarTurmas() {
    try {
      const querySnapshot = await getDocs(collection(db, "turmas"));

      const lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setTurmas(lista);
    } catch {
      toast.error("Erro ao carregar turmas");
    }
  }

  useEffect(() => {
    carregarTurmas();
  }, []);

  async function cadastrarUsuario(e) {
    e.preventDefault();

    if (!nome || !email || !senha) {
      toast.error("Preencha todos os campos");

      return;
    }

    try {
      setLoading(true);

      const response = await createUserWithEmailAndPassword(auth, email, senha);

      const uid = response.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        nome,
        email,
        role,
        turma,
      });

      if (role === "aluno") {
        await addDoc(collection(db, "catequizandos"), {
          nome,
          email,
          turma,
          uid,
        });
      }

      toast.success("Usuário criado com sucesso");

      setNome("");

      setEmail("");

      setSenha("");

      setRole("aluno");

      setTurma("");
    } catch (error) {
      console.log(error);

      toast.error("Erro ao criar usuário");
    }

    setLoading(false);
  }

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Cadastro de Usuários
          </h1>

          <p className="text-gray-400 mt-2">Crie alunos e administradores</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">
          <form onSubmit={cadastrarUsuario} className="space-y-6">
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Nome</label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Digite o nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">E-mail</label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Digite o e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">Senha</label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Digite a senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Tipo de usuário
              </label>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("adm")}
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
                      role === "adm"
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
                  onClick={() => setRole("aluno")}
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
                      role === "aluno"
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

            {role === "aluno" && (
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Turma
                </label>

                <select
                  value={turma}
                  onChange={(e) => setTurma(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-4 text-white outline-none focus:border-blue-500"
                >
                  <option value="">Selecione a turma</option>

                  {turmas.map((item) => (
                    <option key={item.id} value={item.nome}>
                      {item.nome}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 transition py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Criando...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Criar Usuário
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
