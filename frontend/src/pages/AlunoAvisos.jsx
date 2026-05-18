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


export default function Avisos() {

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Avisos</h1>
          <p className="text-gray-400 mt-1">Mural de Avisos</p>
        </div>

       
        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-gray-300">
              <thead className="bg-slate-900 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">Data</th>
                  <th className="px-6 py-4">Aviso</th>
                  <th className="px-6 py-4">Descrição</th>
                  <th className="px-6 py-4">Destinado</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-800 hover:bg-slate-900 transition">
                  <td className="px-6 py-4 whitespace-nowrap">07/06/2026</td>

                  <td className="px-6 py-4">Primeira Eucaristia</td>

                  <td className="px-6 py-4">A celebração da Primeira Eucaristia será realizada no dia 15 de junho às 10h. Todos os catequizandos devem chegar com 30 minutos de antecedência.</td>

                  <td className="px-6 py-4">
                    <span className="bg-blue-500/20 text-purple-400 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                      Turma A 
                    </span>
                  </td>
                </tr>
              </tbody>
                            <tbody>
                <tr className="border-t border-slate-800 hover:bg-slate-900 transition">
                  <td className="px-6 py-4 whitespace-nowrap">02/05/2026</td>

                  <td className="px-6 py-4">Informativo</td>

                  <td className="px-6 py-4">Devido ao feriado, não teremos aula no dia 10/05. As aulas retornam normalmente no dia 17/05.</td>

                  <td className="px-6 py-4">
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                      Todos 
                    </span>
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
