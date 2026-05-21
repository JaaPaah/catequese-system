import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../services/firebase";

import { Megaphone, Trash2, Pencil, Save, X } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Avisos() {
  const [titulo, setTitulo] = useState("");

  const [descricao, setDescricao] = useState("");

  const [turma, setTurma] = useState("GERAL");

  const [turmas, setTurmas] = useState([]);

  const [avisos, setAvisos] = useState([]);

  const [editandoId, setEditandoId] = useState(null);

  const [editTitulo, setEditTitulo] = useState("");

  const [editDescricao, setEditDescricao] = useState("");

  const [editTurma, setEditTurma] = useState("");

  async function carregarTurmas() {
    try {
      const snapshot = await getDocs(collection(db, "turmas"));

      const lista = [];

      snapshot.forEach((doc) => {
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

  async function carregarAvisos() {
    try {
      const snapshot = await getDocs(collection(db, "avisos"));

      const lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      lista.sort((a, b) => {
        if (!a.data || !b.data) return 0;

        return b.data.seconds - a.data.seconds;
      });

      setAvisos(lista);
    } catch {
      toast.error("Erro ao carregar avisos");
    }
  }

  async function criarAviso(e) {
    e.preventDefault();

    if (!titulo || !descricao) {
      toast.error("Preencha todos os campos");

      return;
    }

    try {
      await addDoc(collection(db, "avisos"), {
        titulo,
        descricao,
        turma,
        data: new Date(),
      });

      toast.success("Aviso criado");

      setTitulo("");

      setDescricao("");

      setTurma("GERAL");

      carregarAvisos();
    } catch {
      toast.error("Erro ao criar aviso");
    }
  }

  async function excluirAviso(id) {
    const confirmar = window.confirm("Deseja excluir este aviso?");

    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "avisos", id));

      toast.success("Aviso removido");

      carregarAvisos();
    } catch {
      toast.error("Erro ao excluir");
    }
  }

  function iniciarEdicao(item) {
    setEditandoId(item.id);

    setEditTitulo(item.titulo);

    setEditDescricao(item.descricao);

    setEditTurma(item.turma);
  }

  function cancelarEdicao() {
    setEditandoId(null);
  }

  async function salvarEdicao(id) {
    try {
      await updateDoc(doc(db, "avisos", id), {
        titulo: editTitulo,
        descricao: editDescricao,
        turma: editTurma,
      });

      toast.success("Aviso atualizado");

      cancelarEdicao();

      carregarAvisos();
    } catch {
      toast.error("Erro ao atualizar");
    }
  }

  function formatarData(data) {
    if (!data) return "";

    return data.toDate().toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    carregarAvisos();

    carregarTurmas();
  }, []);

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Avisos</h1>

          <p className="text-gray-400 mt-2">Gerencie os avisos do sistema</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">
          <form onSubmit={criarAviso} className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none"
            />

            <textarea
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none h-32"
            />

            <select
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none"
            >
              <option value="GERAL">Aviso Geral</option>

              {turmas.map((item) => (
                <option key={item.id} value={item.nome}>
                  {item.nome}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-2xl text-white font-semibold flex items-center gap-2"
            >
              <Megaphone size={18} />
              Criar Aviso
            </button>
          </form>
        </div>

        <div className="grid gap-5">
          {avisos.map((item) => (
            <div
              key={item.id}
              className="bg-[#111827] border border-slate-800 rounded-3xl p-6"
            >
              {editandoId === item.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editTitulo}
                    onChange={(e) => setEditTitulo(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none"
                  />

                  <textarea
                    value={editDescricao}
                    onChange={(e) => setEditDescricao(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none h-32"
                  />

                  <select
                    value={editTurma}
                    onChange={(e) => setEditTurma(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-white outline-none"
                  >
                    <option value="GERAL">Aviso Geral</option>

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
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {item.titulo}
                      </h2>

                      <p className="text-gray-400 mt-2">{item.descricao}</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => iniciarEdicao(item)}
                        className="bg-yellow-600 hover:bg-yellow-500 transition p-3 rounded-2xl text-white"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => excluirAviso(item.id)}
                        className="bg-red-600 hover:bg-red-500 transition p-3 rounded-2xl text-white"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {item.turma}
                    </span>

                    <span className="text-gray-500 text-sm">
                      {formatarData(item.data)}
                    </span>
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
