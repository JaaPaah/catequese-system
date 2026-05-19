import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { Users, BookOpen, Megaphone, TrendingUp } from "lucide-react";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

export default function Dashboard() {
  const [totalCatequizandos, setTotalCatequizandos] = useState(0);

  const [totalTurmas, setTotalTurmas] = useState(0);

  const [totalAvisos, setTotalAvisos] = useState(0);

  async function carregarDados() {
    try {
      const catequizandos = await getDocs(collection(db, "catequizandos"));

      const turmas = await getDocs(collection(db, "turmas"));

      const avisos = await getDocs(collection(db, "avisos"));

      setTotalCatequizandos(catequizandos.size);

      setTotalTurmas(turmas.size);

      setTotalAvisos(avisos.size);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const dadosGrafico = [
    {
      nome: "Jan",
      catequizandos: 4,
    },

    {
      nome: "Fev",
      catequizandos: 7,
    },

    {
      nome: "Mar",
      catequizandos: 10,
    },

    {
      nome: "Abr",
      catequizandos: 8,
    },

    {
      nome: "Mai",
      catequizandos: 12,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>

          <p className="text-gray-400 mt-1">Visão geral do sistema</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Catequizandos</p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {totalCatequizandos}
                </h2>
              </div>

              <div className="bg-blue-600/20 p-4 rounded-xl">
                <Users size={28} className="text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Turmas</p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {totalTurmas}
                </h2>
              </div>

              <div className="bg-purple-600/20 p-4 rounded-xl">
                <BookOpen size={28} className="text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avisos</p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {totalAvisos}
                </h2>
              </div>

              <div className="bg-green-600/20 p-4 rounded-xl">
                <Megaphone size={28} className="text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Crescimento</p>

                <h2 className="text-3xl font-bold text-white mt-2">+24%</h2>
              </div>

              <div className="bg-orange-600/20 p-4 rounded-xl">
                <TrendingUp size={28} className="text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <h2 className="text-white text-2xl font-bold mb-2">
            Crescimento de Catequizandos
          </h2>

          <p className="text-gray-400 mb-6">Últimos meses</p>

          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosGrafico}>
                <XAxis dataKey="nome" stroke="#94a3b8" />

                <Tooltip />

                <Bar dataKey="catequizandos" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
