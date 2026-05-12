import { useState, useEffect } from "react";

import CadastroCatequizandoModal from "../components/CadastroCatequizandoModal";

import api from "../services/api";

import { Search, Plus, Pencil, Trash2 } from "lucide-react";

export default function Catequizandos() {
  const [openModal, setOpenModal] = useState(false);

  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    carregarAlunos();
  }, []);

  async function carregarAlunos() {
    try {
      const response = await api.get("/catequizandos");

      setAlunos(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function excluirCatequizando(id) {
    try {
      await api.delete(`/catequizandos/${id}`);

      carregarAlunos();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Catequizandos</h1>

          <p className="text-gray-500">Gerencie os alunos cadastrados</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-500 transition"
        >
          <Plus size={18} />
          Novo Catequizando
        </button>
      </div>

      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Pesquisar catequizando..."
          className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-4">Nome</th>
              <th>Turma</th>
              <th>Responsável</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id} className="border-b hover:bg-gray-50">
                <td className="py-4 font-medium">{aluno.nome}</td>

                <td>{aluno.turma}</td>

                <td>{aluno.responsavel}</td>

                <td>{aluno.telefone}</td>

                <td>
                  <div className="flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => excluirCatequizando(aluno.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CadastroCatequizandoModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
