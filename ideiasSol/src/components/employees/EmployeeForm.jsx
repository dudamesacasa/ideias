import React, { useState, useEffect, useContext } from "react";
import { getDepartments, getGroups, insertEmployee } from "../../services/api";
import Select from "react-select";
import CustomHeader from "../header/Header";

const EmployeeForm = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    document: "",
    departmentId: "",
    groupId: "",
    active: true,
    type: "",
  });

  
  useEffect(() => {
    (async () => {
      const response = await getDepartments();
      setDepartmentList(response.data);
      setLoading(false);
    })();
    
    (async () => {
      const response = await getGroups();
      setGroupList(response.data);
      setLoading(false);
    })();
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevFormData) => {
      if (name === "type") {
        return { ...prevFormData, type: value };
      } else if (type === "checkbox") {
        return { ...prevFormData, [name]: checked ? 1 : 0 };
      } else {
        return { ...prevFormData, [name]: value };
      }
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await insertEmployee(formData);
      if (response.status === 200) {
        alert("Funcionário inserido com sucesso!");

        setFormData({
          name: "",
          document: "",
          departmentId: "",
          groupId: "",
          active: true,
          type: "",
        });

        setSelectedDepartment(null);
        setSelectedGroup(null);
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const optionsDepartments = departmentList.map((department) => ({
    value: department.departmentId,
    label: department.name,
  }));

  const optionsGroups = groupList.map((group) => ({
    value: group.groupId,
    label: group.name,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CustomHeader></CustomHeader>
      <div className="container mt-4">
        <h2 className="text-center">Cadastro de Funcionários</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group p-2">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group p-2">
            <label htmlFor="document">Documento:</label>
            <input
              type="text"
              name="document"
              id="document"
              className="form-control"
              value={formData.document}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group p-2">
            <label htmlFor="departmentId">Departamento:</label>
            <Select
              name="departmentId"
              id="departmentId"
              value={selectedDepartment}
              onChange={(selectedOption) => {
                setSelectedDepartment(selectedOption);
                setFormData({ ...formData, departmentId: selectedOption.value });
              }}
              options={optionsDepartments}
              isSearchable
              required
            />
          </div>
          <div className="form-group p-2">
            <label htmlFor="groupId">Grupo:</label>
            <Select
              name="groupId"
              id="groupId"
              value={selectedGroup}
              onChange={(selectedOption) => {
                setSelectedGroup(selectedOption);
                setFormData({ ...formData, groupId: selectedOption.value });
              }}
              options={optionsGroups}
              isSearchable
              required
            />
          </div>
          <div className="form-group p-2">
            <label htmlFor="type">Tipo:</label>
            <select
              name="type"
              id="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o Tipo</option>
              <option value="GESTOR">GESTOR</option>
              <option value="COLABORADOR">COLABORADOR</option>
            </select>
          </div>
          <div className="form-group p-2">
            <label className="form-check-label" htmlFor="active">
              Ativo:
            </label>
            <input
              type="checkbox"
              name="active"
              id="active"
              className="form-check-input"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
