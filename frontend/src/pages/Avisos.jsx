import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import { Megaphone, Send, Loader2 } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Avisos() {
  const [titulo, setTitulo] = useState("");

  const [mensagem, setMensagem] = useState("");

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

  async function criarAviso(e) {
    e.preventDefault();

    if (!titulo || !mensagem || !turma) {
      toast.error("Preencha todos os campos");

      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "avisos"), {
        titulo,
        mensagem,
        turma,
        createdAt: new Date(),
      });

      toast.success("Aviso criado");

      setTitulo("");

      setMensagem("");

      setTurma("");
    } catch {
      toast.error("Erro ao criar aviso");
    }

    setLoading(false);
  }

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Criar Aviso</h1>

          <p className="text-gray-400 mt-2">Envie comunicados para as turmas</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">
          <form onSubmit={criarAviso} className="space-y-6">
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Título</label>

              <input
                type="text"
                placeholder="Digite o título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-4 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">
                Mensagem
              </label>

              <textarea
                placeholder="Digite a mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={6}
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 px-4 text-white outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">Turma</label>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 transition py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Publicar Aviso
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
