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

import { Trash2, UserPlus, Pencil, Search, Loader2, Save } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Catequizandos() {
  const [nome, setNome] = useState("");

  const [busca, setBusca] = useState("");

  const [lista, setLista] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editandoId, setEditandoId] = useState(null);

  const [novoNome, setNovoNome] = useState("");

  async function carregarCatequizandos() {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "catequizandos"));

      const dados = [];

      querySnapshot.forEach((item) => {
        dados.push({
          id: item.id,
          ...item.data(),
        });
      });

      setLista(dados);
    } catch (error) {
      toast.error("Erro ao carregar");
    }

    setLoading(false);
  }

  async function salvarCatequizando() {
    if (!nome.trim()) {
      toast.error("Digite um nome");
      return;
    }

    try {
      await addDoc(collection(db, "catequizandos"), {
        nome,
        criadoEm: new Date(),
      });

      toast.success("Catequizando salvo");

      setNome("");

      carregarCatequizandos();
    } catch (error) {
      toast.error("Erro ao salvar");
    }
  }

  async function excluirCatequizando(id) {
    try {
      await deleteDoc(doc(db, "catequizandos", id));

      toast.success("Excluído");

      carregarCatequizandos();
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  }

  async function salvarEdicao(id) {
    if (!novoNome.trim()) {
      toast.error("Digite um nome");
      return;
    }

    try {
      await updateDoc(doc(db, "catequizandos", id), {
        nome: novoNome,
      });

      toast.success("Atualizado");

      setEditandoId(null);

      setNovoNome("");

      carregarCatequizandos();
    } catch (error) {
      toast.error("Erro ao editar");
    }
  }

  useEffect(() => {
    carregarCatequizandos();
  }, []);

  const listaFiltrada = lista.filter((item) =>
    item.nome?.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Catequizandos</h1>

          <p className="text-gray-400 mt-1">Gerenciamento completo</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Nome do catequizando"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
            />

            <button
              onClick={salvarCatequizando}
              className="bg-blue-600 hover:bg-blue-500 transition px-6 rounded-xl text-white font-semibold flex items-center gap-2"
            >
              <UserPlus size={18} />
              Salvar
            </button>
          </div>

          <div className="relative">
            <Search
              className="absolute left-4 top-3.5 text-gray-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Buscar catequizando..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white outline-none"
            />
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-semibold">
              Lista de Catequizandos
            </h2>

            <span className="text-gray-400 text-sm">
              {listaFiltrada.length} registros
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
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4"
                >
                  {editandoId === item.id ? (
                    <input
                      type="text"
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white outline-none"
                    />
                  ) : (
                    <span className="text-white">{item.nome}</span>
                  )}

                  <div className="flex items-center gap-2">
                    {editandoId === item.id ? (
                      <button
                        onClick={() => salvarEdicao(item.id)}
                        className="bg-green-600 hover:bg-green-500 transition p-2 rounded-lg text-white"
                      >
                        <Save size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditandoId(item.id);
                          setNovoNome(item.nome);
                        }}
                        className="bg-yellow-600 hover:bg-yellow-500 transition p-2 rounded-lg text-white"
                      >
                        <Pencil size={18} />
                      </button>
                    )}

                    <button
                      onClick={() => excluirCatequizando(item.id)}
                      className="bg-red-600 hover:bg-red-500 transition p-2 rounded-lg text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
