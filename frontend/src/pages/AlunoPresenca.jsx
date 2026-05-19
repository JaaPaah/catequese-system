import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayoutAluno";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import { CheckCircle, XCircle, Megaphone, Loader2, Trophy } from "lucide-react";

export default function AlunoPresenca() {
  const [presencas, setPresencas] = useState([]);

  const [avisos, setAvisos] = useState([]);

  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    try {
      const presencasSnapshot = await getDocs(collection(db, "presencas"));

      const avisosSnapshot = await getDocs(collection(db, "avisos"));

      const listaPresencas = [];

      presencasSnapshot.forEach((item) => {
        listaPresencas.push({
          id: item.id,
          ...item.data(),
        });
      });

      const listaAvisos = [];

      avisosSnapshot.forEach((item) => {
        listaAvisos.push({
          id: item.id,
          ...item.data(),
        });
      });

      setPresencas(listaPresencas);

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

  const totalAulas = presencas.length;

  const porcentagem =
    totalAulas > 0 ? Math.round((totalPresencas / totalAulas) * 100) : 0;

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-500/20 p-4 rounded-xl">
                    <Trophy className="text-yellow-400" size={28} />
                  </div>

                  <div>
                    <p className="text-gray-400">Frequência</p>

                    <h2 className="text-3xl font-bold text-white">
                      {porcentagem}%
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6">
              <h2 className="text-white text-2xl font-bold">
                Continue firme 🚀
              </h2>

              <p className="text-blue-100 mt-2">
                Sua frequência atual é de <strong>{porcentagem}%</strong>
              </p>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
              <h2 className="text-white text-xl font-semibold mb-6">
                Histórico de Presenças
              </h2>

              {presencas.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  Nenhuma presença cadastrada
                </div>
              ) : (
                <div className="space-y-4">
                  {presencas.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="text-white font-semibold">
                          {item.nome}
                        </h3>

                        <p className="text-gray-400 text-sm">{item.turma}</p>
                      </div>

                      {item.presente ? (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          Presente
                        </span>
                      ) : (
                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                          Ausente
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Megaphone className="text-blue-400" size={24} />

                <h2 className="text-white text-xl font-semibold">Avisos</h2>
              </div>

              {avisos.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  Nenhum aviso disponível
                </div>
              ) : (
                <div className="space-y-4">
                  {avisos.map((item) => (
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
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
