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
  const data = Object.values(formData);

  const sqlInsertEmployeeId =
    "INSERT INTO employee (name, document, departmentId, groupId, active, type) values (?)";
  db.query(sqlInsertEmployeeId, [data], (err, results) => {
    if (err) {
      console.error("Erro ao inserir funcionário", err);
      res.status(500).json({ error: "Erro interno do servidor. Não foi possível inserir o funcionário" });
      return;
    }
    res.status(200).json(results);
  });
});
   
router.put("/:editingEmployeeId", (req, res) => {
  const employeeId = req.params.editingEmployeeId;
  const editedData = req.body;

  const sqlUpdateEmployee =
    'UPDATE employee SET name = ?, document = ?, departmentId = ?, groupId = ?, active = ?, type = ? WHERE employeeId = ?';

  db.query(
    sqlUpdateEmployee,
    [
      editedData.name,
      editedData.document,
      editedData.departmentId,
      editedData.groupId,
      editedData.active,
      editedData.type,
      employeeId,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Erro ao atualizar o funcionário" });
      } else {
        res.status(200).json({ message: "Funcionário atualizado com sucesso" });
      }
    }
  );
});
 
router.get("/", (req, res) => {
  const sqlSelect =
    "SELECT employee.employeeId, employee.name, employee.document, department.name as depName, groupSol.name as groupName, employee.active, employee.type FROM employee join department on department.departmentId = employee.departmentId join groupSol on groupSol.groupId = employee.groupId order by employee.employeeId;";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ error: "Erro ao buscar funcionários" });
    } else {
      res.json(result);
    }
  });
});

router.get("/", (req, res) => {
  const sqlSelect =
    "SELECT employee.name FROM employee;";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ error: "Erro ao buscar funcionários" });
    } else {
      res.json(result);
    }
  });
});

router.delete("/:employeeId", (req, res) => { 
  const employeeId = req.params.employeeId;

  console.log('delete')
  const sqlDelete =
    'DELETE FROM employee WHERE employeeId = ?';

  db.query(sqlDelete, employeeId, (err, result) => {
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