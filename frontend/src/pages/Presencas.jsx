import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { collection, getDocs, addDoc } from "firebase/firestore";

import { db } from "../services/firebase";

import { CheckCircle, XCircle, Loader2, Save, Search } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Presencas() {
  const [catequizandos, setCatequizandos] = useState([]);

  const [listaOriginal, setListaOriginal] = useState([]);

  const [loading, setLoading] = useState(false);

  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  const [busca, setBusca] = useState("");

  async function carregarCatequizandos() {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "catequizandos"));

      const dados = [];

      querySnapshot.forEach((item) => {
        dados.push({
          id: item.id,
          ...item.data(),
          presente: false,
        });
      });

      setListaOriginal(dados);

      setCatequizandos(dados);
    } catch {
      toast.error("Erro ao carregar catequizandos");
    }

    setLoading(false);
  }

  function togglePresenca(id) {
    const novaLista = catequizandos.map((item) =>
      item.id === id
        ? {
            ...item,
            presente: !item.presente,
          }
        : item,
    );

    setCatequizandos(novaLista);
  }

  async function salvarPresencas() {
    if (!turmaSelecionada) {
      toast.error("Selecione uma turma");

      return;
    }

    try {
      for (const aluno of catequizandos) {
        await addDoc(collection(db, "presencas"), {
          alunoId: aluno.userId || aluno.id,

          nome: aluno.nome,

          turma: aluno.turma,

          presente: aluno.presente,

          data: new Date(),
        });
      }

      toast.success("Presenças salvas");
    } catch {
      toast.error("Erro ao salvar");
    }
  }

  useEffect(() => {
    carregarCatequizandos();
  }, []);

  useEffect(() => {
    let lista = [...listaOriginal];

    if (turmaSelecionada) {
      lista = lista.filter((item) => item.turma === turmaSelecionada);
    }

    if (busca.trim()) {
      lista = lista.filter((item) =>
        item.nome.toLowerCase().includes(busca.toLowerCase()),
      );
    }

    setCatequizandos(lista);
  }, [turmaSelecionada, busca, listaOriginal]);

  const turmasUnicas = [...new Set(listaOriginal.map((item) => item.turma))];

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Controle de Presença
          </h1>

          <p className="text-gray-400 mt-1">Gerencie presenças da turma</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <select
            value={turmaSelecionada}
            onChange={(e) => setTurmaSelecionada(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          >
            <option value="">Todas as turmas</option>

            {turmasUnicas.map((turma) => (
              <option key={turma} value={turma}>
                {turma}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search size={18} className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Buscar catequizando"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none"
            />
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="text-left text-gray-400 font-medium p-5">
                    Catequizando
                  </th>

                  <th className="text-left text-gray-400 font-medium p-5">
                    Turma
                  </th>

                  <th className="text-left text-gray-400 font-medium p-5">
                    Status
                  </th>

                  <th className="text-left text-gray-400 font-medium p-5">
                    Ação
                  </th>
                </tr>
              </thead>

              <tbody>
                {catequizandos.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-800 hover:bg-slate-900 transition"
                  >
                    <td className="p-5 text-white">{item.nome}</td>

                    <td className="p-5 text-gray-300">{item.turma}</td>

                    <td className="p-5">
                      {item.presente ? (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          Presente
                        </span>
                      ) : (
                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                          Ausente
                        </span>
                      )}
                    </td>

                    <td className="p-5">
                      <button
                        onClick={() => togglePresenca(item.id)}
                        className={`
                          flex
                          items-center
                          gap-2
                          px-4
                          py-2
                          rounded-xl
                          text-white
                          transition

                          ${
                            item.presente
                              ? "bg-red-600 hover:bg-red-500"
                              : "bg-green-600 hover:bg-green-500"
                          }
                        `}
                      >
                        {item.presente ? (
                          <>
                            <XCircle size={18} />
                            Marcar Falta
                          </>
                        ) : (
                          <>
                            <CheckCircle size={18} />
                            Marcar Presença
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <button
          onClick={salvarPresencas}
          className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
        >
          <Save size={18} />
          Salvar Presenças
        </button>
      </div>
    </MainLayout>
  );
}
