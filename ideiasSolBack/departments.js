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
  const sql = "SELECT department.departmentId, department.name, employee.name as employeeName, department.executioner, department.active FROM department join employee on employee.employeeId = department.manager_id";
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

  const sqlInsertDepartment = "INSERT INTO department (name, manager_id, executioner, active) values (?)";
  db.query(sqlInsertDepartment, [data], (err, results) => {
    if (err) {
      console.error("Erro ao inserir grupo", err);
      res.status(500).json({ error: "Erro interno do servidor. Não foi possível inserir o grupo" });
      return;
    }
    res.status(200).json(results); 
  });
});

router.put("/:editingDepartmentId", (req, res) => {
  const departmentId = req.params.editingDepartmentId;
  const editedData = req.body;
    
  const sqlUpdateDepartment =
    "UPDATE department SET name = ?, manager_id = ?, executioner = ?, active = ? WHERE departmentId = ?";
  db.query(
    sqlUpdateDepartment,
    [editedData.name, editedData.manager_id, editedData.executioner, editedData.active, departmentId],
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

router.delete("/:departmentId", (req, res) => {
  const departmentId = req.params.departmentId;

  console.log("delete");
  const sqlDelete = "DELETE FROM department WHERE departmentId = ?";

  db.query(sqlDelete, departmentId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro interno do servidor");
    } else {
      return res.status(200).send("Excluído");
    }
  });
});

module.exports = router;
