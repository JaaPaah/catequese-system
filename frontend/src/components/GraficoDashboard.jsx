import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", catequizandos: 30 },
  { name: "Fev", catequizandos: 45 },
  { name: "Mar", catequizandos: 52 },
  { name: "Abr", catequizandos: 70 },
  { name: "Mai", catequizandos: 90 },
];

export default function GraficoDashboard() {
  return (
    <div className="bg-[#111827] p-6 rounded-2xl shadow-xl border border-slate-800">
      <h2 className="text-white text-xl font-semibold mb-6">
        Crescimento de Catequizandos
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#94a3b8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="catequizandos"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
