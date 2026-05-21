import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  Users,
  BookOpen,
  ClipboardCheck,
  Megaphone,
  Loader2,
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
        )}
      </div>
    </MainLayout>
  );
}
