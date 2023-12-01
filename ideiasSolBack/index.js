const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "aioejfnchaueiw36afvev38e7v8ev7ger8g";

const departmentsRouter = require("./departments.js"); 
const ideiasRouter = require("./ideias.js");
const employeeRouter = require("./employees.js")
const groupsRouter = require("./groups.js"); 
const usersRouter = require("./users.js");
const rankingRouter = require("./ranking.js")
const userLoginRouter = require("./userLogin.js")
const employeeGroupRouter = require("./employeeGroups.js");
const groupMemberRouter = require("./groupMembers.js");
const frequencyRouter = require("./frequency.js");
const groupMembersFrequencyRouter = require("./groupMembersFrequency.js");


const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ideiassol2",
}); 

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {  
  const username = req.body.username;
  const password = req.body.password;

  const sqlSelect =
    "SELECT users.user, users.type FROM users WHERE users.user = ? and users.password = ?;";

  db.query(sqlSelect, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Usuário ou senha inválidos" });
    } else {      
      if (result.length === 0) {
        res.status(401).json({ error: "Usuário ou senha inválidos" });
      } else {

        const type = result[0].type;

        const accessToken = jwt.sign(
          { username: username, role: type },

          accessTokenSecret,
          { expiresIn: "2h" }
        );
        res.json({
          accessToken,
          username,
          type
        });
      }
    }
  });
});

// middlewares

app.use("/getDepartments", departmentsRouter);
app.use("/insertDepartment", departmentsRouter);
app.use("/deleteDepartment", departmentsRouter);
app.use("/updateDepartment", departmentsRouter);

app.use("/getGroups", groupsRouter);
app.use("/insertGroup", groupsRouter);
app.use("/deleteGroup", groupsRouter);
app.use("/updateGroup", groupsRouter);

app.use("/insertIdeia", ideiasRouter); 
app.use("/getIdeias", ideiasRouter);
app.use("/deleteIdeia", ideiasRouter);
app.use("/updateIdeia", ideiasRouter);

app.use("/insertEmployee", employeeRouter);
app.use("/getEmployee", employeeRouter);
app.use("/deleteEmployee", employeeRouter);
app.use("/updateEmployee", employeeRouter);

app.use("/insertUser", usersRouter);
app.use("/getUsers", usersRouter);
app.use("/deleteUser", usersRouter);
app.use("/updateUser", usersRouter);

app.use("/getIdeiasRanking", rankingRouter);

app.use("/getUserLogin", userLoginRouter);

app.use("/getEmployeesGroup", employeeGroupRouter);

app.use("/getGroupMembers", groupMemberRouter);
app.use("/deleteGroupMembers", groupMemberRouter);

app.use("/getGroupMembersFrequency", groupMembersFrequencyRouter);
app.use("/insertFrequency", frequencyRouter);
app.use("/getFrequency", frequencyRouter);

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar ao banco de dados");
    console.log(err);
    return; 
  }
  console.log("Conexão estabelecida");
});

app.listen(4000, () => {
  console.log("Serviço iniciado na porta 4000");
});
