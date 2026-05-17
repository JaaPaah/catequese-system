import MainLayout from "../layouts/MainLayoutAluno";
import { useState, useEffect } from "react";

import {
  Users,
  BookOpen,
  UserCheck,
  TrendingUp,
  Calendar,
  Check,
  X,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

import { db } from "../services/Firebase";
import { collection, count, query, where, getDocs } from "firebase/firestore";
console.log(process.env.REACT_APP_PROJECT_ID);


export default function Dashboard() {
  const [totalFaltas, setTotalFaltas] = useState(0);
  const [totalPresencas, setTotalPresencas] = useState(0);
  const faltas = async () => {
    console.log("função rodou");
    const q = query(
      collection(db, "Aulas"),
      where("AlunoId", "==", 123),
      where("EstaPresente", "==", true),
    );

    const querySnapshot = await getDocs(q);
    setTotalPresencas(querySnapshot.size);
  };
  useEffect(() => {
    faltas();
    totalPresencas();
  }, []);
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Presenças</h1>

          <p className="text-gray-400 mt-1">Minhas Presenças</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Aulas Realizadas</p>

                <h2 className="text-3xl font-bold text-white mt-2">24</h2>
              </div>

              <div className="bg-blue-600/20 p-4 rounded-xl">
                <Calendar size={28} className="text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Presenças</p>

                <h2 className="text-3xl font-bold text-white mt-2">{totalPresencas}</h2>
              </div>

              <div className="bg-green-600/20 p-4 rounded-xl">
                <Check size={28} className="text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Faltas</p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {totalFaltas}
                </h2>
              </div>

              <div className="bg-orange-600/20 p-4 rounded-xl">
                <X size={28} className="text-orange-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-gray-300">
              <thead className="bg-slate-900 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Tema</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-800 hover:bg-slate-900 transition">
                  <td className="px-6 py-4 whitespace-nowrap">06/05/2026</td>

                  <td className="px-6 py-4">Os Sacramentos da Igreja</td>

                  <td className="px-6 py-4">
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                      Aula
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-green-400 whitespace-nowrap">
                      <CheckCircle size={18} />
                      Presente
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr className="border-t border-slate-800 hover:bg-slate-900 transition">
                  <td className="px-6 py-4 whitespace-nowrap">16/05/2026</td>

                  <td className="px-6 py-4">Missa Dominical</td>

                  <td className="px-6 py-4">
                    <span className="bg-blue-500/20 text-purple-400 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                      Missa
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-red-400 whitespace-nowrap">
                      <XCircle size={18} />
                      Ausente
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
