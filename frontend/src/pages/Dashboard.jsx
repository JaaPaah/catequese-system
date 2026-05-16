import MainLayout from "../layouts/MainLayout";

import { Users, BookOpen, UserCheck, TrendingUp } from "lucide-react";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

import { db } from "../services/Firebase";
console.log(db);
const dadosGrafico = [
  {
    nome: "Jan",
    catequizandos: 20,
  },
  {
    nome: "Fev",
    catequizandos: 35,
  },
  {
    nome: "Mar",
    catequizandos: 50,
  },
  {
    nome: "Abr",
    catequizandos: 40,
  },
  {
    nome: "Mai",
    catequizandos: 70,
  },
];

export default function Dashboard() {
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

                <h2 className="text-3xl font-bold text-white mt-2">120</h2>
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

                <h2 className="text-3xl font-bold text-white mt-2">8</h2>
              </div>

              <div className="bg-purple-600/20 p-4 rounded-xl">
                <BookOpen size={28} className="text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Catequistas</p>

                <h2 className="text-3xl font-bold text-white mt-2">15</h2>
              </div>

              <div className="bg-green-600/20 p-4 rounded-xl">
                <UserCheck size={28} className="text-green-400" />
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
          <div className="mb-6">
            <h2 className="text-white text-2xl font-semibold">
              Crescimento de Catequizandos
            </h2>

            <p className="text-gray-400">Últimos meses</p>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosGrafico}>
                <XAxis dataKey="nome" />

                <Tooltip />

                <Bar dataKey="catequizandos" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
