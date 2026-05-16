import { useState } from "react";

import MainLayout from "../layouts/MainLayout";

import { Plus, Search, Pencil, Trash2 } from "lucide-react";

export default function Catequizandos() {
  const [busca, setBusca] = useState("");

  const [novoNome, setNovoNome] = useState("");

  const [novoIdade, setNovoIdade] = useState("");

  const [novaTurma, setNovaTurma] = useState("");

  const [editandoId, setEditandoId] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);

  const [catequizandos, setCatequizandos] = useState([
    {
      id: 1,
      nome: "João Pedro",
      idade: 14,
      turma: "Crisma",
    },
    {
      id: 2,
      nome: "Maria Clara",
      idade: 12,
      turma: "Eucaristia",
    },
  ]);

  function adicionarCatequizando() {
    if (!novoNome || !novoIdade || !novaTurma) {
      return;
    }

    const novo = {
      id: editandoId || Date.now(),
      nome: novoNome,
      idade: novoIdade,
      turma: novaTurma,
    };

    if (editandoId) {
      const atualizados = catequizandos.map((item) =>
        item.id === editandoId ? novo : item,
      );

      setCatequizandos(atualizados);
    } else {
      setCatequizandos([...catequizandos, novo]);
    }

    setNovoNome("");
    setNovoIdade("");
    setNovaTurma("");
    setEditandoId(null);
  }

  function excluirCatequizando(id) {
    const lista = catequizandos.filter((item) => item.id !== id);

    setCatequizandos(lista);
  }

  function editarCatequizando(item) {
    setNovoNome(item.nome);

    setNovoIdade(item.idade);

    setNovaTurma(item.turma);

    setEditandoId(item.id);

    setModalAberto(true);
  }

  const filtrados = catequizandos.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Catequizandos</h1>

            <p className="text-gray-400">Gerencie os catequizandos</p>
          </div>

          <button
            onClick={() => {
              setModalAberto(true);

              setNovoNome("");
              setNovoIdade("");
              setNovaTurma("");

              setEditandoId(null);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition px-5 py-3 rounded-xl text-white font-medium"
          >
            <Plus size={18} />
            Novo Catequizando
          </button>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Buscar catequizando..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="text-left text-gray-400 font-medium p-5">
                  Nome
                </th>

                <th className="text-left text-gray-400 font-medium p-5">
                  Idade
                </th>

                <th className="text-left text-gray-400 font-medium p-5">
                  Turma
                </th>

                <th className="text-left text-gray-400 font-medium p-5">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {filtrados.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800 hover:bg-slate-900 transition"
                >
                  <td className="p-5 text-white">{item.nome}</td>

                  <td className="p-5 text-gray-300">{item.idade}</td>

                  <td className="p-5 text-gray-300">{item.turma}</td>

                  <td className="p-5 flex gap-3">
                    <button
                      onClick={() => editarCatequizando(item)}
                      className="bg-yellow-500 hover:bg-yellow-400 transition p-2 rounded-lg"
                    >
                      <Pencil size={18} color="white" />
                    </button>

                    <button
                      onClick={() => excluirCatequizando(item.id)}
                      className="bg-red-600 hover:bg-red-500 transition p-2 rounded-lg"
                    >
                      <Trash2 size={18} color="white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalAberto && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editandoId ? "Editar Catequizando" : "Novo Catequizando"}
              </h2>

              <button
                onClick={() => setModalAberto(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none"
              />

              <input
                type="number"
                placeholder="Idade"
                value={novoIdade}
                onChange={(e) => setNovoIdade(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none"
              />

              <input
                type="text"
                placeholder="Turma"
                value={novaTurma}
                onChange={(e) => setNovaTurma(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  adicionarCatequizando();

                  setModalAberto(false);
                }}
                className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl text-white font-medium"
              >
                {editandoId ? "Salvar Alterações" : "Adicionar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
