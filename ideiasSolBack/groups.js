// groups.js
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
  const sql = "SELECT groupSol.name, groupSol.groupId, department.name as depName, groupSol.departmentId, groupSol.email, groupSol.avatar, groupSol.active FROM groupSol join department on department.departmentID = groupSol.departmentid";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar grupos:", err);
      res.status(500).json({ error: "Erro interno do servidor" });
      return;
    }
    res.status(200).json(results);
  });
});


router.post("/", (req, res) => {
  const name = req.body.groupData.name;
  const departmentId = req.body.groupData.departmentId;
  const email = req.body.groupData.email;
  const avatar = req.body.groupData.avatar;
  const active = req.body.groupData.active;
  const members = req.body.groupData.members;

  const sqlInsertGroups = "INSERT INTO groupSol (name, departmentId, email, avatar, active) VALUES (?, ?, ?, ?, ?)";
  db.query(sqlInsertGroups, [name, departmentId, email, avatar, active, members], (err, results) => {
    if (err) {
      console.error("Erro ao inserir grupo", err);
      console.log(err);
      res.status(500).json({ error: "Erro interno do servidor. Não foi possível inserir o grupo" });
      return;
    }

    const groupId = results.insertId;

    if (members && members.length > 0) {
      const membersValues = members.map((member) => [member.employeeId, groupId, member.isLeader, member.isReporter]);
      const sqlInsertMembers = "INSERT INTO groupMembers (memberId, groupId, leader, reporter) VALUES ?";
      db.query(sqlInsertMembers, [membersValues], (err, memberResults) => {
        if (err) {
          console.error("Erro ao inserir membros no grupo", err);
          res.status(500).json({ error: "Erro ao adicionar membros ao grupo" });
        } else {
          res.status(200).json({ groupId: groupId, message: "Grupo inserido com sucesso!" });
        }
      });
    } else {
      res.status(200).json({ groupId: groupId, message: "Grupo inserido com sucesso!" });
    }
  });
});



router.put("/:editingGroupId", (req, res) => {
  const groupsId = req.params.editingGroupId;
  const editedData = req.body.editedGroup;

  const sqlUpdateGroups =
    "UPDATE groupSol SET name = ?, departmentId = ?, email = ?, avatar = ?, active = ? WHERE groupId = ?";
  db.query(
    sqlUpdateGroups,
    [editedData.name, editedData.departmentId, editedData.email, editedData.avatar, editedData.active, groupsId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Erro ao atualizar o grupo" });
      } else {
        res.status(200).json({ message: "Grupo atualizado com sucesso" });
      }
    }
  );
});

router.delete("/:groupId", (req, res) => { 
  const groupId = req.params.groupId;

  const sqlDelete =
    'DELETE FROM groupSol WHERE groupId = ?';

  db.query(sqlDelete, groupId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro interno do servidor");
    }
    else {
      return res.status(200).send("Excluído");
    }
  });
}); 


module.exports = router;
