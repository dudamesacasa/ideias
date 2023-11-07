const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ideiassol2",
});

router.get("/", (req, res) => {
  
    const sqlSelect =
      "select g.name, count(i.group_id) as qtd from groupSol g left join ideias i on g.groupId = i.group_id where i.status = 'IMPLANTADA' group by g.name order by qtd desc;";
  
    db.query(sqlSelect, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Erro ao buscar ideias" });
      } else {
        res.json(result);
      }
    });
  });

  module.exports = router;