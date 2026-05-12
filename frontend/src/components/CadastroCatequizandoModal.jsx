import { useState } from "react";

import { X } from "lucide-react";

import api from "../services/api";

export default function CadastroCatequizandoModal({
  open,
  onClose,
  atualizarLista,
}) {
  const [nome, setNome] = useState("");
  const [turma, setTurma] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");

  if (!open) return null;

  async function salvarCatequizando(e) {
    e.preventDefault();

    try {
      await api.post("/catequizandos", {
        nome,
        turma,
        responsavel,
        telefone,
      });

      atualizarLista();

      onClose();

      setNome("");
      setTurma("");
      setResponsavel("");
      setTelefone("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Novo Catequizando
            </h2>

            <p className="text-gray-500">Preencha as informações abaixo</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        <form onSubmit={salvarCatequizando} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Nome completo</label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Data de nascimento</label>

            <input
              type="date"
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Turma</label>

            <select
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione</option>
              <option value="Turma A">Turma A</option>
              <option value="Turma B">Turma B</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Responsável</label>

            <input
              type="text"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Telefone</label>

            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-4">
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
              Salvar Catequizando
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
