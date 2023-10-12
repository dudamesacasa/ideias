import React, { useState } from "react";
import { insertGroup } from "../../services/api"; 

const GroupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    departmentId: "",
    email: "",
    avatar: null,
    active: true, 
  });

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
      const response = await insertGroup(formData); 
      if (response.status === 200) {
        alert("Grupo inserido com sucesso!");

        setFormData({
          name: "",
          departmentId: "",
          email: "",
          avatar: null,
          active: true,
        });
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao inserir grupo!");
    }
  };

  return (
    <div>
      <h2>Adicionar Grupo</h2>
      <form onSubmit={handleInsertGroup}>
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
          <label htmlFor="departmentId">ID do Departamento:</label>
          <input
            type="number"
            name="departmentId"
            id="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={handleChange}
            className="form-control-file"
          />
        </div>
        <div className="form-group">
          <label htmlFor="active">Ativo:</label>
          <input
            type="checkbox"
            name="active"
            id="active"
            checked={formData.active}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar Grupo
        </button>
      </form>
    </div>
  );
};

export default GroupForm;
