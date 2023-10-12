const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "slweiofjahidasw";

const departmentsRouter = require("./departments.js"); 
const ideiasRouter = require("./ideias.js");
const employeeRouter = require("./employees.js")
const groupsRouter = require("./groups.js"); 

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ideiassol",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middlewares
app.use("/getDepartments", departmentsRouter);

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
