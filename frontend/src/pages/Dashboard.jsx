import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import {
  Users,
  BookOpen,
  Megaphone,
  TrendingUp,
  Loader2,
  Shield,
} from "lucide-react";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [totalCatequizandos, setTotalCatequizandos] = useState(0);

  const [totalTurmas, setTotalTurmas] = useState(0);

  const [totalAvisos, setTotalAvisos] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

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

    setLoading(false);
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

    {
      nome: "Jun",
      catequizandos: 15,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center">
              <Shield className="text-white" size={40} />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                Bem-vindo, {user?.nome || "Administrador"}
              </h1>

              <p className="text-blue-100 mt-2 text-lg">
                Gerencie sua catequese de forma moderna e organizada
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={50} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Catequizandos</p>

                    <h2 className="text-4xl font-bold text-white mt-3">
                      {totalCatequizandos}
                    </h2>
                  </div>

                  <div className="bg-blue-600/20 p-4 rounded-2xl">
                    <Users size={30} className="text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Turmas</p>

                    <h2 className="text-4xl font-bold text-white mt-3">
                      {totalTurmas}
                    </h2>
                  </div>

                  <div className="bg-purple-600/20 p-4 rounded-2xl">
                    <BookOpen size={30} className="text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avisos</p>

                    <h2 className="text-4xl font-bold text-white mt-3">
                      {totalAvisos}
                    </h2>
                  </div>

                  <div className="bg-green-600/20 p-4 rounded-2xl">
                    <Megaphone size={30} className="text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Crescimento</p>

                    <h2 className="text-4xl font-bold text-white mt-3">+24%</h2>
                  </div>

                  <div className="bg-orange-600/20 p-4 rounded-2xl">
                    <TrendingUp size={30} className="text-orange-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">
                  Crescimento de Catequizandos
                </h2>

                <p className="text-gray-400 mt-2">Evolução dos últimos meses</p>
              </div>

              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosGrafico}>
                    <XAxis dataKey="nome" stroke="#94a3b8" />

                    <Tooltip />

                    <Bar dataKey="catequizandos" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
