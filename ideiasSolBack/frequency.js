const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ideiassol",
});

router.post("/", async (req, res) => {
  const attendanceData = req.body.attendanceData;
  const meetingDate = req.body.meetingDate;
  const user = req.body.user;

  const sqlFindUser = `SELECT active, type, bond, user 
  from users where users.user = ?;`;

  try {
    const [result] = await new Promise((resolve, reject) => {
      db.query(sqlFindUser, [user], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const sqlFindGroup =
      "SELECT groupSol.groupId from users left join groupSOL on groupSol.groupId = users.bond where users.user = ? and (users.type = 'GRUPO' || users.type = 'LÍDER' || users.type = 'RELATOR');";

    const [resultGroup] = await new Promise((resolve, reject) => {
      db.query(sqlFindGroup, [result.user], (err, resultGroup) => {
        if (err) {
          reject(err);
        } else {
          resolve(resultGroup);
        }
      });
    });

    const groupId = resultGroup.groupId;

    const sqlInsertFrequency = `INSERT INTO employeeFrequency (meetingDate, employeeId, attendance, groupId) VALUES (?, ?, ?, ?);`;

    for (let i = 0; i < attendanceData.length; i++) {
      const currentAttendance = attendanceData[i];

      try {
        await new Promise((resolve, reject) => {
          db.query(sqlInsertFrequency, [meetingDate, currentAttendance.employeeId, currentAttendance.attendance, groupId], (err, results) => {
            if (err) {
              console.error("Erro ao inserir frequência!", err);
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      } catch (error) {
        return res.status(500).json({ error: "Erro: não foi possível inserir frequência!" });
      }
    }

    res.status(200).json({ message: "Frequência inserida com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar membros do grupo!" });
  }
});


router.get("/", (req, res) => {
  const meetingDate = req.query.meetingDate;
  const user = req.query.user;

  console.log('meetingDate')
  console.log(meetingDate)

  const sqlFindUser = `SELECT active, type, bond, user 
  from users where users.user = ?;`; 

  db.query(sqlFindUser, [user], (err, result) => {
    const sqlFindGroup =
      "SELECT groupSol.groupId from users left join groupSOL on groupSol.groupId = users.bond where users.user = ? and (users.type = 'GRUPO' || users.type = 'LÍDER' || users.type = 'RELATOR');";

    db.query(sqlFindGroup, [result[0].user], (err, resultGroup) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao buscar membros do grupo!" });
      } 
 
      const groupId = resultGroup[0].groupId;

      const sqlSelect = `SELECT employeeFrequency.employeeId, employee.name, DATE_FORMAT(meetingDate, '%d/%m/%Y') as meetingDate, attendance
      FROM employeeFrequency 
      JOIN employee ON employee.employeeId = employeeFrequency.employeeId 
      WHERE employeeFrequency.groupId = ? and employeeFrequency.meetingDate = ?
      ORDER BY meetingDate, employee.name;`;

      db.query(sqlSelect, [groupId, meetingDate], (err, result) => {
        if (err) {
          console.error("Erro ao buscar membros!", err); 
          res.status(500).json({ error: "Erro interno do servidor" });
          return;
        }
        res.status(200).json(result);
        console.log('Result')
        console.log(result)
      });
    });
  });
});

module.exports = router;
