import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardCheck,
  Megaphone,
  LogOut,
  Shield,
  UserPlus,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  function logout() {
    localStorage.removeItem("user");

    navigate("/");
  }

  const menus = [
    {
      nome: "Dashboard",
      icon: LayoutDashboard,
      path: "/adm",
    },

    {
      nome: "Cadastro",
      icon: UserPlus,
      path: "/cadastro",
    },

    {
      nome: "Catequizandos",
      icon: Users,
      path: "/catequizandos",
    },

    {
      nome: "Turmas",
      icon: BookOpen,
      path: "/turmas",
    },

    {
      nome: "Presenças",
      icon: ClipboardCheck,
      path: "/presencas",
    },

    {
      nome: "Avisos",
      icon: Megaphone,
      path: "/avisos",
    },
  ];

  return (
    <aside className="w-72 bg-[#0f172a] border-r border-slate-800 min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
              <Shield className="text-white" size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">Catequese</h1>

              <p className="text-gray-400 text-sm">Sistema Administrativo</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">
            <p className="text-gray-400 text-sm">Usuário logado</p>

            <h2 className="text-white font-bold text-lg mt-1">
              {user?.nome || "Administrador"}
            </h2>

            <span className="inline-block mt-3 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              Administrador
            </span>
          </div>

          <nav className="space-y-2">
            {menus.map((item) => {
              const Icon = item.icon;

              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.nome}
                  to={item.path}
                  className={`
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    rounded-2xl
                    transition
                    font-medium
                    w-full

                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-slate-800"
                    }
                  `}
                >
                  <Icon size={22} />

                  <span className="truncate">{item.nome}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-500 transition rounded-2xl py-4 text-white font-semibold flex items-center justify-center gap-3"
        >
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
}
