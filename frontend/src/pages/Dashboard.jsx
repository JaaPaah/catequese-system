import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  Users,
  BookOpen,
  ClipboardCheck,
  Megaphone,
  Loader2,
  Trophy,
  AlertTriangle,
} from "lucide-react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [dados, setDados] = useState({
    catequizandos: 0,
    turmas: 0,
    presencas: 0,
    avisos: 0,
  });

  const [melhorAluno, setMelhorAluno] = useState("-");

  const [maisFaltas, setMaisFaltas] = useState("-");

  const [ultimosAvisos, setUltimosAvisos] = useState([]);

  const [presentesHoje, setPresentesHoje] = useState(0);

  const [ausentesHoje, setAusentesHoje] = useState(0);

  async function carregarDados() {
    try {
      const catequizandosSnap = await getDocs(collection(db, "catequizandos"));

      const turmasSnap = await getDocs(collection(db, "turmas"));

      const presencasSnap = await getDocs(collection(db, "presencas"));

      const avisosSnap = await getDocs(collection(db, "avisos"));

      setDados({
        catequizandos: catequizandosSnap.size,

        turmas: turmasSnap.size,

        presencas: presencasSnap.size,

        avisos: avisosSnap.size,
      });

      const mapa = {};

      let presentesDia = 0;

      let ausentesDia = 0;

      const hoje = new Date().toLocaleDateString("pt-BR");

      presencasSnap.forEach((docItem) => {
        const item = docItem.data();

        const dataRegistro = item.data?.toDate()?.toLocaleDateString("pt-BR");

        if (dataRegistro === hoje) {
          if (item.presente) {
            presentesDia++;
          } else {
            ausentesDia++;
          }
        }

        if (!mapa[item.nome]) {
          mapa[item.nome] = {
            presentes: 0,
            faltas: 0,
          };
        }

        if (item.presente) {
          mapa[item.nome].presentes++;
        } else {
          mapa[item.nome].faltas++;
        }
      });

      let topAluno = "-";

      let topPresencas = -1;

      let topFaltasAluno = "-";

      let topFaltas = -1;

      Object.entries(mapa).forEach(([nome, stats]) => {
        if (stats.presentes > topPresencas) {
          topPresencas = stats.presentes;

          topAluno = nome;
        }

        if (stats.faltas > topFaltas) {
          topFaltas = stats.faltas;

          topFaltasAluno = nome;
        }
      });

      setMelhorAluno(topAluno);

      setMaisFaltas(topFaltasAluno);

      setPresentesHoje(presentesDia);

      setAusentesHoje(ausentesDia);

      const listaAvisos = [];

      avisosSnap.forEach((docItem) => {
        listaAvisos.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      listaAvisos.sort((a, b) => {
        if (!a.data || !b.data) return 0;

        return b.data.seconds - a.data.seconds;
      });

      setUltimosAvisos(listaAvisos.slice(0, 3));
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const cards = [
    {
      titulo: "Catequizandos",

      valor: dados.catequizandos,

      icon: Users,

      cor: "bg-blue-600",
    },

    {
      titulo: "Turmas",

      valor: dados.turmas,

      icon: BookOpen,

      cor: "bg-green-600",
    },

    {
      titulo: "Presentes Hoje",

      valor: presentesHoje,

      icon: ClipboardCheck,

      cor: "bg-emerald-600",
    },

    {
      titulo: "Ausentes Hoje",

      valor: ausentesHoje,

      icon: AlertTriangle,

      cor: "bg-red-600",
    },

    {
      titulo: "Presenças",

      valor: dados.presencas,

      icon: ClipboardCheck,

      cor: "bg-purple-600",
    },

    {
      titulo: "Avisos",

      valor: dados.avisos,

      icon: Megaphone,

      cor: "bg-orange-600",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>

          <p className="text-gray-400 mt-2">Visão geral do sistema</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={50} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.titulo}
                    className="bg-[#111827] border border-slate-800 rounded-3xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{card.titulo}</p>

                        <h2 className="text-4xl font-bold text-white mt-3">
                          {card.valor}
                        </h2>
                      </div>

                      <div
                        className={`${card.cor} w-16 h-16 rounded-2xl flex items-center justify-center`}
                      >
                        <Icon className="text-white" size={30} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">
                <div className="flex items-center gap-4">
                  <Trophy className="text-yellow-400" />

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Melhor Frequência
                    </h2>

                    <p className="text-gray-400 mt-2">{melhorAluno}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="text-red-400" />

                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Mais Faltas
                    </h2>

                    <p className="text-gray-400 mt-2">{maisFaltas}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Últimos Avisos
              </h2>

              <div className="space-y-4">
                {ultimosAvisos.map((aviso) => (
                  <div
                    key={aviso.id}
                    className="border border-slate-700 rounded-2xl p-5"
                  >
                    <h3 className="text-white font-bold">{aviso.titulo}</h3>

                    <p className="text-gray-400 mt-2">{aviso.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
