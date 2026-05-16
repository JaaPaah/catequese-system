import { Bell, Search, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Bem-vindo 👋</h1>

        <p className="text-gray-400 mt-1">
          Sistema administrativo de catequese
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-[#111827] border border-slate-800 rounded-xl px-4 py-3 w-80">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none text-white ml-3 w-full"
          />
        </div>

        <button className="relative bg-[#111827] border border-slate-800 hover:bg-slate-800 transition p-3 rounded-xl">
          <Bell size={20} className="text-white" />

          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 bg-[#111827] border border-slate-800 px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-800 transition">
          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />

          <div className="hidden md:block">
            <p className="text-white text-sm font-medium">Guilherme</p>

            <span className="text-gray-400 text-xs">Administrador</span>
          </div>

          <ChevronDown size={18} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}
