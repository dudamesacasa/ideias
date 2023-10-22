import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getDepartments,
  updateDepartment,
  deleteDepartment,
  getEmployee
} from "../../services/api";

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [editedDepartment, setEditedDepartment] = useState({
    departmentId: null,
    name: "",
    manager_id: null,
    executioner: 0,
    active: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDepartments();
        if (response.status === 200) {
          setDepartments(response.data);
        } else {
          console.error("Erro ao buscar departamentos");
        }
      } catch (error) {
        console.error("Erro ao buscar departamentos", error);
      }
    };

    fetchData();

    (async () => {
      const response = await getEmployee();
      setEmployeeList(response.data);
    })();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getDepartments();
      if (response.status === 200) {
        setDepartments(response.data);
      } else {
        console.error("Erro ao buscar departamentos");
      }
    } catch (error) {
      console.error("Erro ao buscar departamentos", error);
    }
  };

  const handleEdit = (departmentId) => {
    setEditingDepartmentId(departmentId);

    const departmentToEdit = departments.find(
      (department) => department.departmentId === departmentId
    );

    if (departmentToEdit) {
      setEditedDepartment({
        departmentId: departmentToEdit.departmentId,
        name: departmentToEdit.name,
        manager_id: departmentToEdit.manager_id,
        executioner: departmentToEdit.executioner,
        active: departmentToEdit.active
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateDepartment(editingDepartmentId, editedDepartment);

      if (response.status === 200) {
        setEditingDepartmentId(null);
        fetchData();
      } else {
        console.error("Erro ao editar departamento");
      }
    } catch (error) {
      console.error("Erro ao editar departamento", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingDepartmentId(null);
  };

  const handleDelete = async (departmentId) => {
    console.log("handleDelete");
    try {
      const response = await deleteDepartment(departmentId);

      if (response.status === 200) {
        alert("Departamento excluído com sucesso!");
        fetchData();
      } else {
        console.error("Erro ao excluir departamento");
      }
    } catch (error) {
      console.error("Erro ao excluir departamento", error);
      alert("Erro ao excluir departamento", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Lista de Departamentos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Gerente</th>
            <th>Executor</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.departmentId}>
              <td>{department.departmentId}</td>
              <td>
                {editingDepartmentId === department.departmentId ? (
                  <input
                    type="text"
                    value={editedDepartment.name}
                    onChange={(e) => setEditedDepartment({ ...editedDepartment, name: e.target.value })}
                    className="form-control"
                  />
                ) : (
                  department.name
                )}
              </td>
              <td>
                {editingDepartmentId === department.departmentId ? (
                  <select
                    onChange={(e) => setEditedDepartment({ ...editedDepartment, manager_id: e.target.value })}
                    name="manager_id"
                    id="manager_id"
                    value={editedDepartment.manager_id}
                    className="form-control"
                  >
                    <option value="">Selecione um gestor</option>
                    {employeeList.map((employee) => (
                      <option key={employee.employeeId} value={employee.employeeId}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  department.employeeName
                )}
              </td>
              <td>
                {editingDepartmentId === department.departmentId ? (
                  <input
                    type="text"
                    value={editedDepartment.executioner}
                    onChange={(e) => setEditedDepartment({ ...editedDepartment, executioner: e.target.value })}
                    className="form-control"
                  />
                ) : (
                  department.executioner
                )}
              </td>
              <td>{department.active ? "Ativo" : "Inativo"}</td>
              <td>
                {editingDepartmentId === department.departmentId ? (
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
                    <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(department.departmentId)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(department.departmentId)}>
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

export default DepartmentsList;
