import React, { useState, useEffect } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDepartment = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

        setSelectedDepartment(null);
        setSelectedGroup(null);
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao inserir funcionário!");
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

  //   if (loading) {
  //     return <div>Loading...</div>
  //   }

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
            />
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
            />
          </div>
          <div className="form-group p-2">
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
    </div>
  );
};

export default EmployeeForm;
