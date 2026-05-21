import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import { Megaphone } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

export default function AvisosAluno() {
  const [avisos, setAvisos] = useState([]);

  async function carregarAvisos() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user?.turma) {
        toast.error("Aluno sem turma cadastrada");

        return;
      }

      const snapshot = await getDocs(collection(db, "avisos"));

      const lista = [];

      snapshot.forEach((doc) => {
        const aviso = {
          id: doc.id,
          ...doc.data(),
        };

        if (aviso.turma === "GERAL" || aviso.turma === user.turma) {
          lista.push(aviso);
        }
      });

      lista.sort((a, b) => {
        if (!a.data || !b.data) return 0;

        return b.data.seconds - a.data.seconds;
      });

      setAvisos(lista);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao carregar avisos");
    }
  }

  function formatarData(data) {
    if (!data) return "";

    return data.toDate().toLocaleDateString("pt-BR");
  }

  useEffect(() => {
    carregarAvisos();
  }, []);

  return (
    <MainLayout>
      <Toaster position="top-right" />

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Avisos</h1>

          <p className="text-gray-400 mt-2">Avisos da sua turma</p>
        </div>

        {avisos.length === 0 ? (
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-10 text-center">
            <p className="text-gray-400">Nenhum aviso disponível</p>
          </div>
        ) : (
          <div className="grid gap-5">
            {avisos.map((item) => (
              <div
                key={item.id}
                className="bg-[#111827] border border-slate-800 rounded-3xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                      <Megaphone className="text-white" size={26} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {item.titulo}
                      </h2>

                      <p className="text-gray-400 mt-2">{item.descricao}</p>
                    </div>
                  </div>

                  <span className="text-gray-500 text-sm">
                    {formatarData(item.data)}
                  </span>
                </div>

                <div className="mt-5">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    {item.turma}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
