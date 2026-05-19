import { useEffect, useState } from "react";

import MainLayoutAluno from "../layouts/MainLayoutAluno";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";

import { Megaphone, Loader2 } from "lucide-react";

export default function AvisosAluno() {
  const [avisos, setAvisos] = useState([]);

  const [loading, setLoading] = useState(true);

  async function carregarAvisos() {
    try {
      const querySnapshot = await getDocs(collection(db, "avisos"));

      const dados = [];

      querySnapshot.forEach((item) => {
        dados.push({
          id: item.id,
          ...item.data(),
        });
      });

      setAvisos(dados);
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
          <h1 className="text-3xl font-bold text-white">Avisos</h1>

          <p className="text-gray-400 mt-1">Comunicados da catequese</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={45} />
          </div>
        ) : (
          <div className="space-y-4">
            {avisos.map((item) => (
              <div
                key={item.id}
                className="bg-[#111827] border border-slate-800 rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-4 rounded-2xl">
                    <Megaphone className="text-blue-400" size={26} />
                  </div>

                  <div>
                    <h2 className="text-white text-xl font-bold">
                      {item.titulo}
                    </h2>

                    <p className="text-gray-400 mt-3 leading-7">
                      {item.mensagem}
                    </p>

                    <span className="inline-block mt-4 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                      Turma: {item.turma}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayoutAluno>
  );
}
