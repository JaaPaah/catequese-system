import { useState, useEffect } from "react";
import api from "../services/api";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [telefone, setTelefone] = useState("");
  const [lista, setLista] = useState([]);

  const carregar = async () => {
    const res = await api.get("/catequizandos");
    setLista(res.data);
  };

  const salvar = async () => {
    await api.post("/catequizandos", {
      nome,
      idade,
      responsavel,
      telefone,
    });

    setNome("");
    setIdade("");
    setResponsavel("");
    setTelefone("");
    carregar();
  };

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Sistema de Catequese</h2>

      {/* FORMULÁRIO */}
      <div className="card p-4 shadow">
        <h4>Cadastro de Catequizando</h4>

        <div className="row">
          <div className="col-md-6">
            <input
              className="form-control mt-2"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control mt-2"
              placeholder="Idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control mt-2"
              placeholder="Responsável"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control mt-2"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary mt-3" onClick={salvar}>
          Cadastrar
        </button>
      </div>

      {/* TABELA */}
      <div className="card mt-4 p-4 shadow">
        <h4>Lista de Catequizandos</h4>

        <table className="table table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Responsável</th>
              <th>Telefone</th>
            </tr>
          </thead>

          <tbody>
            {lista.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.idade}</td>
                <td>{item.responsavel}</td>
                <td>{item.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
