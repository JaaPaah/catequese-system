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

import { Megaphone, Trash2, Loader2 } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Avisos() {
  const [titulo, setTitulo] = useState("");

  const [mensagem, setMensagem] = useState("");

  const [turma, setTurma] = useState("");

  const [avisos, setAvisos] = useState([]);

  const [loading, setLoading] = useState(false);

  async function carregarAvisos() {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "avisos"));

      const dados = [];

      querySnapshot.forEach((item) => {
        dados.push({
          id: item.id,
          ...item.data(),
        });
      });

      setAvisos(dados);
    } catch {
      toast.error("Erro ao carregar avisos");
    }

    setLoading(false);
  }

  async function salvarAviso() {
    if (!titulo.trim() || !mensagem.trim() || !turma.trim()) {
      toast.error("Preencha todos os campos");

      return;
    }

    try {
      await addDoc(collection(db, "avisos"), {
        titulo,
        mensagem,
        turma,
        criadoEm: new Date(),
      });

      toast.success("Aviso criado");

      setTitulo("");
      setMensagem("");
      setTurma("");

      carregarAvisos();
    } catch {
      toast.error("Erro ao salvar aviso");
    }
  }

  async function excluirAviso(id) {
    try {
      await deleteDoc(doc(db, "avisos", id));

      toast.success("Aviso excluído");

      carregarAvisos();
    } catch {
      toast.error("Erro ao excluir");
    }
  }

  useEffect(() => {
    carregarAvisos();
  }, []);

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Avisos</h1>

          <p className="text-gray-400 mt-1">Comunicação com alunos</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
          <input
            type="text"
            placeholder="Título do aviso"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <textarea
            placeholder="Mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows={5}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none resize-none"
          />

          <input
            type="text"
            placeholder="Turma"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          />

          <button
            onClick={salvarAviso}
            className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
          >
            <Megaphone size={18} />
            Publicar Aviso
          </button>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <h2 className="text-white text-xl font-semibold mb-6">
            Avisos Publicados
          </h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
          ) : (
            <div className="space-y-4">
              {avisos.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-white text-lg font-semibold">
                        {item.titulo}
                      </h3>

                      <p className="text-gray-400 mt-2">{item.mensagem}</p>

                      <span className="inline-block mt-4 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {item.turma}
                      </span>
                    </div>

                    <button
                      onClick={() => excluirAviso(item.id)}
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
