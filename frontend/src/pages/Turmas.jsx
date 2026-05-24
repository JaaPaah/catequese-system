import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../services/firebase";

import { BookOpen, Trash2, Loader2, Users } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Turmas() {
  const [nome, setNome] = useState("");

  const [turmas, setTurmas] = useState([]);

  const [loading, setLoading] = useState(false);

  async function carregarTurmas() {
    setLoading(true);

    try {
      const turmasSnap = await getDocs(collection(db, "turmas"));

      const catequizandosSnap = await getDocs(collection(db, "catequizandos"));

      const contador = {};

      catequizandosSnap.forEach((docItem) => {
        const aluno = docItem.data();

        contador[aluno.turma] = (contador[aluno.turma] || 0) + 1;
      });

      const dados = [];

      turmasSnap.forEach((item) => {
        const turma = item.data();

        dados.push({
          id: item.id,

          ...turma,

          quantidade: contador[turma.nome] || 0,
        });
      });

      setTurmas(dados);
    } catch {
      toast.error("Erro ao carregar turmas");
    }

    setLoading(false);
  }

  async function salvarTurma() {
    if (!nome.trim()) {
      toast.error("Digite o nome da turma");

      return;
    }

    try {
      await addDoc(collection(db, "turmas"), {
        nome,

        criadoEm: new Date(),
      });

      toast.success("Turma criada");

      setNome("");

      carregarTurmas();
    } catch {
      toast.error("Erro ao salvar");
    }
  }

  async function excluirTurma(turma) {
    if (turma.quantidade > 0) {
      toast.error("Remova os alunos da turma antes de excluir");

      return;
    }

    const confirmar = window.confirm(`Excluir turma ${turma.nome}?`);

    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "turmas", turma.id));

      toast.success("Turma excluída");

      carregarTurmas();
    } catch {
      toast.error("Erro ao excluir");
    }
  }

  useEffect(() => {
    carregarTurmas();
  }, []);

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Turmas</h1>

          <p className="text-gray-400 mt-1">Gerencie as turmas da catequese</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Nome da turma"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
            />

            <button
              onClick={salvarTurma}
              className="bg-blue-600 hover:bg-blue-500 transition px-6 rounded-xl text-white font-semibold flex items-center gap-2"
            >
              <BookOpen size={18} />
              Salvar
            </button>
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <h2 className="text-white text-xl font-semibold mb-6">
            Lista de Turmas
          </h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
          ) : (
            <div className="space-y-4">
              {turmas.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-xl">
                      <BookOpen className="text-blue-400" size={22} />
                    </div>

                    <div>
                      <h2 className="text-white font-bold text-lg">
                        {item.nome}
                      </h2>

                      <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                        <Users size={16} />
                        {item.quantidade} alunos
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => excluirTurma(item)}
                    className="bg-red-600 hover:bg-red-500 transition p-3 rounded-lg text-white"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
