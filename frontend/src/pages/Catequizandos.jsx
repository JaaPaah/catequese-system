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

import { UserPlus, Trash2, Pencil, Save, X, Loader2 } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Catequizandos() {
  const [nome, setNome] = useState("");

  const [turma, setTurma] = useState("");

  const [catequizandos, setCatequizandos] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editandoId, setEditandoId] = useState(null);

  const [editNome, setEditNome] = useState("");

  const [editTurma, setEditTurma] = useState("");

  async function carregarCatequizandos() {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "catequizandos"));

      const lista = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCatequizandos(lista);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao carregar catequizandos");
    }

    setLoading(false);
  }

  async function adicionarCatequizando() {
    if (!nome || !turma) {
      toast.error("Preencha todos os campos");

      return;
    }

    try {
      await addDoc(collection(db, "catequizandos"), {
        nome,
        turma,
      });

      toast.success("Catequizando adicionado");

      setNome("");

      setTurma("");

      carregarCatequizandos();
    } catch (error) {
      console.log(error);

      toast.error("Erro ao adicionar");
    }
  }

  async function excluirCatequizando(id) {
    try {
      await deleteDoc(doc(db, "catequizandos", id));

      toast.success("Catequizando removido");

      carregarCatequizandos();
    } catch (error) {
      console.log(error);

      toast.error("Erro ao excluir");
    }
  }

  function iniciarEdicao(item) {
    setEditandoId(item.id);

    setEditNome(item.nome);

    setEditTurma(item.turma);
  }

  async function salvarEdicao(id) {
    if (!editNome || !editTurma) {
      toast.error("Preencha os campos");

      return;
    }

    try {
      await updateDoc(doc(db, "catequizandos", id), {
        nome: editNome,
        turma: editTurma,
      });

      toast.success("Catequizando atualizado");

      setEditandoId(null);

      carregarCatequizandos();
    } catch (error) {
      console.log(error);

      toast.error("Erro ao atualizar");
    }
  }

  useEffect(() => {
    carregarCatequizandos();
  }, []);

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Catequizandos</h1>

          <p className="text-gray-400 mt-2">Gerencie os alunos da catequese</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 space-y-4">
          <input
            type="text"
            placeholder="Nome do catequizando"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-4 text-white outline-none"
          />

          <input
            type="text"
            placeholder="Turma"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-4 text-white outline-none"
          />

          <button
            onClick={adicionarCatequizando}
            className="bg-blue-600 hover:bg-blue-500 transition px-6 py-4 rounded-2xl text-white font-semibold flex items-center gap-2"
          >
            <UserPlus size={20} />
            Adicionar Catequizando
          </button>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="text-left text-gray-400 font-medium p-5">
                    Nome
                  </th>

                  <th className="text-left text-gray-400 font-medium p-5">
                    Turma
                  </th>

                  <th className="text-left text-gray-400 font-medium p-5">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {catequizandos.map((item) => (
                  <tr key={item.id} className="border-t border-slate-800">
                    <td className="p-5">
                      {editandoId === item.id ? (
                        <input
                          value={editNome}
                          onChange={(e) => setEditNome(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white outline-none"
                        />
                      ) : (
                        <span className="text-white">{item.nome}</span>
                      )}
                    </td>

                    <td className="p-5">
                      {editandoId === item.id ? (
                        <input
                          value={editTurma}
                          onChange={(e) => setEditTurma(e.target.value)}
                          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white outline-none"
                        />
                      ) : (
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          {item.turma}
                        </span>
                      )}
                    </td>

                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        {editandoId === item.id ? (
                          <>
                            <button
                              onClick={() => salvarEdicao(item.id)}
                              className="bg-green-600 hover:bg-green-500 transition p-3 rounded-xl text-white"
                            >
                              <Save size={18} />
                            </button>

                            <button
                              onClick={() => setEditandoId(null)}
                              className="bg-gray-600 hover:bg-gray-500 transition p-3 rounded-xl text-white"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => iniciarEdicao(item)}
                              className="bg-yellow-600 hover:bg-yellow-500 transition p-3 rounded-xl text-white"
                            >
                              <Pencil size={18} />
                            </button>

                            <button
                              onClick={() => excluirCatequizando(item.id)}
                              className="bg-red-600 hover:bg-red-500 transition p-3 rounded-xl text-white"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
