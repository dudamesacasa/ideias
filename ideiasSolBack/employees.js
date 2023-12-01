const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ideiassol2",
});

router.post("/", (req, res) => {
  const formData = req.body.formData;

  const sqlCheck = "SELECT COUNT(*) AS count FROM employee WHERE employee.document = ?;";
  const sqlCheckManager =
    "SELECT COUNT(*) AS count FROM employee WHERE employee.type = 'GESTOR' and employee.departmentId = ?;";

  db.query(sqlCheck, [formData.document], (checkErr, checkResults) => {
    if (checkErr) {
      res.status(500).json({ error: "Erro: não foi possível cadastrar o funcionário!" });
      return;
    }

    const employeeCont = checkResults[0].count;

    if (employeeCont > 0) {
      res.status(400).json({ error: "Funcionário já cadastrado." });
      return;
    }

    db.query(sqlCheckManager, [formData.departmentId], (checkErr, checkResults) => {
      const managerCont = checkResults[0].count;

      if (managerCont > 0 && formData.type === "GESTOR") {
        res.status(400).json({ error: "Já existe um gestor cadastrado para este setor!" });
        return;
      }

      const data = Object.values(formData);

      const sqlInsertEmployeeId =
        "INSERT INTO employee (name, document, departmentId, groupId, active, type) values (?);";
      db.query(sqlInsertEmployeeId, [data], (err, results) => {
        if (err) {
          console.error("Erro ao inserir funcionário", err);
          res.status(500).json({ error: "Erro: não foi possível cadastrar o funcionário!" });
          return;
        }
        res.status(200).json(results);
      });
    });
  });
});

router.put("/:editingEmployeeId", async (req, res) => {
  try {
    const employeeId = req.params.editingEmployeeId;
    const editedData = req.body;

    const sqlCheck = "SELECT COUNT(*) AS count, employee.employeeId FROM employee WHERE employee.document = ? group by employee.employeeId;";
    const sqlCheckManager = "SELECT COUNT(*) AS count, employee.employeeId FROM employee WHERE employee.type = 'GESTOR' and employee.departmentId = ? group by employee.employeeId;";

    const checkResults = await new Promise((resolve, reject) => {
      db.query(sqlCheck, [editedData.document], (checkErr, checkResults) => {
        if (checkErr) {
          reject({ status: 500, error: "Erro: não foi possível editar o funcionário!" });
        } else {
          resolve(checkResults);
        }
      });
    });

    if (checkResults && checkResults.length > 0) {
      const employeeCont = checkResults[0].count;

      if (employeeCont > 0 || departmentCont == undefined) {
        res.status(400).json({ error: "Funcionário já cadastrado." });
        return;
      }
    }

    const managerResults = await new Promise((resolve, reject) => {
      db.query(sqlCheckManager, [editedData.departmentId], (checkErr, checkResults) => {
        if (checkErr) {
          reject({ status: 500, error: "Erro: não foi possível editar o funcionário!" });
        } else {
          resolve(checkResults);
        }
      });
    });

    if (managerResults && managerResults.length > 0) {
      const managerCont = managerResults[0].count;
      const managerContId = managerResults[0].employeeId;

      if (managerCont > 0 && editedData.type === "GESTOR" && employeeId != managerContId) {
        res.status(400).json({ error: "Já existe um gestor cadastrado para este setor!" });
        return;
      }
    }

    const sqlUpdateEmployee = "UPDATE employee SET name = ?, departmentId = ?, groupId = ?, active = ?, type = ? WHERE employeeId = ?;";

    db.query(sqlUpdateEmployee, [editedData.name, editedData.departmentId, editedData.groupId, editedData.active, editedData.type, employeeId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Erro: não foi possível editar o funcionário!" });
      } else {
        res.status(200).json({ message: "Funcionário atualizado com sucesso" });
      }
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.error || "Erro interno do servidor" });
  }
});


router.get("/", (req, res) => {
  const sqlSelect =
    "SELECT employee.employeeId, employee.name, employee.document, department.name as depName, employee.departmentId, groupSol.name as groupName, employee.groupId, employee.active, employee.type FROM employee join department on department.departmentId = employee.departmentId join groupSol on groupSol.groupId = employee.groupId order by employee.employeeId;";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao buscar funcionários" });
    } else {
      res.json(result);
    }
  });
});

router.delete("/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;

  const sqlDelete = "DELETE FROM employee WHERE employeeId = ?;";

  db.query(sqlDelete, employeeId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro interno do servidor");
    } else {
      return res.status(200).send("Excluído");
    }
  });
});

module.exports = router;
