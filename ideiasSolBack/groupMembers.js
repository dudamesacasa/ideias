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
  const groupId = req.query.groupId;

  const sqlSelect = `SELECT groupMembers.memberid, employee.name, groupMembers.leader, groupMembers.reporter 
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

router.delete("/:memberId", (req, res) => {
  const memberId = req.params.memberId;

  console.log("delete");
  const sqlDelete = "DELETE FROM groupMembers WHERE groupMembers.memberid = ?;";

  db.query(sqlDelete, memberId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro. Não foi possível excluir o membro do grupo!");
    } else {
      return res.status(200).send("Membro excluído com sucesso!");
    }
  });
});

router.put("/:editingDepartmentId", (req, res) => {
  const memberid = req.params.editingmemberid;
  const editedData = req.body.editedData;

  const sqlUpdateMember = "UPDATE groupMembers SET leader = ?, reporter = ? WHERE memberid = ?;";
  db.query(sqlUpdateMember, [editedData, memberid], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro: não foi possível editar o membro do grupo!" });
    } else {
      res.status(200).json({ message: "Membro atualizado com sucesso" });
    }
  });
});

module.exports = router;
