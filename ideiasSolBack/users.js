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
  const data = Object.values(formData);

  const sqlInsertUser =
    "INSERT INTO users (user, password, active, type) values (?)";
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

  console.log(userId)
  console.log(editedData)

  const sqlUpdateUser =
    'UPDATE users SET user = ?, active = ?, type = ? WHERE userId = ?';

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
    "SELECT users.userId, users.user, users.active, users.type from users;";

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