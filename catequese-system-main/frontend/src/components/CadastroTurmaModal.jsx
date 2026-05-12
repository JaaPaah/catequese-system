import { useState } from "react";

import axios from "axios";

import { X } from "lucide-react";

export default function CadastroTurmaModal({ open, onClose, atualizarLista }) {
  const [nome, setNome] = useState("");
  const [catequista, setCatequista] = useState("");
  const [alunos, setAlunos] = useState("");

  if (!open) return null;

  async function salvarTurma(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/turmas", {
        nome,
        catequista,
        alunos,
      });

      atualizarLista();

      onClose();

      setNome("");
      setCatequista("");
      setAlunos("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Nova Turma</h2>

            <p className="text-gray-500">Cadastre uma nova turma</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        <form onSubmit={salvarTurma} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Nome da Turma</label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Catequista</label>

            <input
              type="text"
              value={catequista}
              onChange={(e) => setCatequista(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Quantidade de Alunos
            </label>

            <input
              type="number"
              value={alunos}
              onChange={(e) => setAlunos(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 px-5 py-3 rounded-xl"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-500"
            >
              Salvar Turma
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
