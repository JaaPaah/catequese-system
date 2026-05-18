import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

import { Trash2, Pencil, Save, Search, Loader2, BookOpen } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Turmas() {
  const [nome, setNome] = useState("");

  const [catequista, setCatequista] = useState("");

  const [periodo, setPeriodo] = useState("");

  const [busca, setBusca] = useState("");

  const [lista, setLista] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editandoId, setEditandoId] = useState(null);

  const [turmaEditada, setTurmaEditada] = useState({
    nome: "",
    catequista: "",
    periodo: "",
  });

  async function carregarTurmas() {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "turmas"));

      const dados = [];

      querySnapshot.forEach((item) => {
        dados.push({
          id: item.id,
          ...item.data(),
        });
      });

      setLista(dados);
    } catch {
      toast.error("Erro ao carregar turmas");
    }

    setLoading(false);
  }

  async function salvarTurma() {
    if (!nome.trim() || !catequista.trim() || !periodo.trim()) {
      toast.error("Preencha todos os campos");

      return;
    }

    try {
      await addDoc(collection(db, "turmas"), {
        nome,
        catequista,
        periodo,
        criadoEm: new Date(),
      });

      toast.success("Turma criada");

      setNome("");
      setCatequista("");
      setPeriodo("");

      carregarTurmas();
    } catch {
      toast.error("Erro ao salvar");
    }
  }

  async function excluirTurma(id) {
    try {
      await deleteDoc(doc(db, "turmas", id));

      toast.success("Turma excluída");

      carregarTurmas();
    } catch {
      toast.error("Erro ao excluir");
    }
  }

  async function salvarEdicao(id) {
    try {
      await updateDoc(doc(db, "turmas", id), turmaEditada);

      toast.success("Turma atualizada");

      setEditandoId(null);

      carregarTurmas();
    } catch {
      toast.error("Erro ao editar");
    }
  }

  useEffect(() => {
    carregarTurmas();
  }, []);

  const listaFiltrada = lista.filter((item) =>
    item.nome?.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Turmas</h1>

          <p className="text-gray-400 mt-1">Gerenciamento de turmas</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nome da turma"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
            />

            <input
              type="text"
              placeholder="Catequista"
              value={catequista}
              onChange={(e) => setCatequista(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
            />

            <input
              type="text"
              placeholder="Período"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
            />
          </div>

          <button
            onClick={salvarTurma}
            className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
          >
            <BookOpen size={18} />
            Salvar Turma
          </button>

          <div className="relative">
            <Search
              className="absolute left-4 top-3.5 text-gray-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Buscar turma..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none"
            />
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-semibold">
              Lista de Turmas
            </h2>

            <span className="text-gray-400 text-sm">
              {listaFiltrada.length} turmas
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
          ) : (
            <div className="space-y-4">
              {listaFiltrada.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4"
                >
                  {editandoId === item.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input
                        type="text"
                        value={turmaEditada.nome}
                        onChange={(e) =>
                          setTurmaEditada({
                            ...turmaEditada,
                            nome: e.target.value,
                          })
                        }
                        className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                      />

                      <input
                        type="text"
                        value={turmaEditada.catequista}
                        onChange={(e) =>
                          setTurmaEditada({
                            ...turmaEditada,
                            catequista: e.target.value,
                          })
                        }
                        className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                      />

                      <input
                        type="text"
                        value={turmaEditada.periodo}
                        onChange={(e) =>
                          setTurmaEditada({
                            ...turmaEditada,
                            periodo: e.target.value,
                          })
                        }
                        className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                      />

                      <button
                        onClick={() => salvarEdicao(item.id)}
                        className="bg-green-600 hover:bg-green-500 transition rounded-lg text-white flex items-center justify-center gap-2"
                      >
                        <Save size={18} />
                        Salvar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-white text-lg font-semibold">
                          {item.nome}
                        </h3>

                        <p className="text-gray-400">
                          Catequista: {item.catequista}
                        </p>

                        <p className="text-gray-500 text-sm">{item.periodo}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditandoId(item.id);

                            setTurmaEditada({
                              nome: item.nome,
                              catequista: item.catequista,
                              periodo: item.periodo,
                            });
                          }}
                          className="bg-yellow-600 hover:bg-yellow-500 transition p-2 rounded-lg text-white"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => excluirTurma(item.id)}
                          className="bg-red-600 hover:bg-red-500 transition p-2 rounded-lg text-white"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
