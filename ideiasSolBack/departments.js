// departments.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ideiassol",
});

router.get("/", (req, res) => {
  const sql = "SELECT name, departmentId FROM department";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar departamentos:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
      return;
    }
    res.status(200).json(results);
  });
});

module.exports = router;
