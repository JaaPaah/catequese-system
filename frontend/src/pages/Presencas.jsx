import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { collection, getDocs, addDoc } from "firebase/firestore";

import { db } from "../services/firebase";

import {
  CheckCircle,
  XCircle,
  Loader2,
  Save,
  CalendarDays,
} from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Presencas() {
  const [catequizandos, setCatequizandos] = useState([]);

  const [historico, setHistorico] = useState([]);

  const [turmas, setTurmas] = useState([]);

  const [loading, setLoading] = useState(false);

  const [turma, setTurma] = useState("");

  async function carregarTurmas() {
    try {
      const snapshot = await getDocs(collection(db, "turmas"));

      const lista = [];

      snapshot.forEach((item) => {
        lista.push({
          id: item.id,
          ...item.data(),
        });
      });

      setTurmas(lista);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao carregar turmas");
    }
  }

  async function carregarCatequizandos() {
    if (!turma) {
      setCatequizandos([]);

      return;
    }

    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "catequizandos"));

      const dados = [];

      querySnapshot.forEach((item) => {
        const data = item.data();

        if (
          data.turma &&
          data.turma.toLowerCase().trim() === turma.toLowerCase().trim()
        ) {
          dados.push({
            id: item.id,
            uid: data.uid || "",
            nome: data.nome,
            turma: data.turma,
            presente: false,
          });
        }
      });

      setCatequizandos(dados);
    } catch {
      toast.error("Erro ao carregar catequizandos");
    }

    setLoading(false);
  }

  async function carregarHistorico() {
    try {
      const snapshot = await getDocs(collection(db, "presencas"));

      const lista = [];

      snapshot.forEach((item) => {
        lista.push({
          id: item.id,
          ...item.data(),
        });
      });

      lista.sort((a, b) => {
        if (!a.data || !b.data) return 0;

        return b.data.seconds - a.data.seconds;
      });

      setHistorico(lista);
    } catch (error) {
      console.log(error);
    }
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
    if (!turma) {
      toast.error("Selecione uma turma");

      return;
    }

    try {
      for (const aluno of catequizandos) {
        await addDoc(collection(db, "presencas"), {
          alunoId: aluno.id,

          uid: aluno.uid || "",

          nome: aluno.nome,

          turma,

          presente: aluno.presente,

          data: new Date(),
        });
      }

      toast.success("Presenças salvas");

      carregarHistorico();
    } catch {
      toast.error("Erro ao salvar");
    }
  }

  useEffect(() => {
    carregarTurmas();

    carregarHistorico();
  }, []);

  useEffect(() => {
    carregarCatequizandos();
  }, [turma]);

  function formatarData(data) {
    if (!data) return "";

    return data.toDate().toLocaleDateString("pt-BR");
  }

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

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <label className="text-gray-300 text-sm block mb-3">
            Selecione a turma
          </label>

          <select
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          >
            <option value="">Selecione...</option>

            {turmas.map((item) => (
              <option key={item.id} value={item.nome}>
                {item.nome}
              </option>
            ))}
          </select>
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

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <CalendarDays className="text-blue-400" size={24} />

            <h2 className="text-2xl font-bold text-white">
              Histórico de Presenças
            </h2>
          </div>

          <div className="space-y-4">
            {historico.length === 0 ? (
              <div className="text-gray-400 text-center py-10">
                Nenhum histórico encontrado
              </div>
            ) : (
              historico.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-white font-semibold">{item.nome}</h3>

                    <p className="text-gray-400 text-sm mt-1">
                      Turma: {item.turma}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      {formatarData(item.data)}
                    </p>
                  </div>

                  {item.presente ? (
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                      Presente
                    </span>
                  ) : (
                    <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm">
                      Ausente
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
