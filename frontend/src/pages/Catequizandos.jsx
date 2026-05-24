import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../services/firebase";

import { Trash2, Pencil, Save, X, Search } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Catequizandos() {
  const [catequizandos, setCatequizandos] = useState([]);

  const [listaOriginal, setListaOriginal] = useState([]);

  const [turmas, setTurmas] = useState([]);

  const [busca, setBusca] = useState("");

  const [filtroTurma, setFiltroTurma] = useState("");

  const [editandoId, setEditandoId] = useState(null);

  const [editNome, setEditNome] = useState("");

  const [editTurma, setEditTurma] = useState("");

  async function carregarCatequizandos() {
    try {
      const querySnapshot = await getDocs(collection(db, "catequizandos"));

      const lista = [];

      querySnapshot.forEach((docItem) => {
        lista.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      setCatequizandos(lista);

      setListaOriginal(lista);
    } catch {
      toast.error("Erro ao carregar catequizandos");
    }
  }

  async function carregarTurmas() {
    try {
      const snapshot = await getDocs(collection(db, "turmas"));

      const lista = [];

      snapshot.forEach((docItem) => {
        lista.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      setTurmas(lista);
    } catch {
      toast.error("Erro ao carregar turmas");
    }
  }

  async function excluirCatequizando(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este catequizando?",
    );

    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "catequizandos", id));

      toast.success("Catequizando removido");

      carregarCatequizandos();
    } catch {
      toast.error("Erro ao excluir");
    }
  }

  function iniciarEdicao(item) {
    setEditandoId(item.id);

    setEditNome(item.nome);

    setEditTurma(item.turma);
  }

  function cancelarEdicao() {
    setEditandoId(null);

    setEditNome("");

    setEditTurma("");
  }

  async function salvarEdicao(id) {
    if (!editNome || !editTurma) {
      toast.error("Preencha todos os campos");

      return;
    }

    try {
      await updateDoc(doc(db, "catequizandos", id), {
        nome: editNome,
        turma: editTurma,
      });

      toast.success("Catequizando atualizado");

      cancelarEdicao();

      carregarCatequizandos();
    } catch {
      toast.error("Erro ao atualizar");
    }
  }

  function aplicarFiltros() {
    let lista = [...listaOriginal];

    if (busca.trim()) {
      lista = lista.filter((item) =>
        item.nome?.toLowerCase().includes(busca.toLowerCase()),
      );
    }

    if (filtroTurma) {
      lista = lista.filter(
        (item) => item.turma?.toLowerCase() === filtroTurma.toLowerCase(),
      );
    }

    setCatequizandos(lista);
  }

  useEffect(() => {
    carregarCatequizandos();

    carregarTurmas();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [busca, filtroTurma]);

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Catequizandos</h1>

          <p className="text-gray-400 mt-2">
            Gerencie os catequizandos cadastrados
          </p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Buscar por nome"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-white outline-none"
              />
            </div>

            <select
              value={filtroTurma}
              onChange={(e) => setFiltroTurma(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none"
            >
              <option value="">Todas as turmas</option>

              {turmas.map((turma) => (
                <option key={turma.id} value={turma.nome}>
                  {turma.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-5">
          {catequizandos.map((item) => (
            <div
              key={item.id}
              className="bg-[#111827] border border-slate-800 rounded-3xl p-6"
            >
              {editandoId === item.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editNome}
                    onChange={(e) => setEditNome(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none"
                  />

                  <select
                    value={editTurma}
                    onChange={(e) => setEditTurma(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none"
                  >
                    <option value="">Selecione uma turma</option>

                    {turmas.map((turma) => (
                      <option key={turma.id} value={turma.nome}>
                        {turma.nome}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-3">
                    <button
                      onClick={() => salvarEdicao(item.id)}
                      className="bg-green-600 hover:bg-green-500 transition px-5 py-3 rounded-2xl text-white flex items-center gap-2"
                    >
                      <Save size={18} />
                      Salvar
                    </button>

                    <button
                      onClick={cancelarEdicao}
                      className="bg-gray-600 hover:bg-gray-500 transition px-5 py-3 rounded-2xl text-white flex items-center gap-2"
                    >
                      <X size={18} />
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {item.nome}
                    </h2>

                    <p className="text-gray-400 mt-1">Turma: {item.turma}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => iniciarEdicao(item)}
                      className="bg-yellow-600 hover:bg-yellow-500 transition px-5 py-3 rounded-2xl text-white flex items-center gap-2"
                    >
                      <Pencil size={18} />
                      Editar
                    </button>

                    <button
                      onClick={() => excluirCatequizando(item.id)}
                      className="bg-red-600 hover:bg-red-500 transition px-5 py-3 rounded-2xl text-white flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
