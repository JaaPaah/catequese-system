import MainLayout from "../layouts/MainLayout";

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

        <div className="bg-[#111827] rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="text-left text-gray-300 p-4">Nome</th>

                <th className="text-left text-gray-300 p-4">Turma</th>

                <th className="text-left text-gray-300 p-4">Idade</th>

                <th className="text-left text-gray-300 p-4">Status</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
