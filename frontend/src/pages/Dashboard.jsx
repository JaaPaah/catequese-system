import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>

          <p className="text-gray-400">Bem-vindo ao sistema de catequese</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111827] p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400 text-sm">Catequizandos</h2>

            <p className="text-3xl font-bold text-white mt-2">120</p>
          </div>

          <div className="bg-[#111827] p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400 text-sm">Turmas</h2>

            <p className="text-3xl font-bold text-white mt-2">8</p>
          </div>

          <div className="bg-[#111827] p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400 text-sm">Catequistas</h2>

            <p className="text-3xl font-bold text-white mt-2">15</p>
          </div>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl shadow-lg">
          <h2 className="text-white text-xl font-semibold mb-4">
            Atividades Recentes
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>Novo catequizando cadastrado</li>
            <li>Turma de Crisma atualizada</li>
            <li>Presença registrada</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
