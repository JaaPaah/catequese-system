const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 1. Importando as rotas
const catequizandos = require("./routes/catequizandos");
const frequencia = require("./routes/frequencia");
const turma = require("./routes/turma");
const avisos = require("./routes/avisos");

// 2. Vinculando os caminhos da API às rotas correspondentes
app.use("/catequizandos", catequizandos);
app.use("/frequencia", frequencia);
app.use("/turma", turma);
app.use("/avisos", avisos);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
