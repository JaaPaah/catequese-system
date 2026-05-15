import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white p-5">
      <h1 className="text-2xl font-bold mb-10">Catequese</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/catequizandos" className="hover:text-blue-400">
          Catequizandos
        </Link>

        <Link to="/turmas" className="hover:text-blue-400">
          Turmas
        </Link>

        <Link to="/login" className="hover:text-blue-400">
          Login
        </Link>
      </nav>
    </aside>
  );
}
