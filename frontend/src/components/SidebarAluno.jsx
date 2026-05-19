import { ClipboardCheck, Megaphone, LogOut } from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SidebarAluno() {
  const location = useLocation();

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");

    navigate("/login");
  }

  const menus = [
    {
      nome: "Presenças",
      icon: ClipboardCheck,
      path: "/aluno",
    },

    {
      nome: "Avisos",
      icon: Megaphone,
      path: "/avisos-aluno",
    },
  ];

  return (
    <aside className="w-72 bg-[#0f172a] border-r border-slate-800 min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white">Catequese</h1>

          <p className="text-gray-400 mt-1">Área do Aluno</p>
        </div>

        <nav className="px-4 space-y-2">
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
                      ? "bg-green-600 text-white"
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
