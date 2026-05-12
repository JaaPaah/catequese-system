const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "GuiihEidam@1404", // coloque sua senha se tiver
  database: "catequese",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar:", err);
  } else {
    console.log("Conectado ao MySQL!");
  }
});

module.exports = db;
