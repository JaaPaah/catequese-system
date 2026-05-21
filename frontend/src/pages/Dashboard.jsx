import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  Users,
  BookOpen,
  ClipboardCheck,
  Megaphone,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

import { db } from "../services/firebase";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [dados, setDados] = useState({
    catequizandos: 0,
    turmas: 0,
    presencas: 0,
    avisos: 0,
    presentes: 0,
    faltas: 0,
  });

  const [ultimosAvisos, setUltimosAvisos] = useState([]);

  async function carregarDados() {
    try {
      const catequizandosSnap = await getDocs(collection(db, "catequizandos"));

      const turmasSnap = await getDocs(collection(db, "turmas"));

      const presencasSnap = await getDocs(collection(db, "presencas"));

      const avisosSnap = await getDocs(collection(db, "avisos"));

      let presentes = 0;

      let faltas = 0;

      presencasSnap.forEach((doc) => {
        const data = doc.data();

        if (data.presente) {
          presentes++;
        } else {
          faltas++;
        }
      });

      const avisosQuery = query(
        collection(db, "avisos"),
        orderBy("createdAt", "desc"),
        limit(5),
      );

      const avisosRecentes = await getDocs(avisosQuery);

      const listaAvisos = [];

      avisosRecentes.forEach((doc) => {
        listaAvisos.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setUltimosAvisos(listaAvisos);

      setDados({
        catequizandos: catequizandosSnap.size,
        turmas: turmasSnap.size,
        presencas: presencasSnap.size,
        avisos: avisosSnap.size,
        presentes,
        faltas,
      });
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

    {
      titulo: "Presentes",
      valor: dados.presentes,
      icon: CheckCircle,
      cor: "bg-emerald-600",
    },

    {
      titulo: "Faltas",
      valor: dados.faltas,
      icon: XCircle,
      cor: "bg-red-600",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>

          <p className="text-gray-400 mt-2">
            Visão geral do sistema de catequese
          </p>
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

            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Megaphone className="text-blue-400" />

                <h2 className="text-2xl font-bold text-white">
                  Últimos Avisos
                </h2>
              </div>

              <div className="space-y-4">
                {ultimosAvisos.length === 0 ? (
                  <p className="text-gray-400">Nenhum aviso encontrado</p>
                ) : (
                  ultimosAvisos.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold text-lg">
                          {item.titulo}
                        </h3>

                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          {item.turma}
                        </span>
                      </div>

                      <p className="text-gray-400 mt-3">{item.mensagem}</p>
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
