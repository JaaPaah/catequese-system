const express = require("express");

const router = express.Router();

const presencas = [
  {
    id: 1,
    data: "06/05/2026",
    tema: "Os Sacramentos da Igreja",
    tipo: "Aula",
    turma: "Primeira Eucaristia - Turma A",
  },
  {
    id: 2,
    data: "04/05/2026",
    tema: "Missa Dominical",
    tipo: "Missa",
    turma: "-",
  },
  {
    id: 3,
    data: "29/04/2026",
    tema: "A Eucaristia como Sacramento",
    tipo: "Aula",
    turma: "Primeira Eucaristia - Turma A",
  },
];

router.get("/", (req, res) => {
  res.json(presencas);
});

module.exports = router;
