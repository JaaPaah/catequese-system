const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Listar todos os avisos
router.get("/", (req, res) => {
  db.query("SELECT * FROM avisos", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// Postar um novo aviso
router.post("/", (req, res) => {
  const { titulo, conteudo, data_publicacao } = req.body;

  db.query(
    "INSERT INTO avisos (titulo, conteudo, data_publicacao) VALUES (?, ?, ?)",
    [titulo, conteudo, data_publicacao],
    (err) => {
      if (err) return res.send(err);
      res.send("Aviso publicado!");
    }
  );
});

// Deletar um aviso
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM avisos WHERE id = ?", [id], (err) => {
    if (err) return res.send(err);
    res.send("Aviso excluído com sucesso!");
  });
});

module.exports = router;
