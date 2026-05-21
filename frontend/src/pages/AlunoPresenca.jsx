import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayoutAluno";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../services/firebase";

import {
  CheckCircle,
  XCircle,
  Megaphone,
  Loader2,
  CalendarDays,
} from "lucide-react";

export default function AlunoPresenca() {
  const [presencas, setPresencas] = useState([]);

  const [avisos, setAvisos] = useState([]);

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  async function carregarDados() {
    try {
      const q = query(
        collection(db, "presencas"),
        where("uid", "==", user.uid),
      );

      const presencasSnapshot = await getDocs(q);

      const listaPresencas = [];

      presencasSnapshot.forEach((item) => {
        listaPresencas.push({
          id: item.id,
          ...item.data(),
        });
      });

      listaPresencas.sort((a, b) => {
        if (!a.data || !b.data) return 0;

        return b.data.seconds - a.data.seconds;
      });

      setPresencas(listaPresencas);

      let turmaAluno = "";

      if (listaPresencas.length > 0) {
        turmaAluno = listaPresencas[0].turma;
      }

      const avisosSnapshot = await getDocs(collection(db, "avisos"));

      const listaAvisos = [];

      avisosSnapshot.forEach((item) => {
        const data = item.data();

        if (
          data.turma &&
          turmaAluno &&
          data.turma.toLowerCase().trim() === turmaAluno.toLowerCase().trim()
        ) {
          listaAvisos.push({
            id: item.id,
            ...data,
          });
        }
      });

      setAvisos(listaAvisos);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const totalPresencas = presencas.filter((item) => item.presente).length;

  const totalFaltas = presencas.filter((item) => !item.presente).length;

  function formatarData(data) {
    if (!data) return "";

    const novaData = data.toDate();

    return novaData.toLocaleDateString("pt-BR");
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Painel do Aluno</h1>

          <p className="text-gray-400 mt-1">Histórico e avisos</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={45} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-500/20 p-4 rounded-xl">
                    <CheckCircle className="text-green-400" size={28} />
                  </div>

                  <div>
                    <p className="text-gray-400">Presenças</p>

                    <h2 className="text-3xl font-bold text-white">
                      {totalPresencas}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-red-500/20 p-4 rounded-xl">
                    <XCircle className="text-red-400" size={28} />
                  </div>

                  <div>
                    <p className="text-gray-400">Faltas</p>

                    <h2 className="text-3xl font-bold text-white">
                      {totalFaltas}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <CalendarDays className="text-blue-400" size={24} />

                <h2 className="text-white text-xl font-semibold">
                  Histórico de Presenças
                </h2>
              </div>

              <div className="space-y-4">
                {presencas.length === 0 ? (
                  <div className="text-gray-400 text-center py-10">
                    Nenhuma presença encontrada
                  </div>
                ) : (
                  presencas.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="text-white font-semibold">
                          {item.turma}
                        </h3>

                        <p className="text-gray-400 text-sm mt-1">
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

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Megaphone className="text-blue-400" size={24} />

                <h2 className="text-white text-xl font-semibold">
                  Avisos da Turma
                </h2>
              </div>

              <div className="space-y-4">
                {avisos.length === 0 ? (
                  <div className="text-gray-400 text-center py-10">
                    Nenhum aviso encontrado
                  </div>
                ) : (
                  avisos.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-5"
                    >
                      <h3 className="text-white font-semibold text-lg">
                        {item.titulo}
                      </h3>

                      <p className="text-gray-400 mt-2">{item.mensagem}</p>

                      <span className="inline-block mt-4 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {item.turma}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
