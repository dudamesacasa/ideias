import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

import CustomHeader from "../header/Header";

import { getDepartments, updateDepartment, deleteDepartment, getEmployee } from "../../services/api";

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [editedDepartment, setEditedDepartment] = useState({
    departmentId: null,
    name: "",
    manager_id: null,
    executioner: 0,
    active: 0,
    nameEdited: false,
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

    const departmentToEdit = departments.find((department) => department.departmentId === departmentId);

    if (departmentToEdit) {
      setEditedDepartment({
        departmentId: departmentToEdit.departmentId,
        name: departmentToEdit.name,
        manager_id:
          departmentToEdit.manager_id !== null && departmentToEdit.manager_id !== undefined
            ? departmentToEdit.managerId
            : departmentToEdit.employeeId,
        executioner: departmentToEdit.executioner,
        active: departmentToEdit.active,
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
        console.error("Erro ao editar departamento.");
        alert(error.response.data.error);
      }
    } catch (error) {
      console.error("Erro ao editar departamento.", error);
      alert(error.response.data.error);
    }
  };

  const handleCancelEdit = () => {
    setEditingDepartmentId(null);
  };

  const handleDelete = async (departmentId) => {
    try {
      const confirmDelete = window.confirm("Tem certeza que deseja excluir este departamento?");

      if (!confirmDelete) {
        return;
      }
      const response = await deleteDepartment(departmentId);

      if (response.status === 200) {
        alert("Departamento excluído com sucesso!");
        fetchData();
      } else {
        console.error("Erro ao excluir departamento");
        alert(error.response.data.error);
      }
    } catch (error) {
      console.error("Erro ao excluir departamento", error);
      alert("Erro ao excluir departamento", error);
    }
  };

  const optionsEmployees = employeeList.map((employee) => ({
    value: employee.employeeId,
    label: employee.name,
  }));

  return (
    <div>
      <CustomHeader></CustomHeader>
      <div className="container mt-4">
        <div className="row text-center justify-content-end">
          <h1>Lista de Departamentos</h1>
          <div className="col-auto justify-content-end">
            <Link to="/insertDepartment" className="btn btn-primary">
              +
            </Link>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Gerente</th>
              <th>Executor</th>
              <th>Ativo</th>
              <th></th>
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
                      onChange={(e) =>
                        setEditedDepartment({ ...editedDepartment, name: e.target.value, nameEdited: true })
                      }
                      className="form-control"
                    />
                  ) : (
                    department.name
                  )}
                </td>
                <td>
                  {editingDepartmentId === department.departmentId ? (
                    <Select
                      name="manager_id"
                      id="manager_id"
                      value={optionsEmployees.find((option) => option.value === editedDepartment.manager_id)}
                      onChange={(selectedOption) => {
                        setSelectedEmployee(selectedOption);
                        setEditedDepartment({ ...editedDepartment, manager_id: selectedOption.value });
                      }}
                      options={optionsEmployees}
                      isSearchable
                      required
                    />
                  ) : (
                    department.employeeName
                  )}
                </td>
                <td>
                  {editingDepartmentId === department.departmentId ? (
                    <select
                      onChange={(e) => setEditedDepartment({ ...editedDepartment, executioner: e.target.value })}
                      value={editedDepartment.executioner}
                      className="form-control"
                    >
                      <option value="1">Executor</option>
                      <option value="0">Não é executor</option>
                    </select>
                  ) : (
                    <td>{department.executioner ? "Executor" : "Não é executor"}</td>
                  )}
                </td>
                <td>
                  {editingDepartmentId === department.departmentId ? (
                    <select
                      onChange={(e) => setEditedDepartment({ ...editedDepartment, active: e.target.value })}
                      value={editedDepartment.active}
                      className="form-control"
                    >
                      <option value="1">Ativo</option>
                      <option value="0">Inativo</option>
                    </select>
                  ) : (
                    <td>{department.active ? "Ativo" : "Inativo"}</td>
                  )}
                </td>

                <td>
                  {editingDepartmentId === department.departmentId ? (
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
                      <button
                        className="btn btn-primary btn-sm mr-2"
                        onClick={() => handleEdit(department.departmentId)}
                      >
                        <FaEdit />
                      </button>
                      &nbsp;
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(department.departmentId)}>
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

export default DepartmentsList;
