import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import {
  Users,
  BookOpen,
  ClipboardCheck,
  Megaphone,
  Loader2,
} from "lucide-react";

export default function Dashboard() {
  const [totalCatequizandos, setTotalCatequizandos] = useState(0);

  const [totalTurmas, setTotalTurmas] = useState(0);

  const [totalPresencas, setTotalPresencas] = useState(0);

  const [totalAvisos, setTotalAvisos] = useState(0);

  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    try {
      const catequizandos = await getDocs(collection(db, "catequizandos"));

      const turmas = await getDocs(collection(db, "turmas"));

      const presencas = await getDocs(collection(db, "presencas"));

      const avisos = await getDocs(collection(db, "avisos"));

      setTotalCatequizandos(catequizandos.size);

      setTotalTurmas(turmas.size);

      setTotalPresencas(presencas.size);

      setTotalAvisos(avisos.size);
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
      valor: totalCatequizandos,
      icon: Users,
      color: "bg-blue-500/20 text-blue-400",
    },

    {
      titulo: "Turmas",
      valor: totalTurmas,
      icon: BookOpen,
      color: "bg-green-500/20 text-green-400",
    },

    {
      titulo: "Presenças",
      valor: totalPresencas,
      icon: ClipboardCheck,
      color: "bg-yellow-500/20 text-yellow-400",
    },

    {
      titulo: "Avisos",
      valor: totalAvisos,
      icon: Megaphone,
      color: "bg-purple-500/20 text-purple-400",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>

          <p className="text-gray-400 mt-1">Visão geral do sistema</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={45} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.titulo}
                  className="bg-[#111827] border border-slate-800 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">{item.titulo}</p>

                      <h2 className="text-4xl font-bold text-white mt-3">
                        {item.valor}
                      </h2>
                    </div>

                    <div className={`${item.color} p-4 rounded-2xl`}>
                      <Icon size={30} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">
          <h2 className="text-white text-2xl font-bold mb-4">
            Sistema Catequese
          </h2>

          <p className="text-gray-400 leading-8">
            Sistema completo para gerenciamento de catequizandos, turmas,
            presenças e avisos.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
