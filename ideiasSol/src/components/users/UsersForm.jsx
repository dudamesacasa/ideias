import React, { useState } from "react";
import { insertUser } from "../../services/api"; // Importar a função para inserir usuários

const UserForm = () => {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    active: true,
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await insertUser(formData);
      if (response.status === 200) {
        alert("Usuário inserido com sucesso!");
        setFormData({
          user: "",
          password: "",
          active: true,
          type: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao inserir usuário!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro de Usuários</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user">Usuário:</label>
          <input
            type="text"
            name="user"
            id="user"
            className="form-control"
            value={formData.user}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            name="active"
            id="active"
            className="form-check-input"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="active">
            Ativo
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo:</label>
          <input
            type="text"
            name="type"
            id="type"
            className="form-control"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default UserForm;
