import { Link } from "react-router-dom";

import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <div className="w-28 h-28 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertTriangle size={55} className="text-red-400" />
        </div>

        <h1 className="text-7xl font-bold text-white">404</h1>

        <h2 className="text-3xl font-bold text-white mt-6">
          Página não encontrada
        </h2>

        <p className="text-gray-400 mt-4 text-lg">
          A página que você tentou acessar não existe no sistema.
        </p>

        <Link
          to="/"
          className="inline-block mt-10 bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl text-white font-semibold"
        >
          Voltar ao Login
        </Link>
      </div>
    </div>
  );
}
