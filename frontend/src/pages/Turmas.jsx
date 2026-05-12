import { useEffect, useState } from "react";
import axios from "axios";

import CadastroTurmaModal from "../components/CadastroTurmaModal";

import { Users, CalendarDays, Plus, Pencil } from "lucide-react";

export default function Turmas() {
  const [turmas, setTurmas] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  async function carregarTurmas() {
    try {
      const response = await axios.get("http://localhost:3001/turmas");

      setTurmas(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    carregarTurmas();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* TOPO */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Turmas</h1>

          <p className="text-gray-500">Gerencie as turmas da catequese</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-500 transition"
        >
          <Plus size={18} />
          Nova Turma
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {turmas.map((turma) => (
          <div
            key={turma.id}
            className="border rounded-2xl p-5 hover:shadow-lg transition"
          >
            {/* TITULO */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {turma.nome}
                </h2>

                <p className="text-gray-500">Catequista: {turma.catequista}</p>
              </div>

              <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                <Users size={16} />

                {turma.alunos}
              </div>
            </div>

            {/* HORARIO */}
            <div className="flex items-center gap-2 text-gray-500 mb-5">
              <CalendarDays size={16} />

              {turma.horario || "Horário não informado"}
            </div>

            {/* BOTÕES */}
            <div className="flex gap-3">
              <button className="flex-1 bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-700 transition">
                Ver Alunos
              </button>

              <button className="flex items-center justify-center gap-2 flex-1 border border-blue-500 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition">
                <Pencil size={16} />
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      <CadastroTurmaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        atualizarLista={carregarTurmas}
      />
    </div>
  );
}
