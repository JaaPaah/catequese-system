import { User, LogOut } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <header className="bg-white shadow h-20 flex items-center justify-between px-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Sistema de Catequese
            </h1>

            <p className="text-gray-500 text-sm">Painel Administrativo</p>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg">
              <User size={18} />
              Admin
            </button>

            <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg">
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
