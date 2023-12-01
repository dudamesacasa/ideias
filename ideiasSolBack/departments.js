// departments.js
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
  const sql =
    "SELECT department.departmentId, department.name, employee.name as employeeName, employee.employeeId , department.executioner, department.active FROM department join employee on employee.employeeId = department.manager_id;";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar grupos:", err);
      res.status(500).json({ error: "Erro: não foi possível obter os departamentos cadastrados!" });
      return;
    }
    res.status(200).json(results);
  });
});

router.post("/", (req, res) => {
  const formData = req.body.formData;

  const sqlCheck = "SELECT COUNT(*) AS count FROM department WHERE department.name = ?;";

  db.query(sqlCheck, [formData.name], (checkErr, checkResults) => {
    if (checkErr) {
      res.status(500).json({ error: "Erro: não foi possível cadastrar o departamento!" });
      return;
    }

    const departmentCont = checkResults[0].count;

    if (departmentCont > 0) {
      res.status(400).json({ error: "Departamento já cadastrado." });
      return;
    }

    const data = Object.values(formData);

    const sqlInsertDepartment = "INSERT INTO department (name, manager_id, executioner, active) values (?);";
    db.query(sqlInsertDepartment, [data], (err, results) => {
      if (err) {
        res.status(500).json({ error: "Erro: não foi possível cadastrar o departamento!" });
        return;
      }
      res.status(200).json(results);
    });
  });
});

router.put("/:editingDepartmentId", (req, res) => {
  const departmentId = req.params.editingDepartmentId;
  const { nameEdited, ...editedData } = req.body;

  const sqlCheck =
    "SELECT COUNT(*) AS count, departmentId FROM department WHERE department.name = ? group by departmentId;";

  db.query(sqlCheck, [editedData.name], (checkErr, checkResults) => {
    if (checkErr) {
      res.status(500).json({ error: "Erro: não foi possível editar o departamento!" });
      return;
    }
 
    if (checkResults != "") {
      const departmentCont = checkResults[0].count;

      if (
        (departmentCont > 0 || departmentCont == undefined) &&
        nameEdited === true &&
        departmentId != checkResults[0].departmentId
      ) {
        res.status(400).json({ error: "Departamento já cadastrado." });
        return;
      }
    }

    const sqlUpdateDepartment =
      "UPDATE department SET name = ?, manager_id = ?, executioner = ?, active = ? WHERE departmentId = ?;";
    db.query(
      sqlUpdateDepartment,
      [editedData.name, editedData.manager_id, editedData.executioner, editedData.active, departmentId],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "Erro: não foi possível editar o departamento!" });
        } else {
          res.status(200).json({ message: "Departamento atualizado com sucesso" });
        }
      }
    );
  });
});

router.delete("/:departmentId", (req, res) => {
  const departmentId = req.params.departmentId;

  const sqlDelete = "DELETE FROM department WHERE departmentId = ?;";

  db.query(sqlDelete, departmentId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro: não foi possível excluir o departamento!");
    } else {
      return res.status(200).send("Departamento excluído com sucesso!");
    }
  });
});

module.exports = router;
