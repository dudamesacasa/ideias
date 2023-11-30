// src/components/FrequenciaControl.js
import React, { useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { getGroupMembersFrequency, insertFrequency } from "../../services/api";
import CustomHeader from "../header/Header";

const FrequenciaControl = () => {
  const [employees, setEmployees] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    (async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await getGroupMembersFrequency(user);

      setEmployees(response.data);
    })();
  }, []);

  const handleCheckboxChange = (employeeId) => {
    const updatedAttendanceData = [...attendanceData];
    const existingIndex = updatedAttendanceData.findIndex((data) => data.employeeId === employeeId);

    if (existingIndex !== -1) {
      updatedAttendanceData[existingIndex].attendance = !updatedAttendanceData[existingIndex].attendance;
    } else {
      updatedAttendanceData.push({ employeeId, attendance: true });
    }

    setAttendanceData(updatedAttendanceData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAttendanceData = employees.map((employee) => ({
      employeeId: employee.memberid,
      attendance: false,
    }));

    attendanceData.forEach((data) => {
      const index = updatedAttendanceData.findIndex((item) => item.employeeId === data.employeeId);
      if (index !== -1) {
        updatedAttendanceData[index].attendance = data.attendance;
      }
    });

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await insertFrequency(meetingDate, updatedAttendanceData, user);
      if (response.status === 200) {
        alert("Frequência inserida!");

        setAttendanceData([]);
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
          <h1>Inserir Frequência</h1>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMeetingDate" className="p-2">
            <Form.Label>Data da Reunião</Form.Label>
            <Form.Control type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} required />
          </Form.Group>
          <Table striped bordered hover className="text-center p-4">
            <thead>
              <tr>
                <th>Membro</th>
                <th>Presença</th>
              </tr>
            </thead>
            <tbody>
              {employees &&
                employees.map((employee) => (
                  <tr key={employee.memberid}>
                    <td>{employee.name}</td>
                    <td>{employee.memberid}</td>
                    <td>
                      <Form.Check
                        type="checkbox"
                        id={`employee-${employee.memberid}`}
                        onChange={() => handleCheckboxChange(employee.memberid)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FrequenciaControl;
