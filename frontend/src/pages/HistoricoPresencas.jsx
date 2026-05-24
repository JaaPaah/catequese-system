import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { db } from "../services/firebase";

import { Search, Trash2 } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function HistoricoPresencas() {
  const [presencas, setPresencas] = useState([]);

  const [listaOriginal, setListaOriginal] = useState([]);

  const [turmas, setTurmas] = useState([]);

  const [busca, setBusca] = useState("");

  const [filtroTurma, setFiltroTurma] = useState("");

  async function carregarHistorico() {
    try {
      const snapshot = await getDocs(collection(db, "presencas"));

      const lista = [];

      snapshot.forEach((docItem) => {
        lista.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      lista.sort((a, b) => {
        if (!a.data || !b.data) return 0;

        return b.data.seconds - a.data.seconds;
      });

      setPresencas(lista);

      setListaOriginal(lista);
    } catch {
      toast.error("Erro ao carregar histórico");
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

  async function excluirRegistro(id) {
    const confirmar = window.confirm("Excluir este registro?");

    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "presencas", id));

      toast.success("Registro removido");

      carregarHistorico();
    } catch {
      toast.error("Erro ao excluir");
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

    setPresencas(lista);
  }

  function formatarData(data) {
    if (!data) return "";

    return data.toDate().toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    carregarHistorico();

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
          <h1 className="text-3xl font-bold text-white">Histórico Presenças</h1>

          <p className="text-gray-400 mt-2">Histórico geral do sistema</p>
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
          {presencas.map((item) => (
            <div
              key={item.id}
              className="bg-[#111827] border border-slate-800 rounded-3xl p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-5">
                <div>
                  <h2 className="text-xl font-bold text-white">{item.nome}</h2>

                  <p className="text-gray-400 mt-2">Turma: {item.turma}</p>

                  <p className="text-gray-400">
                    Data: {formatarData(item.data)}
                  </p>

                  <span
                    className={`inline-block mt-4 px-4 py-1 rounded-full text-sm ${
                      item.presente
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.presente ? "Presente" : "Ausente"}
                  </span>
                </div>

                <button
                  onClick={() => excluirRegistro(item.id)}
                  className="bg-red-600 hover:bg-red-500 transition px-5 py-3 rounded-2xl text-white flex items-center gap-2 h-fit"
                >
                  <Trash2 size={18} />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
