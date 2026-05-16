import {
  LayoutDashboard,
  Users,
  BookOpen,
  LogIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },
    {
      name: "Catequizandos",
      icon: <Users size={20} />,
      path: "/catequizandos",
    },
    {
      name: "Turmas",
      icon: <BookOpen size={20} />,
      path: "/turmas",
    },
    {
      name: "Login",
      icon: <LogIn size={20} />,
      path: "/login",
    },
  ];

  return (
    <aside
      className={`min-h-screen bg-[#0f172a] border-r border-slate-800 transition-all duration-300 flex flex-col ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      <div className="flex items-center justify-between p-6 border-b border-slate-800">
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold text-white">Catequese</h1>

            <p className="text-sm text-gray-400">Painel Administrativo</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="bg-slate-800 hover:bg-slate-700 transition p-2 rounded-lg text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {menus.map((menu) => {
          const active = location.pathname === menu.path;

          return (
            <Link
              key={menu.name}
              to={menu.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {menu.icon}

              {!collapsed && <span className="font-medium">{menu.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
