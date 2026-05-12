const express = require("express");

const router = express.Router();

let turmas = [
  {
    id: 1,
    nome: "Primeira Eucaristia - Turma A",
    catequista: "Maria Helena",
    alunos: 18,
  },
  {
    id: 2,
    nome: "Crisma - Turma B",
    catequista: "João Carlos",
    alunos: 12,
  },
];

router.get("/", (req, res) => {
  res.json(turmas);
});

router.post("/", (req, res) => {
  const novaTurma = {
    id: turmas.length + 1,
    ...req.body,
  };

  turmas.push(novaTurma);

  res.status(201).json(novaTurma);
});

module.exports = router;
