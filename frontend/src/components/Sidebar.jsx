import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  LogIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`
        bg-[#0f172a]
        border-r
        border-slate-800
        min-h-screen
        p-4
        transition-all
        duration-300
        flex
        flex-col
        ${collapsed ? "w-24" : "w-72"}
      `}
    >
      <div className="flex items-center justify-between mb-10">
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold text-white">Catequese</h1>

            <p className="text-gray-400 text-sm">Painel Administrativo</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="bg-slate-800 hover:bg-slate-700 transition p-2 rounded-lg text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition text-gray-200"
        >
          <LayoutDashboard size={20} />

          {!collapsed && "Dashboard"}
        </Link>

        <Link
          to="/catequizandos"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition text-gray-200"
        >
          <Users size={20} />

          {!collapsed && "Catequizandos"}
        </Link>

        <Link
          to="/turmas"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition text-gray-200"
        >
          <BookOpen size={20} />

          {!collapsed && "Turmas"}
        </Link>

        <Link
          to="/presencas"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition text-gray-200"
        >
          <ClipboardCheck size={20} />

          {!collapsed && "Presenças"}
        </Link>

        <Link
          to="/login"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 transition text-gray-200"
        >
          <LogIn size={20} />

          {!collapsed && "Login"}
        </Link>
      </nav>
    </aside>
  );
}
