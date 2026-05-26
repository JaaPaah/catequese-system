const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Listar todas as frequências
router.get("/", (req, res) => {
  db.query("SELECT * FROM frequencia", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// Registrar uma nova presença/falta
router.post("/", (req, res) => {
  const { catequizando_id, data_aula, status } = req.body;

  db.query(
    "INSERT INTO frequencia (catequizando_id, data_aula, status) VALUES (?, ?, ?)",
    [catequizando_id, data_aula, status],
    (err) => {
      if (err) return res.send(err);
      res.send("Frequência registrada!");
    }
  );
});

// Excluir um registro de frequência
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM frequencia WHERE id = ?", [id], (err) => {
    if (err) return res.send(err);
    res.send("Frequência excluída com sucesso!");
  });
});

module.exports = router;
