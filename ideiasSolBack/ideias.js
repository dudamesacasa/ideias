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
  const { user, ...formData } = req.body.formData;
  const data = Object.values(formData);

  const sqlFindUser = "SELECT active, type, bond, user from users where users.user = ?;";

  db.query(sqlFindUser, [user], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao inserir ideia!" });
    }

    const sqlFindGroup =
      "SELECT groupSol.groupId from users left join groupSOL on groupSol.groupId = users.bond where users.user = ? and (users.type = 'GRUPO' || users.type = 'LÍDER' || users.type = 'RELATOR');";

    db.query(sqlFindGroup, [result[0].user], (err, resultGroup) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar ideias!" });
      }

      const sqlInsertIdeia =
        "INSERT INTO ideias (campaign, group_id, status, title, description, benefits, whereToDo, performer_id, investment) values ('Melhoria Simples', ?, 'EM ELABORAÇÃO', ?)";

      const groupId = resultGroup[0].groupId;

      db.query(sqlInsertIdeia, [groupId, data], (err, results) => {
        if (err) {
          console.error("Erro ao inserir ideia", err);
          return res.status(500).json({ error: "Erro interno do servidor. Não foi possível inserir a ideia" });
        }
        res.status(200).json(results);
      });
    });
  });
});


router.put("/:editingIdeiaId", (req, res) => {
  const ideiaId = req.params.editingIdeiaId; 
  const { user, ...editedData } = req.body.editedDataWithUser;
  const data = Object.values(editedData);

  const sqlUpdateIdeia =
    "UPDATE ideias SET campaign = ?, status = ?, description = ?, benefits = ?, whereToDo = ?, performer_id = ?, investment = ?, attachments = ?  WHERE ideiaId = ?";

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
  const { user } = req.query; 

  const sqlFindUser = "SELECT active, type, bond, user from users where users.user = ?;";

  db.query(sqlFindUser, [user], (err, result) => {

    if (err) {
      res.status(500).json({ error: "Erro ao buscar ideias!" });
    } else {
      if (result[0].type == "GRUPO" || result[0].type == "LÍDER" || result[0].type == "RELATOR") {
        const sqlFindGroup =
          "SELECT groupSol.groupId from users left join groupSOL on groupSol.groupId = users.bond where users.user = ? and (users.type = 'GRUPO' || users.type = 'LÍDER' || users.type = 'RELATOR');";

        db.query(sqlFindGroup, [result[0].user], (err, resultGroup) => {
          if (err) { 
            res.status(500).json({ error: "Erro ao buscar ideias!" });
          } else {
            const sqlSelect =
              "SELECT ideiaId, campaign, title, status, description, benefits, whereToDo, department.name, performer_id, investment, attachments FROM ideias join department on department.departmentId = ideias.performer_id where ideias.group_id = ?;";

            db.query(sqlSelect, [resultGroup[0].groupId], (err, result) => {
              if (err) {
                res.status(500).json({ error: "Erro ao buscar ideias" });
              } else {
                res.json(result);
              }
            });
          }
        });
      } else if (result[0].type == "GESTOR") {
        const sqlFindGroup = `
          SELECT groupSol.groupId 
          from users 
          join employee on employee.employeeId = users.bond 
          join department on department.manager_id = employee.employeeid 
          join groupSol on groupSol.departmentId = department.departmentId 
          where users.user = ? and users.type = 'GESTOR';`;

        db.query(sqlFindGroup, [result[0].user], (err, resultGroup) => {
          if (err) {
            res.status(500).json({ error: "Erro ao buscar ideias!" });
          } else {
            const groupIds = [];
            for (let i = 0; i < resultGroup.length; i++) {
              groupIds.push(resultGroup[i].groupId);
            }

            const placeholders = groupIds.map(() => "?").join(",");

            const sqlSelect = `
              SELECT ideiaId, campaign, title, status, description, benefits, whereToDo, department.name, investment, attachments
              FROM ideias
              JOIN department ON department.departmentId = ideias.performer_id
              WHERE ideias.group_id IN (${placeholders});
            `;

            db.query(sqlSelect, groupIds, (err, result) => {
              if (err) {
                res.status(500).json({ error: "Erro ao buscar ideias" });
              } else {
                res.json(result);
              }
            });
          }
        });
      } else {
        //admin
        const sqlSelect =
          "SELECT ideiaId, campaign, title, status, description, benefits, whereToDo, department.name, investment, attachments FROM ideias join department on department.departmentId = ideias.performer_id;";

        db.query(sqlSelect, (err, result) => {
          if (err) {
            res.status(500).json({ error: "Erro ao buscar ideias" });
          } else {
            res.json(result);
          }
        });
      }
    }
  });
});

// router.get("/ideia", (req, res) => {
//   const ideiaID = req.params.ideia;

//   /*add recuperação do grupo logado do local storage */
//   const sqlSelect =
//     "SELECT * FROM ideias join department on department.departmentId = ideias.performer_id where ideiaID = ?;";

//   db.query(sqlSelect, ideia, (err, result) => {
//     if (err) {
//       res.status(500).json({ error: "Erro ao buscar ideias" });
//     } else {
//       res.json(result);
//     }
//   });
// });

router.delete("/:ideiaId", (req, res) => {
  const ideiaID = req.params.ideiaId;

  const sqlDelete = "DELETE FROM ideias WHERE ideiaId = ?";

  db.query(sqlDelete, ideiaID, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Erro interno do servidor");
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
