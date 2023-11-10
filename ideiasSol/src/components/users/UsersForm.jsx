import React, { useState, useEffect } from "react";
import { insertUser, getGroups, getEmployee } from "../../services/api";
import Select from "react-select";

const UserForm = () => {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    confirmPassword: "",
    active: true,
    type: "",
    bond: null,
  });

  const [passwordError, setPasswordError] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getGroups();
      setGroupList(response.data);
      // setLoading(false);
    })();

    (async () => {
      const response = await getEmployee();
      setEmployeeList(response.data);
      // setLoading(false);
    })();

  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    
    if (name === "type" && formData.type !== value) {
      setFormData({
        user: "",
        password: "",
        confirmPassword: "",
        active: true,
        type: value,
        bond: null,
      });

      setSelectedGroup(null); 
      setSelectedEmployee(null);

    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (passwordRegex.test(password)) {
      setPasswordError("");
    } else {
      setPasswordError(
        "A senha deve ter no mínimo 8 caracteres, incluindo letras, números e caracteres especiais."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("As senhas não coincidem.");
      return;
    }

    const { confirmPassword, ...userData } = formData;

    try {
      const response = await insertUser(userData);
      if (response.status === 200) {
        alert("Usuário inserido com sucesso!");
        setFormData({
          user: "",
          password: "",
          confirmPassword: "",
          active: true,
          type: "",
          bond: null,
        });

        setSelectedGroup(null); 
        setSelectedEmployee(null);
      }
    } catch (error) {
      // console.error(error.response.data.error);
      alert( error.response.data.error);
    }
  };

  const optionsGroups = groupList.map((group) => ({
    value: group.groupId,
    label: group.name,
  }));

  const optionsEmployee = employeeList.map((employee) => ({
    value: employee.employeeId,
    label: employee.name,
  }));

  return (
    <div className="container mt-5">
      <h2>Cadastro de Usuários</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Tipo:</label>
          <select name="type" id="type" className="form-control" value={formData.type} onChange={handleChange} required>
            <option value="">Selecione o Tipo</option>
            <option value="GESTOR">GESTOR</option>
            <option value="ADMIN">ADMIN</option>
            <option value="GRUPO">GRUPO</option>
            <option value="LÍDER">LÍDER</option>
            <option value="RELATOR">RELATOR</option>
          </select>
        </div>
        {(formData.type === "GRUPO" ||
          formData.type === "LÍDER" ||
          formData.type === "RELATOR" ||
          formData.type === "GESTOR") && (
          <div className="form-group">
            <label htmlFor="group">{formData.type === "GESTOR" ? "Gestor" : "Grupo"}:</label>
            <Select
              name={formData.type === "GESTOR" ? "employeeId" : "groupId"}
              id={formData.type === "GESTOR" ? "employeeId" : "groupId"}
              value={formData.type === "GESTOR" ? selectedEmployee : selectedGroup}
              onChange={(selectedOption) => {
                if (formData.type === "GESTOR") {
                  setSelectedEmployee(selectedOption);
                } else {
                  setSelectedGroup(selectedOption);
                }
                setFormData({ ...formData, bond: selectedOption.value });
              }}
              options={formData.type === "GESTOR" ? optionsEmployee : optionsGroups}
              isSearchable
            />
          </div>
        )}

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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme a senha:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {passwordError && <p className="text-danger">{passwordError}</p>}
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
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default UserForm;
