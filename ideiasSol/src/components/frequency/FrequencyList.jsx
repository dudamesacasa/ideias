import React, { useState, useEffect } from "react";
import { getFrequency } from "../../services/api";
import CustomHeader from "../header/Header";
import { Link } from "react-router-dom";
import { Form, Button, Table } from "react-bootstrap";

const AttendanceList = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [meetingDate, setMeetingDate] = useState("");

  const handleGetFrequency = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await getFrequency(meetingDate, user);
      if (response.status === 200) {
        setAttendanceList(response.data);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <CustomHeader />
      <div className="container mt-4">
        <div className="row text-center justify-content-end">
          <h1>Controle de Frequência</h1>
          <div className="col-auto justify-content-end">
            <Link to="/frequency" className="btn btn-primary">
              +
            </Link>
          </div>
        </div>
        <Form onSubmit={(e) => handleGetFrequency(e)}>
          <Form.Group controlId="formMeetingDate" className="p-2">
            <Form.Label>Data da Reunião</Form.Label>
            <Form.Control type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Pesquisar
          </Button>
        </Form>

        <table className="table text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Data da Reunião</th>
              <th>Frequência</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((attendance, index) => (
              <tr key={index}>
                <td>{attendance.name}</td>
                <td>{attendance.meetingDate}</td>
                <td>{attendance.attendance === 1 ? "Presente" : "Ausente"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;
