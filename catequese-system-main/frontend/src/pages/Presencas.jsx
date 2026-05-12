import { useEffect, useState } from "react";
import axios from "axios";

import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";

export default function Presencas() {
  const [presencas, setPresencas] = useState([]);

  async function carregarPresencas() {
    try {
      const response = await axios.get("http://localhost:3001/presencas");

      setPresencas(response.data);
    } catch (error) {
      console.error("Erro ao carregar presenças:", error);
    }
  }

  useEffect(() => {
    carregarPresencas();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Lançar Presença</h1>

          <p className="text-gray-500">
            Controle de frequência dos catequizandos
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-500 transition">
          Registrar Presença
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm">Total de Aulas</p>

            <h2 className="text-3xl font-bold text-blue-700">24</h2>
          </div>

          <CalendarDays className="text-blue-600" size={34} />
        </div>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm">Média de Presença</p>

            <h2 className="text-3xl font-bold text-green-700">89%</h2>
          </div>

          <CheckCircle2 className="text-green-600" size={34} />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Próxima Aula</p>

            <h2 className="text-3xl font-bold text-gray-700">11/05</h2>
          </div>

          <Clock3 className="text-gray-600" size={34} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-4">Data</th>
              <th>Tema</th>
              <th>Tipo</th>
              <th>Turma</th>
              <th>Presentes</th>
            </tr>
          </thead>

          <tbody>
            {presencas.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-4">{item.data}</td>

                <td>{item.tema}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.tipo === "Aula"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {item.tipo}
                  </span>
                </td>

                <td>{item.turma}</td>

                <td>
                  <button className="text-blue-600 hover:text-blue-800">
                    Ver Lista
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
