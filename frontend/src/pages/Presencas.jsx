import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

import { db } from "../services/firebase";

import { CheckCircle, XCircle, Loader2, Save, BookOpen } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function Presencas() {
  const [todosCatequizandos, setTodosCatequizandos] = useState([]);

  const [catequizandos, setCatequizandos] = useState([]);

  const [turmas, setTurmas] = useState([]);

  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  const [loading, setLoading] = useState(false);

  async function carregarDados() {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "catequizandos"));

      const dados = [];

      const listaTurmas = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        dados.push({
          id: doc.id,
          uid: data.uid || "",
          nome: data.nome || "",
          turma: data.turma || "",
          presente: false,
        });

        if (data.turma && !listaTurmas.includes(data.turma)) {
          listaTurmas.push(data.turma);
        }
      });

      setTodosCatequizandos(dados);

      setTurmas(listaTurmas);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao carregar dados");
    }

    setLoading(false);
  }

  function filtrarTurma(turma) {
    setTurmaSelecionada(turma);

    const filtrados = todosCatequizandos.filter((item) => item.turma === turma);

    setCatequizandos(filtrados);
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
      const hoje = new Date().toISOString().split("T")[0];

      for (const aluno of catequizandos) {
        const q = query(
          collection(db, "presencas"),
          where("uid", "==", aluno.uid),
          where("dataString", "==", hoje),
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          continue;
        }

        await addDoc(collection(db, "presencas"), {
          alunoId: aluno.id,
          uid: aluno.uid,
          nome: aluno.nome,
          turma: aluno.turma,
          presente: aluno.presente,
          data: new Date(),
          dataString: hoje,
        });
      }

      toast.success("Presenças salvas");
    } catch (error) {
      console.log(error);

      toast.error("Erro ao salvar");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

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
          <label className="text-gray-300 text-sm mb-3 block">
            Selecionar Turma
          </label>

          <div className="relative">
            <BookOpen
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <select
              value={turmaSelecionada}
              onChange={(e) => filtrarTurma(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none"
            >
              <option value="">Selecione uma turma</option>

              {turmas.map((turma) => (
                <option key={turma} value={turma}>
                  {turma}
                </option>
              ))}
            </select>
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
      </div>
    </MainLayout>
  );
}
