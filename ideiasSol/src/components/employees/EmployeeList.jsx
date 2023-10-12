import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getEmployee, updateEmployee, deleteEmployee } from "../../services/api";
import { getDepartments } from "../../services/api";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    name: "",
    document: "",
    departmentId: "",
    groupId: "",
    active: true,
    type: "",
  });
  const [departmentList, setDepartmentList] = useState([]);

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
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await getDepartments();
      setDepartmentList(response.data);
    };

    fetchDepartments();
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
        document: employeeToEdit.document,
        departmentId: employeeToEdit.departmentId,
        groupId: employeeToEdit.groupId,
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
      }
    } catch (error) {
      console.error("Erro ao editar funcionário", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingEmployeeId(null);
  };

  const handleDelete = async (employeeId) => {
    console.log("handleDelete");
    try {
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

  return (
    <div className="container mt-4">
      <h1>Lista de Funcionários</h1>
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
            <th>Ações</th>
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
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {editingEmployeeId === employee.employeeId ? (
                  <input
                    type="text"
                    value={editedEmployee.document}
                    onChange={(e) => setEditedEmployee({ ...editedEmployee, document: e.target.value })}
                  />
                ) : (
                  employee.document
                )}
              </td>
              <td>
                {editingEmployeeId === employee.employeeId ? (
                  <input
                    type="text"
                    value={editedEmployee.departmentId}
                    onChange={(e) => setEditedEmployee({ ...editedEmployee, departmentId: e.target.value })}
                  />
                ) : (
                  employee.departmentId
                )}
              </td>
              <td>
                {editingEmployeeId === employee.employeeId ? (
                  <input
                    type="text"
                    value={editedEmployee.groupId}
                    onChange={(e) => setEditedEmployee({ ...editedEmployee, groupId: e.target.value })}
                  />
                ) : (
                  employee.groupId
                )}
              </td>
              <td>{employee.active ? "Ativo" : "Inativo"}</td>
              <td>
                {editingEmployeeId === employee.employeeId ? (
                  <input
                    type="text"
                    value={editedEmployee.type}
                    onChange={(e) => setEditedEmployee({ ...editedEmployee, type: e.target.value })}
                  />
                ) : (
                  employee.type
                )}
              </td>
              <td>
                {editingEmployeeId === employee.employeeId ? (
                  <div>
                    <button className="btn btn-success btn-sm mr-2" onClick={handleSave}>
                      Salvar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={handleCancelEdit}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div>
                    <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(employee.employeeId)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee.employeeId)}>
                      Excluir
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
