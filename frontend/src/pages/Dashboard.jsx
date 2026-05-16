import MainLayout from "../layouts/MainLayout";

import { Users, BookOpen, UserCheck } from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
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
    catequizandos: 42,
  },
  {
    nome: "Abr",
    catequizandos: 50,
  },
  {
    nome: "Mai",
    catequizandos: 65,
  },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>

          <p className="text-gray-400">Visão geral do sistema de catequese</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Catequizandos</p>

                <h2 className="text-4xl font-bold text-white mt-2">120</h2>
              </div>

              <div className="bg-blue-500/20 p-4 rounded-xl">
                <Users className="text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Turmas</p>

                <h2 className="text-4xl font-bold text-white mt-2">8</h2>
              </div>

              <div className="bg-green-500/20 p-4 rounded-xl">
                <BookOpen className="text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Catequistas</p>

                <h2 className="text-4xl font-bold text-white mt-2">15</h2>
              </div>

              <div className="bg-purple-500/20 p-4 rounded-xl">
                <UserCheck className="text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Crescimento de Cadastros
                </h2>

                <p className="text-gray-400 text-sm">Últimos meses</p>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="nome" stroke="#94a3b8" />

                  <YAxis stroke="#94a3b8" />

                  <Tooltip />

                  <Bar
                    dataKey="catequizandos"
                    fill="#2563eb"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-6">
              Atividades Recentes
            </h2>

            <div className="space-y-4">
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-white">Novo catequizando cadastrado</p>

                <span className="text-gray-400 text-sm">há 5 minutos</span>
              </div>

              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-white">Turma Crisma atualizada</p>

                <span className="text-gray-400 text-sm">há 20 minutos</span>
              </div>

              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-white">Presença registrada</p>

                <span className="text-gray-400 text-sm">há 1 hora</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
