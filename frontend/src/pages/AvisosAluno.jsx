import { useEffect, useState } from "react";

import MainLayoutAluno from "../layouts/MainLayoutAluno";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../services/firebase";

import { Megaphone, Loader2 } from "lucide-react";

export default function AvisosAluno() {
  const [avisos, setAvisos] = useState([]);

  const [loading, setLoading] = useState(true);

  async function carregarAvisos() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const usuariosSnapshot = await getDocs(
        query(collection(db, "usuarios"), where("email", "==", user.email)),
      );

      let turmaAluno = "";

      usuariosSnapshot.forEach((doc) => {
        turmaAluno = doc.data().turma;
      });

      const avisosQuery = query(
        collection(db, "avisos"),
        where("turma", "==", turmaAluno),
      );

      const avisosSnapshot = await getDocs(avisosQuery);

      const lista = [];

      avisosSnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setAvisos(lista);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    carregarAvisos();
  }, []);

  return (
    <MainLayoutAluno>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Avisos da Turma</h1>

          <p className="text-gray-400 mt-1">Comunicados importantes</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
          ) : avisos.length === 0 ? (
            <div className="text-center py-10">
              <Megaphone className="mx-auto text-gray-500 mb-4" size={50} />

              <p className="text-gray-400">Nenhum aviso encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {avisos.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5"
                >
                  <h2 className="text-white text-xl font-semibold">
                    {item.titulo}
                  </h2>

                  <p className="text-gray-400 mt-3">{item.mensagem}</p>

                  <span className="inline-block mt-4 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    {item.turma}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayoutAluno>
  );
}
