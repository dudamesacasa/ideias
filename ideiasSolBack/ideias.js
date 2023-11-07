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

  console.log(data)

  /*adicionar validação anexos */

  const sqlInsertIdeia =
    "INSERT INTO ideias (campaign, group_id, status, title, description, benefits, whereToDo, performer_id, investment) values ('Melhoria Simples', 1, 'Digitada', ?)";
  db.query(sqlInsertIdeia, [data], (err, results) => {
    if (err) {
      console.error("Erro ao inserir ideia", err);
      res.status(500).json({ error: "Erro interno do servidor. Não foi possível inserir a ideia" });
      return;
    }
    res.status(200).json(results);
  });
});

router.put("/:editingIdeiaId", (req, res) => {
  const ideiaId = req.params.editingIdeiaId;
  const editedData = req.body.editedData;

  console.log(editedData)

  const sqlUpdateIdeia =
    'UPDATE ideias SET campaign = ?, status = ?, description = ?, benefits = ?, whereToDo = ?, performer_id = ?, investment = ?, attachments = ?  WHERE ideiaId = ?';

  db.query(
    sqlUpdateIdeia,
    [
      editedData.campaign,
      editedData.status,
      editedData.description,
      editedData.benefits,
      editedData.whereToDo,
      editedData.performer_id,
      editedData.investment,
      editedData.attachments,
      ideiaId, 
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Erro ao atualizar ideia" });
      } else {
        res.status(200).json({ message: "Ideia atualizada com sucesso" });
      }
    }
  );
});

router.get("/", (req, res) => {
  /*add recuperação do grupo logado do local storage */
  const sqlSelect =
    "SELECT ideiaId, campaign, title, status, description, benefits, whereToDo, department.name, investment, attachments FROM ideias join department on department.departmentId = ideias.performer_id;";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar ideias" });
    } else {
      res.json(result);
    }
  });
});

router.get("/ideia", (req, res) => {
  const ideiaID = req.params.ideia;

  /*add recuperação do grupo logado do local storage */
  const sqlSelect =
    "SELECT * FROM ideias join department on department.departmentId = ideias.performer_id where ideiaID = ?;";

  db.query(sqlSelect, ideia, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar ideias" });
    } else {
      res.json(result);
    }
  });
});

router.delete("/:ideiaId", (req, res) => { 
  const ideiaID = req.params.ideiaId;

  const sqlDelete =
    'DELETE FROM ideias WHERE ideiaId = ?';

  db.query(sqlDelete, ideiaID, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro interno do servidor");
    }
    else {
      res.json(result);
    }
  }); 
}); 

module.exports = router;
  

