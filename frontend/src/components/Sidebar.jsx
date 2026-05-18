import { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  Megaphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();

  const menuItems = [
    {
      nome: "Dashboard",
      rota: "/adm",
      icon: LayoutDashboard,
    },

    {
      nome: "Catequizandos",
      rota: "/catequizandos",
      icon: Users,
    },

    {
      nome: "Turmas",
      rota: "/turmas",
      icon: BookOpen,
    },

    {
      nome: "Presenças",
      rota: "/presencas",
      icon: ClipboardCheck,
    },

    {
      nome: "Avisos",
      rota: "/avisos",
      icon: Megaphone,
    },
  ];

  return (
    <aside
      className={`
        bg-[#0f172a]
        border-r
        border-slate-800
        min-h-screen
        transition-all
        duration-300
        flex
        flex-col
        ${collapsed ? "w-24" : "w-72"}
      `}
    >
      <div className="flex items-center justify-between p-6 border-b border-slate-800">
        {!collapsed && (
          <div>
            <h1 className="text-white text-2xl font-bold">Catequese</h1>

            <p className="text-gray-400 text-sm">Sistema</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="bg-slate-800 hover:bg-slate-700 transition p-2 rounded-lg text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const ativo = location.pathname === item.rota;

          return (
            <Link
              key={item.rota}
              to={item.rota}
              className={`
                flex
                items-center
                gap-3
                p-4
                rounded-xl
                transition
                font-medium

                ${
                  ativo
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-800"
                }
              `}
            >
              <Icon size={22} />

              {!collapsed && <span>{item.nome}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-900 rounded-xl p-4">
          {!collapsed && (
            <>
              <p className="text-white font-semibold">Painel Admin</p>

              <p className="text-gray-400 text-sm mt-1">CatequeseSystem</p>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
