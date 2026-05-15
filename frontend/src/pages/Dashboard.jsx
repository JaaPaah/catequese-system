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
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <h2 className="text-blue-100 text-sm">Catequizandos</h2>

            <p className="text-4xl font-bold text-white mt-4">120</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <h2 className="text-purple-100 text-sm">Turmas</h2>

            <p className="text-4xl font-bold text-white mt-4">8</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-2xl shadow-xl hover:scale-105 transition duration-300">
            <h2 className="text-emerald-100 text-sm">Catequistas</h2>

            <p className="text-4xl font-bold text-white mt-4">15</p>
          </div>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl shadow-xl border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-semibold">
              Atividades Recentes
            </h2>

            <button className="text-sm text-blue-400 hover:text-blue-300 transition">
              Ver todas
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-white font-medium">
                  Novo catequizando cadastrado
                </p>

                <p className="text-gray-400 text-sm">Há 5 minutos</p>
              </div>

              <span className="text-green-400 text-sm">Novo</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-white font-medium">
                  Turma de Crisma atualizada
                </p>

                <p className="text-gray-400 text-sm">Hoje às 14:30</p>
              </div>

              <span className="text-blue-400 text-sm">Atualização</span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Presença registrada</p>

                <p className="text-gray-400 text-sm">Hoje às 09:15</p>
              </div>

              <span className="text-yellow-400 text-sm">Registro</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
