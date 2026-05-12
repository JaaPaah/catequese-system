const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const catequizandosRoutes = require("./routes/catequizandos");
const turmasRoutes = require("./routes/turmas");
const presencasRoutes = require("./routes/presencas");

app.use("/catequizandos", catequizandosRoutes);
app.use("/turmas", turmasRoutes);
app.use("/presencas", presencasRoutes);

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
