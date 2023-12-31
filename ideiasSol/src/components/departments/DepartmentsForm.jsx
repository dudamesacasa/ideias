import React, { useState, useEffect } from "react";
import { insertDepartment } from "../../services/api";
import CustomHeader from "../header/Header";
import { insertGroup, getEmployee, getDepartments } from "../../services/api";
import Select from "react-select";

const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    manager_id: 0,
    executioner: 0,
    active: 1,
  });
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getEmployee();
      setEmployeeList(response.data);
      setLoading(false);
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked ? 1 : 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleInsertDepartment = async (e) => {
    e.preventDefault();

    try {
      const response = await insertDepartment(formData);
      if (response.status === 200) {
        alert("Departamento inserido com sucesso!");

        setFormData({
          name: "",
          manager_id: 0,
          executioner: 0,
          active: 1,
        });

        setSelectedEmployee(null);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const optionsEmployee = employeeList.map((employee) => ({
    value: employee.employeeId,
    label: employee.name,
  }));

  if (loading) {
    return <div>Loading...</div>
  } 

  return (
    <div>
      <CustomHeader></CustomHeader>

      <div className="container-lg mt-5 ">
        <h2 className="text-center">Adicionar Departamento</h2>
        <form onSubmit={handleInsertDepartment}>
          <div className="form-group p-2">
            <label htmlFor="name">Nome</label>
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
            <label htmlFor="manager_id">Gestor</label>
            <Select
              name="manager_id"
              id="manager_id"
              value={selectedEmployee}
              onChange={(selectedOption) => {
                setSelectedEmployee(selectedOption);
                setFormData({ ...formData, manager_id: selectedOption.value });
              }}
              options={optionsEmployee}
              isSearchable
            />
          </div>
          <div className="form-group p-2">
            <label htmlFor="executioner">Executor&nbsp; </label>

            <input
              className="form-check-input"
              type="checkbox"
              name="executioner"
              id="executioner"
              checked={formData.executioner === 1}
              onChange={handleChange}
            />
          </div>
          <div className="form-group p-2">
            <label className="form-check-labe" htmlFor="active">
              Ativo&nbsp;
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              name="active"
              id="active"
              checked={formData.active === 1}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Adicionar Departamento
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
