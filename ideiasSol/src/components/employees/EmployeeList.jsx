import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import CustomHeader from "../header/Header";
import { getEmployee, updateEmployee, deleteEmployee, getGroups, getDepartments } from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    name: "",
    departmentId: "",
    groupId: "",
    active: true,
    type: "",
  });
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmployee();
        if (response.status === 200) {
          setEmployees(response.data);
        } else {
          console.error("Erro ao buscar funcionários");
        }
      } catch (error) {
        console.error("Erro ao buscar funcionários", error);
      }
    };

    fetchData();

    (async () => {
      const responseDepartments = await getDepartments();
      setDepartmentList(responseDepartments.data);

      const responseGroups = await getGroups();
      setGroupsList(responseGroups.data);
    })();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getEmployee();
      if (response.status === 200) {
        setEmployees(response.data);
      } else {
        console.error("Erro ao buscar funcionários");
      }
    } catch (error) {
      console.error("Erro ao buscar funcionários", error);
    }
  };

  const handleEdit = (employeeId) => {
    setEditingEmployeeId(employeeId);

    const employeeToEdit = employees.find((employee) => employee.employeeId === employeeId);

    if (employeeToEdit) {
      setEditedEmployee({
        name: employeeToEdit.name,
        departmentId: employeeToEdit.departmentId,
        groupId: employeeToEdit.groupId,
        groupName: employeeToEdit.groupName,
        depName: employeeToEdit.depName,
        active: employeeToEdit.active,
        type: employeeToEdit.type,
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateEmployee(editingEmployeeId, editedEmployee);

      if (response.status === 200) {
        setEditingEmployeeId(null);
        fetchData();
      } else {
        console.error("Erro ao editar funcionário");
        alert(error.response.data.error);
      }
    } catch (error) {
      console.error("Erro ao editar funcionário", error);
      alert(error.response.data.error);
    }
  };

  const handleCancelEdit = () => {
    setEditingEmployeeId(null);
  };

  const handleDelete = async (employeeId) => {
    try {
      const confirmDelete = window.confirm("Tem certeza que deseja excluir este funcionário?");

      if (!confirmDelete) {
        return;
      }

      const response = await deleteEmployee(employeeId);

      if (response.status === 200) {
        alert("Funcionário excluído com sucesso!");
        fetchData();
      } else {
        console.error("Erro ao excluir funcionário");
      }
    } catch (error) {
      console.error("Erro ao excluir funcionário", error);
      alert("Erro ao excluir funcionário", error);
    }
  };

  const optionsDepartments = departmentList.map((department) => ({
    value: department.departmentId,
    label: department.name,
  }));

  const optionsGroups = groupsList.map((group) => ({
    value: group.groupId,
    label: group.name,
  }));

  return (
    <div>
      <CustomHeader />
      <div className="container mt-4">
        <div className="row text-center justify-content-end">
          <h1>Lista de Funcionários</h1>
          <div className="col-auto justify-content-end">
            <Link to="/insertEmployee" className="btn btn-primary">
              +
            </Link>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Documento</th>
              <th>Departamento</th>
              <th>Grupo</th>
              <th>Status</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td>{employee.employeeId}</td>
                <td>
                  {editingEmployeeId === employee.employeeId ? (
                    <input
                      type="text"
                      value={editedEmployee.name}
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, name: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    employee.name
                  )}
                </td>
                <td>{employee.document}</td>
                <td>
                  {editingEmployeeId === employee.employeeId ? (
                    <Select
                      name="departmentId"
                      id="departmentId"
                      value={optionsDepartments.find((option) => option.value === editedEmployee.departmentId)}
                      onChange={(selectedOption) => {
                        setSelectedDepartment(selectedOption);
                        setEditedEmployee({ ...editedEmployee, departmentId: selectedOption.value });
                      }}
                      options={optionsDepartments}
                      isSearchable
                      required
                    />
                  ) : (
                    employee.depName
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee.employeeId ? (
                    <Select
                      name="groupId"
                      id="groupId"
                      value={optionsGroups.find((option) => option.value === editedEmployee.groupId)}
                      onChange={(selectedOption) => {
                        setSelectedGroup(selectedOption);
                        setEditedEmployee({ ...editedEmployee, groupId: selectedOption.value });
                      }}
                      options={optionsGroups}
                      isSearchable
                      required
                    />
                  ) : (
                    employee.groupName
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee.employeeId ? (
                    <select
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, active: e.target.value })}
                      value={editedEmployee.active}
                      className="form-control"
                    >
                      <option value="1">Ativo</option>
                      <option value="0">Inativo</option>
                    </select>
                  ) : (
                    <td>{employee.active ? "Ativo" : "Inativo"}</td>
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee.employeeId ? (
                    <select
                      onChange={(e) => setEditedEmployee({ ...editedEmployee, type: e.target.value })}
                      value={editedEmployee.type}
                      className="form-control"
                    >
                      <option value="GESTOR">GESTOR</option>
                      <option value="COLABORADOR">COLABORADOR</option>
                    </select>
                  ) : (
                    employee.type
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee.employeeId ? (
                    <div>
                      <button className="btn btn-success btn-sm mr-2" onClick={handleSave}>
                        <FaSave />
                      </button>
                      &nbsp;
                      <button className="btn btn-danger btn-sm" onClick={handleCancelEdit}>
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(employee.employeeId)}>
                        <FaEdit />
                      </button>
                      &nbsp;
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee.employeeId)}>
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
