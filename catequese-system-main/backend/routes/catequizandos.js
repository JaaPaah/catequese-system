const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM catequizandos", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { nome, idade, responsavel, telefone } = req.body;

  db.query(
    "INSERT INTO catequizandos (nome, idade, responsavel, telefone) VALUES (?, ?, ?, ?)",
    [nome, idade, responsavel, telefone],
    (err) => {
      if (err) return res.send(err);
      res.send("Cadastrado!");
    },
  );
});

module.exports = router;

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM catequizandos WHERE id = ?", [id], (err) => {
    if (err) return res.send(err);
    res.send("Excluído com sucesso!");
  });
});
