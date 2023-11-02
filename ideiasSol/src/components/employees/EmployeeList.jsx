import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getEmployee, updateEmployee, deleteEmployee, getGroups } from "../../services/api";
import { getDepartments } from "../../services/api";
import Select from "react-select";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
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
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [initialValue, setInitialValue] = useState("");

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
      const response = await getDepartments();
      setDepartmentList(response.data);
    })();

    (async () => {
      const response = await getGroups();
      setGroupsList(response.data);
    })();
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

  const options = departmentList.map((department) => ({
    value: department.departmentId,
    label: department.name,
  }));

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
                    className="form-control"
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
                    className="form-control"
                  />
                ) : (
                  employee.document
                )}
              </td>
              <td>
                {editingEmployeeId === employee.employeeId ? (
                  <Select
                    name="departmentId"
                    id="departmentId"
                    value={selectedDepartment}
                    defaultValue={options.find((option) => option.value === initialValue)}
                    onChange={(selectedOption) => {
                      setSelectedDepartment(selectedOption);
                      setEditedEmployee({ ...editedEmployee, departmentId: selectedOption.value });
                    }}
                    options={options}
                    isSearchable
                  />
                ) : (
                  employee.depName
                )}
              </td>
              <td>
                {editingEmployeeId === employee.employeeId ? (
                  <select
                    onChange={(e) => setEditedEmployee({ ...editedEmployee, groupId: e.target.value })}
                    name="groupId"
                    id="groupId"
                    value={editedEmployee.groupId}
                    className="form-control"
                  >
                    <option value="">Selecione um grupo</option>
                    {groupsList.map((groups) => (
                      <option key={groups.groupId} value={groups.groupId}>
                        {groups.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  employee.groupName
                )}
              </td>
              <td>{employee.active ? "Ativo" : "Inativo"}</td>
              <td>
                {editingEmployeeId === employee.employeeId ? (
                  <input
                    type="text"
                    value={editedEmployee.type}
                    onChange={(e) => setEditedEmployee({ ...editedEmployee, type: e.target.value })}
                    className="form-control"
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
