import { useState } from "react";

import Sidebar from "../components/Sidebar";

import { Menu, X } from "lucide-react";

export default function MainLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-72">
            <Sidebar />
          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-[#111827] border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">Catequese</h1>

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
