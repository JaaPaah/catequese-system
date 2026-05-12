const express = require("express");

const router = express.Router();

let catequizandos = [
  {
    id: 1,
    nome: "João Pedro",
    turma: "Turma A",
    responsavel: "Maria Souza",
    telefone: "(42) 99999-9999",
  },
];

router.get("/", (req, res) => {
  res.json(catequizandos);
});

router.post("/", (req, res) => {
  const novoCatequizando = {
    id: Date.now(),
    ...req.body,
  };

  catequizandos.push(novoCatequizando);

  res.status(201).json(novoCatequizando);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  catequizandos = catequizandos.filter((item) => item.id !== id);

  res.json({
    mensagem: "Catequizando removido",
  });
});

module.exports = router;
