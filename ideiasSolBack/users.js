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

  const sqlCheckUser = "SELECT COUNT(*) AS count FROM users WHERE user = ?";
  const sqlCheckUserLeader = "SELECT type, count(*) as count from users where type = ? and bond = ? and type != 'ADMIN'";
  db.query(sqlCheckUser, [formData.user], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Erro ao verificar usuário existente", checkErr);
      res.status(500).json({ error: "Erro interno do servidor ao verificar usuário existente" });
      return;
    }

    const userCount = checkResults[0].count;

    if (userCount > 0) {
      res.status(400).json({ error: "Usuário já cadastrado. Escolha um nome de usuário diferente." });
      return;
    }

    db.query(sqlCheckUserLeader, [formData.type, formData.bond], (ckeckErr, checkResults) => {
      if (checkErr) {
        console.error("Erro ao verificar usuário existente", checkErr);
        res.status(500).json({ error: "Erro interno do servidor ao verificar usuário existente" });
        return;
      }

      const userCount = checkResults[0].count;

      if (userCount > 0) {
        if (checkResults[0].type === 'GESTOR') {
          res.status(400).json({ error: "Já existe um usuário cadastrado para este Gestor." });
          return;
        }
        else if(checkResults[0].type === 'LÍDER') {
          res.status(400).json({ error: "Já existe um usuário Líder cadastrado para este grupo." });
          return;
        }  
        else if(checkResults[0].type === 'RELATOR') {
          res.status(400).json({ error: "Já existe um usuário Relator cadastrado para este grupo." });
          return;
        }      
        else {
          res.status(400).json({ error: "Já existe um usuário cadastrado para este grupo." });
          return;
        } ;
      }

      if (formData.type === "ADMIN") {
        formData.bond = 0;
      }
      const data = Object.values(formData);

      const sqlInsertUser = "INSERT INTO users (user, password, active, type, bond) VALUES (?)";

      db.query(sqlInsertUser, [data], (insertErr, results) => {
        if (insertErr) {
          console.error("Erro ao inserir funcionário", insertErr);
          res.status(500).json({ error: "Erro interno do servidor. Não foi possível inserir o funcionário" });
          return;
        }

        res.status(200).json(results);
      });
    });
  });
});

router.put("/:editingUserId", (req, res) => {
  const userId = req.params.editingUserId;
  const editedData = req.body;

  const sqlUpdateUser = "UPDATE users SET user = ?, active = ? WHERE userId = ?";

  db.query(sqlUpdateUser, [editedData.user, editedData.active, userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao atualizar o funcionário" });
    } else {
      res.status(200).json({ message: "Funcionário atualizado com sucesso" });
    }
  });
});

router.get("/", (req, res) => {
  const sqlSelect =
    "SELECT users.userId, users.user, users.active, users.type, users.bond, groupsol.name as groupName, employee.name as employeeName from users left join groupsol on (users.type = 'GRUPO' or users.type = 'LÍDER' OR users.type = 'RELATOR') and groupsol.groupId = users.bond left join employee on users.type = 'GESTOR' and employee.employeeId = users.bond;";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao buscar funcionários" });
    } else {
      res.json(result);
    }
  });
});

router.delete("/:userId", (req, res) => {
  const userId = req.params.userId;

  const sqlDelete = "DELETE FROM users WHERE userId = ?";

  db.query(sqlDelete, userId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro interno do servidor");
    } else {
      return res.status(200).send("Excluído");
    }
  });
});

module.exports = router;
