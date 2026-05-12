import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Bell,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-10">Catequese</h2>

      <nav className="flex flex-col gap-3">
        <button className="flex items-center gap-3 bg-blue-600 p-3 rounded-xl">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 hover:bg-blue-600 p-3 rounded-xl transition">
          <Users size={20} />
          Catequizandos
        </button>

        <button className="flex items-center gap-3 hover:bg-blue-600 p-3 rounded-xl transition">
          <CalendarCheck size={20} />
          Presenças
        </button>

        <button className="flex items-center gap-3 hover:bg-blue-600 p-3 rounded-xl transition">
          <Bell size={20} />
          Avisos
        </button>

        <button className="flex items-center gap-3 hover:bg-blue-600 p-3 rounded-xl transition">
          <Settings size={20} />
          Configurações
        </button>
      </nav>
    </aside>
  );
}
