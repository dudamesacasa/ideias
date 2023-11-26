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
  const sqlSelect =
    `SELECT employee.employeeId, employee.name, employee.document, department.name as depName, 
    employee.departmentId, groupSol.name as groupName, employee.groupId, employee.active, employee.type 
    FROM employee 
    join department on department.departmentId = employee.departmentId 
    join groupSol on groupSol.groupId = employee.groupId 
    WHERE NOT EXISTS (
        SELECT 1
        FROM groupMembers
        WHERE groupMembers.memberId = employee.employeeId
    )
    ORDER BY employee.employeeId;`;

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao buscar funcionários" });
    } else {
      res.json(result);
    }
  });
});



module.exports = router;
