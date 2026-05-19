import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    if (user.role === "adm") {
      return <Navigate to="/adm" />;
    }

    if (user.role === "aluno") {
      return <Navigate to="/aluno" />;
    }
  }

  return children;
}
