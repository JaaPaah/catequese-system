import { LayoutDashboard, Users, BookOpen, LogIn } from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#0f172a] text-white p-6 border-r border-slate-800">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Catequese</h1>

        <p className="text-sm text-gray-400">Painel Administrativo</p>
      </div>

      <nav className="flex flex-col gap-3">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/catequizandos"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
        >
          <Users size={20} />
          Catequizandos
        </Link>

        <Link
          to="/turmas"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
        >
          <BookOpen size={20} />
          Turmas
        </Link>

        <Link
          to="/login"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition"
        >
          <LogIn size={20} />
          Login
        </Link>
      </nav>
    </aside>
  );
}
