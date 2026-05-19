import { useState } from "react";

import SidebarAluno from "../components/SidebarAluno";

import { Menu, X, GraduationCap } from "lucide-react";

export default function MainLayoutAluno({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden">
      <div className="hidden lg:flex">
        <SidebarAluno />
      </div>

      <div
        className={`
          fixed
          inset-0
          z-50
          lg:hidden
          transition-all
          duration-300

          ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}
        `}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div
          className={`
            absolute
            top-0
            left-0
            h-full
            w-72
            transition-transform
            duration-300

            ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <SidebarAluno />
        </div>

        <div className="w-full h-full" onClick={() => setMenuOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-[#111827] border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-600 flex items-center justify-center">
              <GraduationCap className="text-white" size={22} />
            </div>

            <div>
              <h1 className="text-white font-bold text-lg">Catequese</h1>

              <p className="text-gray-400 text-xs">Área do Aluno</p>
            </div>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
