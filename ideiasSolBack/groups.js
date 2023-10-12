// groups.js
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
  const sql = "SELECT name, groupId, departmentId, email, active FROM groupSol";
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
  const formData = req.body.formData;
  const data = Object.values(formData);

  const sqlInsertGroups = "INSERT INTO groupSol (name, departmentId, email, avatar, active) values (?)";
  db.query(sqlInsertGroups, [data], (err, results) => {
    if (err) {
      console.error("Erro ao inserir grupo", err);
      res.status(500).json({ error: "Erro interno do servidor. Não foi possível inserir o grupo" });
      return;
    }
    res.status(200).json(results);
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

  console.log('delete')
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
