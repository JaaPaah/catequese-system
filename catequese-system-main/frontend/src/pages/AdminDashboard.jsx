import { Users, Calendar, Bell } from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow p-4 flex gap-6 mb-6">
        <button className="flex items-center gap-2 border-b-2 border-blue-600 pb-2 text-blue-600 font-semibold">
          <Users size={18} />
          Turmas
        </button>

        <button className="flex items-center gap-2 text-gray-500">
          <Calendar size={18} />
          Lançar Presença
        </button>

        <button className="flex items-center gap-2 text-gray-500">
          <Bell size={18} />
          Avisos
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Gestão de Turmas
            </h2>

            <p className="text-gray-500 mt-1">
              Gerencie catequizandos e turmas
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700">
              Novo Aluno
            </button>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500">
              Nova Turma
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border rounded-2xl p-5 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800">
              Primeira Eucaristia - Turma A
            </h3>

            <p className="text-gray-500 mt-3">Catequista: Maria Santos</p>

            <p className="text-gray-500">Sábado • 14h</p>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700">
                Ver Alunos
              </button>

              <button className="flex-1 border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50">
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
