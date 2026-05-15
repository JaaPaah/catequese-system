import MainLayout from "../layouts/MainLayout";

import { Search, Pencil, Trash2 } from "lucide-react";

const catequizandos = [
  {
    id: 1,
    nome: "João Silva",
    turma: "Crisma A",
    idade: 14,
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    turma: "Eucaristia",
    idade: 11,
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Pedro Santos",
    turma: "Perseverança",
    idade: 13,
    status: "Pendente",
  },
];

export default function Catequizandos() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Catequizandos</h1>

            <p className="text-gray-400">
              Gerencie os catequizandos cadastrados
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-500 transition px-5 py-3 rounded-xl text-white font-medium">
            + Novo Catequizando
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center bg-[#111827] border border-slate-800 rounded-xl px-4 py-3 w-full max-w-md">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Buscar catequizando..."
              className="bg-transparent outline-none text-white ml-3 w-full"
            />
          </div>

          <select className="bg-[#111827] border border-slate-800 text-white px-4 py-3 rounded-xl">
            <option>Todas as turmas</option>
            <option>Crisma</option>
            <option>Eucaristia</option>
          </select>
        </div>

        <div className="bg-[#111827] rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="text-left text-gray-300 p-4">Nome</th>

                <th className="text-left text-gray-300 p-4">Turma</th>

                <th className="text-left text-gray-300 p-4">Idade</th>

                <th className="text-left text-gray-300 p-4">Status</th>

                <th className="text-left text-gray-300 p-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {catequizandos.map((catequizando) => (
                <tr
                  key={catequizando.id}
                  className="border-t border-slate-800 hover:bg-slate-900 transition"
                >
                  <td className="p-4 text-white">{catequizando.nome}</td>

                  <td className="p-4 text-gray-300">{catequizando.turma}</td>

                  <td className="p-4 text-gray-300">{catequizando.idade}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        catequizando.status === "Ativo"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {catequizando.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button className="text-blue-400 hover:text-blue-300 transition">
                        <Pencil size={18} />
                      </button>

                      <button className="text-red-400 hover:text-red-300 transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
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
