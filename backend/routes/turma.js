const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Listar todas as turmas
router.get("/", (req, res) => {
  db.query("SELECT * FROM turmas", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// Criar uma nova turma
router.post("/", (req, res) => {
  const { nome_turma, ano, catequista } = req.body;

  db.query(
    "INSERT INTO turmas (nome_turma, ano, catequista) VALUES (?, ?, ?)",
    [nome_turma, ano, catequista],
    (err) => {
      if (err) return res.send(err);
      res.send("Turma criada!");
    }
  );
});

// Excluir uma turma
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM turmas WHERE id = ?", [id], (err) => {
    if (err) return res.send(err);
    res.send("Turma excluída com sucesso!");
  });
});

module.exports = router;
