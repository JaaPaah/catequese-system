import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import {
  ClipboardCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function AlunoPresenca() {
  const [presencas, setPresencas] = useState([]);

  const [loading, setLoading] = useState(true);

  const [estatisticas, setEstatisticas] = useState({
    total: 0,
    presentes: 0,
    faltas: 0,
    porcentagem: 0,
  });

  async function carregarPresencas() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const snapshot = await getDocs(collection(db, "presencas"));

      const lista = [];

      let presentes = 0;

      let faltas = 0;

      snapshot.forEach((doc) => {
        const item = {
          id: doc.id,
          ...doc.data(),
        };

        const mesmoAluno = item.alunoId === user.uid || item.nome === user.nome;

        if (mesmoAluno) {
          lista.push(item);

          if (item.presente) {
            presentes++;
          } else {
            faltas++;
          }
        }
      });

      lista.sort((a, b) => {
        if (!a.data || !b.data) return 0;

        return b.data.seconds - a.data.seconds;
      });

      const total = presentes + faltas;

      const porcentagem = total > 0 ? Math.round((presentes / total) * 100) : 0;

      setEstatisticas({
        total,
        presentes,
        faltas,
        porcentagem,
      });

      setPresencas(lista);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao carregar presenças");
    }

    setLoading(false);
  }

  function formatarData(data) {
    if (!data) return "";

    return data.toDate().toLocaleDateString("pt-BR");
  }

  function statusFrequencia() {
    if (estatisticas.porcentagem >= 75) {
      return {
        texto: "Boa frequência",
        cor: "text-green-400",
        bg: "bg-green-500/20",
      };
    }

    if (estatisticas.porcentagem >= 50) {
      return {
        texto: "Atenção",
        cor: "text-yellow-400",
        bg: "bg-yellow-500/20",
      };
    }

    return {
      texto: "Risco de frequência baixa",
      cor: "text-red-400",
      bg: "bg-red-500/20",
    };
  }

  useEffect(() => {
    carregarPresencas();
  }, []);

  const status = statusFrequencia();

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Minhas Presenças</h1>

          <p className="text-gray-400 mt-2">Histórico completo de frequência</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">
            <p className="text-gray-400 text-sm">Total</p>

            <h2 className="text-4xl font-bold text-white mt-3">
              {estatisticas.total}
            </h2>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">
            <p className="text-gray-400 text-sm">Presenças</p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">
              {estatisticas.presentes}
            </h2>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">
            <p className="text-gray-400 text-sm">Faltas</p>

            <h2 className="text-4xl font-bold text-red-400 mt-3">
              {estatisticas.faltas}
            </h2>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">
            <p className="text-gray-400 text-sm">Frequência</p>

            <h2 className="text-4xl font-bold text-blue-400 mt-3">
              {estatisticas.porcentagem}%
            </h2>
          </div>
        </div>

        <div
          className={`${status.bg} border border-slate-800 rounded-3xl p-6 flex items-center gap-4`}
        >
          <AlertTriangle className={status.cor} size={28} />

          <div>
            <h2 className={`font-bold text-xl ${status.cor}`}>
              {status.texto}
            </h2>

            <p className="text-gray-300 mt-1">
              Sua frequência atual é de {estatisticas.porcentagem}%
            </p>
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <ClipboardCheck size={24} />
              Histórico
            </h2>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-400">Carregando...</div>
          ) : presencas.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              Nenhuma presença encontrada
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="text-left text-gray-400 font-medium p-5">
                    Data
                  </th>

                  <th className="text-left text-gray-400 font-medium p-5">
                    Turma
                  </th>

                  <th className="text-left text-gray-400 font-medium p-5">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {presencas.map((item) => (
                  <tr key={item.id} className="border-t border-slate-800">
                    <td className="p-5 text-white">
                      {formatarData(item.data)}
                    </td>

                    <td className="p-5 text-gray-300">{item.turma}</td>

                    <td className="p-5">
                      {item.presente ? (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-2 w-fit">
                          <CheckCircle size={16} />
                          Presente
                        </span>
                      ) : (
                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm flex items-center gap-2 w-fit">
                          <XCircle size={16} />
                          Falta
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
