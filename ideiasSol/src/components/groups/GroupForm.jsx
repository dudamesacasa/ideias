import React, { useState, useEffect } from "react";
import { insertGroup, getEmployeesGroup, getDepartments } from "../../services/api";
import Select from "react-select";
import CustomHeader from "../header/Header";

const GroupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    departmentId: "",
    email: "",
    avatar: null,
    active: true,
  });
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showEmployess, setShowEmployess] = useState(false);

  useEffect(() => {
    loadAvailableEmployees();

    (async () => {
      const response = await getDepartments();
      setDepartmentList(response.data);
    })();
  }, []);

  const loadAvailableEmployees = async () => {
    try {
      const response = await getEmployeesGroup ();
      if (response.status === 200) {
        const employeesWithRoles = response.data.map((employee) => ({
          ...employee,
          isLeader: false,
          isReporter: false,
        }));
        setAvailableEmployees(employeesWithRoles);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar funcionários disponíveis!");
    }
  };

  const handleMemberSelection = (employeeId) => {
    const isSelected = selectedMembers.includes(employeeId);
    if (isSelected) {
      // Remove o funcionário da lista de membros selecionados
      setSelectedMembers(selectedMembers.filter((id) => id !== employeeId));
    } else {
      // Adiciona o funcionário à lista de membros selecionados
      setSelectedMembers([...selectedMembers, employeeId]);
    }
  };

  const handleLeaderSelection = (employeeId) => {
    const updatedEmployees = availableEmployees.map((employee) => {
      if (employee.employeeId === employeeId) {
        return {
          ...employee,
          isLeader: !employee.isLeader,
        };
      }
      return employee;
    });
    setAvailableEmployees(updatedEmployees);
  };

  const handleReporterSelection = (employeeId) => {
    const updatedEmployees = availableEmployees.map((employee) => {
      if (employee.employeeId === employeeId) {
        return {
          ...employee,
          isReporter: !employee.isReporter,
        };
      }
      return employee;
    });
    setAvailableEmployees(updatedEmployees);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleInsertGroup = async () => {
    try {
      const groupData = {
        ...formData,
        members: selectedMembers.map((employeeId) => ({
          employeeId,
          isLeader: availableEmployees.find((employee) => employee.employeeId === employeeId).isLeader,
          isReporter: availableEmployees.find((employee) => employee.employeeId === employeeId).isReporter,
        })),
      };

      const response = await insertGroup(groupData);
      if (response.status === 200) {
        alert("Grupo inserido com sucesso!");

        setFormData({
          name: "",
          departmentId: "",
          email: "",
          avatar: null,
          active: true,
        });

        setSelectedDepartment(null);
        setSelectedMembers([]);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao inserir grupo!");
    }
  };

  const options = departmentList.map((department) => ({
    value: department.departmentId,
    label: department.name,
  }));

  const toggleEmployees = () => {
    setShowEmployess(!showEmployess);
  };

  return (
    <div>
      <CustomHeader></CustomHeader>
      <div className="container mt-4">
        <h2>Adicionar Grupo</h2>
        <form onSubmit={handleInsertGroup}>
          <div className="form-group p-2">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group p-2">
            <label htmlFor="departmentId">Departamento</label>
            <Select
              name="departmentId"
              id="departmentId"
              value={selectedDepartment}
              onChange={(selectedOption) => {
                setSelectedDepartment(selectedOption);
                setFormData({ ...formData, departmentId: selectedOption.value });
              }}
              options={options}
              isSearchable
            />
          </div>
          <div className="form-group p-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group p-2">
            <label className="form-check-label" htmlFor="active">
              Ativo:
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              name="active"
              id="active"
              checked={formData.active}
              onChange={handleChange}
            />
          </div>
          <div className={`form-group p-2 ${showEmployess ? "" : "d-none"}`}>
            <div className="form-group p-2">
              <label>Participantes do Grupo:</label>
              <ul className="list-group">
                {availableEmployees.map((employee) => (
                  <li key={employee.employeeId} className="list-group-item">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={employee.employeeId}
                          checked={selectedMembers.includes(employee.employeeId)}
                          onChange={() => handleMemberSelection(employee.employeeId)}
                        />
                        {employee.name}
                      </label>
                    </div>
                    <div className="form-check form-check-inline ml-4">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={employee.isLeader}
                          onChange={() => handleLeaderSelection(employee.employeeId)}
                        />
                        Líder
                      </label>
                    </div>
                    <div className="form-check form-check-inline ml-4">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={employee.isReporter}
                          onChange={() => handleReporterSelection(employee.employeeId)}
                        />
                        Relator
                      </label>
                    </div>
                  </li>
                ))}
                {/* <div className="form-group">
                <label htmlFor="avatar">Avatar:</label>
                <input type="file" name="avatar" id="avatar" onChange={handleChange} className="form-control-file" />
              </div> */}
              </ul>
            </div>
          </div>
          <div>
            <button type="button" className="btn btn-secondary" onClick={toggleEmployees}>
              {showEmployess ? "Ocultar lista de participantes" : "Adicionar participantes"}
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Adicionar Grupo
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
