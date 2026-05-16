import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { Search, Pencil, Trash2 } from "lucide-react";

const initialCatequizandos = [
  {
    id: 1,
    nome: "João Silva",
    turma: "Crisma",
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

const initialForm = {
  nome: "",
  turma: "",
  idade: "",
};

export default function Catequizandos() {
  const [openModal, setOpenModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [filterTurma, setFilterTurma] = useState("Todas");

  const [form, setForm] = useState(initialForm);

  const [catequizandos, setCatequizandos] = useState(initialCatequizandos);

  function handleSave() {
    if (!form.nome || !form.turma || !form.idade) {
      return;
    }

    if (editingId) {
      const listaAtualizada = catequizandos.map((item) =>
        item.id === editingId
          ? {
              ...item,
              nome: form.nome,
              turma: form.turma,
              idade: form.idade,
            }
          : item,
      );

      setCatequizandos(listaAtualizada);
    } else {
      const novoCatequizando = {
        id: Date.now(),
        nome: form.nome,
        turma: form.turma,
        idade: form.idade,
        status: "Ativo",
      };

      setCatequizandos([...catequizandos, novoCatequizando]);
    }

    setForm(initialForm);

    setEditingId(null);

    setOpenModal(false);
  }

  function handleEdit(catequizando) {
    setEditingId(catequizando.id);

    setForm({
      nome: catequizando.nome,
      turma: catequizando.turma,
      idade: catequizando.idade,
    });

    setOpenModal(true);
  }

  const filteredCatequizandos = catequizandos.filter((item) => {
    const matchSearch = item.nome.toLowerCase().includes(search.toLowerCase());

    const matchTurma =
      filterTurma === "Todas" ? true : item.turma === filterTurma;

    return matchSearch && matchTurma;
  });

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

          <button
            onClick={() => {
              setEditingId(null);
              setForm(initialForm);
              setOpenModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-500 transition px-5 py-3 rounded-xl text-white font-medium"
          >
            + Novo Catequizando
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center bg-[#111827] border border-slate-800 rounded-xl px-4 py-3 w-full max-w-md">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Buscar catequizando..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-white ml-3 w-full"
            />
          </div>

          <select
            value={filterTurma}
            onChange={(e) => setFilterTurma(e.target.value)}
            className="bg-[#111827] border border-slate-800 text-white px-4 py-3 rounded-xl"
          >
            <option value="Todas">Todas as turmas</option>

            <option value="Crisma">Crisma</option>

            <option value="Eucaristia">Eucaristia</option>

            <option value="Perseverança">Perseverança</option>
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
              {filteredCatequizandos.map((catequizando) => (
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
                      <button
                        onClick={() => handleEdit(catequizando)}
                        className="text-blue-400 hover:text-blue-300 transition"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => {
                          const novaLista = catequizandos.filter(
                            (item) => item.id !== catequizando.id,
                          );

                          setCatequizandos(novaLista);
                        }}
                        className="text-red-400 hover:text-red-300 transition"
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
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111827] w-full max-w-lg rounded-2xl p-8 shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? "Editar Catequizando" : "Novo Catequizando"}
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome"
                value={form.nome}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nome: e.target.value,
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
              />

              <input
                type="text"
                placeholder="Turma"
                value={form.turma}
                onChange={(e) =>
                  setForm({
                    ...form,
                    turma: e.target.value,
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
              />

              <input
                type="number"
                placeholder="Idade"
                value={form.idade}
                onChange={(e) =>
                  setForm({
                    ...form,
                    idade: e.target.value,
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setOpenModal(false)}
                className="px-5 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-600 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition"
              >
                {editingId ? "Salvar Alterações" : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
