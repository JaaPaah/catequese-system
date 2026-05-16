import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { CheckCircle, XCircle } from "lucide-react";

export default function Presencas() {
  const [lista, setLista] = useState([
    {
      id: 1,
      nome: "João Pedro",
      presente: false,
    },
    {
      id: 2,
      nome: "Maria Clara",
      presente: true,
    },
    {
      id: 3,
      nome: "Lucas Henrique",
      presente: false,
    },
  ]);

  function togglePresenca(id) {
    const novaLista = lista.map((item) =>
      item.id === id
        ? {
            ...item,
            presente: !item.presente,
          }
        : item,
    );

    setLista(novaLista);
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Controle de Presença
          </h1>

          <p className="text-gray-400 mt-1">Gerencie presenças da turma</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="text-left text-gray-400 font-medium p-5">
                  Catequizando
                </th>

                <th className="text-left text-gray-400 font-medium p-5">
                  Status
                </th>

                <th className="text-left text-gray-400 font-medium p-5">
                  Ação
                </th>
              </tr>
            </thead>

            <tbody>
              {lista.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800 hover:bg-slate-900 transition"
                >
                  <td className="p-5 text-white">{item.nome}</td>

                  <td className="p-5">
                    {item.presente ? (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        Presente
                      </span>
                    ) : (
                      <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                        Ausente
                      </span>
                    )}
                  </td>

                  <td className="p-5">
                    <button
                      onClick={() => togglePresenca(item.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition
                      ${
                        item.presente
                          ? "bg-red-600 hover:bg-red-500"
                          : "bg-green-600 hover:bg-green-500"
                      }`}
                    >
                      {item.presente ? (
                        <>
                          <XCircle size={18} />
                          Marcar Falta
                        </>
                      ) : (
                        <>
                          <CheckCircle size={18} />
                          Marcar Presença
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
