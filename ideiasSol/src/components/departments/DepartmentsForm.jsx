import React, { useState } from "react";
import { insertDepartment } from "../../services/api"; 

const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    manager_id: 0, 
    executioner: 0, 
    active: 1, 
  });

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
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao inserir departamento!");
    }
  };

  return (
    <div>
      <h2>Adicionar Departamento</h2>
      <form onSubmit={handleInsertDepartment}>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="manager_id">ID do Gerente:</label>
          <input
            type="number"
            name="manager_id"
            id="manager_id"
            value={formData.manager_id}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="executioner">ID do Executor:</label>
          <input
            type="number"
            name="executioner"
            id="executioner"
            value={formData.executioner}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="active">Ativo:</label>
          <input
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
  );
};

export default DepartmentForm;
