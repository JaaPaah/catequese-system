import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import Catequizandos from "./pages/Catequizandos";
import Turmas from "./pages/Turmas";
import Presencas from "./pages/Presencas";

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Catequizandos />} />

          <Route path="/turmas" element={<Turmas />} />

          <Route path="/presencas" element={<Presencas />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
