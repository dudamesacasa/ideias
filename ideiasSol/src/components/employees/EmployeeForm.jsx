import React, { useState, useEffect } from "react";
import { getDepartments } from "../../services/api";
import { getGroups } from "../../services/api";
import { insertEmployee } from "../../services/api";

const EmployeeForm = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    document: "",
    departmentId: "",
    groupId: "",
    active: true,
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    (async () => {
      const response = await getDepartments();
      setDepartmentList(response.data);
      // console.log(response.data);
      setLoading(false);
    })();

    (async () => {
      const response = await getGroups();
      setGroupList(response.data);
      // console.log(response.data);
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await insertEmployee(formData);
      console.log("formData");
      console.log(formData);
      if (response.status === 200) {
        alert("Funcionário inserido com sucesso!");
        console.log("response");
        console.log(response);

        setFormData({
          name: "",
          document: "",
          departmentId: "",
          groupId: "",
          active: true,
          type: "",
        });
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao inserir funcionário!");
    }
  };

  //   if (loading) {
  //     return <div>Loading...</div>
  //   }

  return (
    <div className="container mt-5">
      <h2>Cadastro de Funcionários</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="departmentId">Departamento:</label>
          <select
            name="departmentId"
            id="departmentId"
            className="form-control"
            value={formData.departmentId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um departamento</option>
            {departmentList.map((department) => (
              <option key={department.departmentId} value={department.departmentId}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="groupId">Grupo:</label>
          {/* <input
            type="text"
            name="groupId"
            id="groupId"
            className="form-control"
            value={formData.groupId}
            onChange={handleChange}
            required
          /> */}
          <select
            name="groupId"
            id="groupId"
            className="form-control"
            value={formData.groupId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um grupo</option>
            {groupList.map((group) => (
              <option key={group.groupId} value={group.groupId}>
                {group.name}
              </option>
            ))}
          </select>
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

export default EmployeeForm;
