const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ideiassol",
});

router.post("/", (req, res) => {
  const formData = req.body.formData;

  if (formData.type === "ADMIN") {
    formData.bond = 0;
  };


  const data = Object.values(formData);

  console.log('formData')
  console.log(formData)

  const sqlInsertUser =
    "INSERT INTO users (user, password, active, type, bond) values (?)";
  db.query(sqlInsertUser, [data], (err, results) => {
    if (err) {
      console.error("Erro ao inserir funcionário", err);
      res.status(500).json({ error: "Erro interno do servidor. Não foi possível inserir o funcionário" });
      return;
    }
    res.status(200).json(results);
  });
});
   
router.put("/:editingUserId", (req, res) => {
  const userId = req.params.editingUserId;
  const editedData = req.body;

  const sqlUpdateUser =
    'UPDATE users SET user = ?, active = ? WHERE userId = ?';

  db.query(
    sqlUpdateUser,
    [
      editedData.user,
      editedData.active,
      editedData.type,
      userId,
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
    "SELECT users.userId, users.user, users.active, users.type, users.bond, groupsol.name as groupName, employee.name as employeeName from users left join groupsol on (users.type = 'GRUPO' or users.type = 'LÍDER' OR users.type = 'RELATOR') and groupsol.groupId = users.bond left join employee on users.type = 'GESTOR' and employee.employeeId = users.bond;";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({ error: "Erro ao buscar funcionários" });
    } else {
      res.json(result);
    }
  });
});

router.delete("/:userId", (req, res) => { 
  const userId = req.params.userId;

  const sqlDelete =
    'DELETE FROM users WHERE userId = ?';

  db.query(sqlDelete, userId, (err, result) => {
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