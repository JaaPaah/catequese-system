import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../pages/Firebase";

export default function Cadastro() {

  const [Nome, setNome] = useState("");
  const [Idade, setIdade] = useState("");
  const [Responsavel, setResponsavel] = useState("");
  const [Telefone, setTelefone] = useState("");
  const [lista, setLista] = useState([]);

  // CARREGAR DADOS
  const carregar = async () => {

    const querySnapshot = await getDocs(
      collection(db, "Aluno")
    );

    const dados = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setLista(dados);
  };

  // SALVAR DADOS
  const salvar = async () => {

    await addDoc(collection(db, "Aluno"), {
      Nome,
      Idade,
      Responsavel,
      Telefone,
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

      <h2 className="text-center mb-4">
        Sistema de Catequese
      </h2>

      {/* FORMULÁRIO */}
      <div className="card p-4 shadow">

        <h4>Cadastro de Catequizando</h4>

        <div className="row">

          <div className="col-md-6">
            <input
              className="form-control mt-2"
              placeholder="Nome"
              value={Nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control mt-2"
              placeholder="Idade"
              value={Idade}
              onChange={(e) => setIdade(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control mt-2"
              placeholder="Responsável"
              value={Responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control mt-2"
              placeholder="Telefone"
              value={Telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

        </div>

        <button
          className="btn btn-primary mt-3"
          onClick={salvar}
        >
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
                <td>{item.Nome}</td>
                <td>{item.Idade}</td>
                <td>{item.Responsavel}</td>
                <td>{item.Telefone}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}