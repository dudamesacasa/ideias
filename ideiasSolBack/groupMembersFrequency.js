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
  const { user } = req.query;

  const sqlFindUser = `SELECT active, type, bond, user 
  from users where users.user = ?;`;

  db.query(sqlFindUser, [user], (err, result) => {
    const sqlFindGroup =
      "SELECT groupSol.groupId from users left join groupSOL on groupSol.groupId = users.bond where users.user = ? and (users.type = 'GRUPO' || users.type = 'LÍDER' || users.type = 'RELATOR');";

    db.query(sqlFindGroup, [result[0].user], (err, resultGroup) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar membros do grupo!" });
      }

      const groupId = resultGroup[0].groupId;

      const sqlSelect = `SELECT groupMembers.memberid, employee.name
          FROM groupMembers 
          JOIN employee ON employee.employeeId = groupMembers.memberId 
          WHERE groupMembers.groupId = ?
          ORDER BY employee.name;`;

      db.query(sqlSelect, [groupId], (err, result) => {
        if (err) {
          console.error("Erro ao buscar membros!", err);
          res.status(500).json({ error: "Erro interno do servidor" });
          return;
        }
        res.status(200).json(result);
      });
    });
  });
});

module.exports = router;
