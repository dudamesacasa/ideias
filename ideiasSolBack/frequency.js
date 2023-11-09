const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ideiassol",
});


app.post('/insertFrequency', async (req, res) => {
    const { employeeId, meetingDate, attendance } = req.body;
  
    try {
      const query = 'INSERT INTO employeeFrequency (employeeId, meetingDate, attendance) VALUES ($1, $2, $3)';
      await pool.query(query, [employeeId, meetingDate, attendance]);
      res.status(201).json({ message: 'Presença inserida com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao inserir presença' });
    }
  });

  ideiasSolBack/ideias.js