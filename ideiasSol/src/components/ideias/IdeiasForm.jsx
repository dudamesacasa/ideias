import React, { useState, useEffect } from "react";
import { getDepartments } from "../../services/api";
import { insertIdeia } from "../../services/api";
import Select from "react-select";

const IdeiaForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    benefits: "",
    whereToDo: "",
    performer_id: "",
    investment: "",
  });
  const [departmentList, setDepartmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPerformer, setSelectedPerformer] = useState(null);

  // const handleChange = (e) => {
  //   const { name, value, type, checked, files } = e.target;

  //   if (type === "file") {
  //     setFormData({ ...formData, [name]: files[0] });
  //   } else if (type === "checkbox") {
  //     setFormData({ ...formData, [name]: checked });
  //   } else {
  //     setFormData({ ...formData, [name]: value });
  //   }
  // };

  const handleChange = (e) => {
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleInsertIdeia = async () => {
    try {
      const response = await insertIdeia(formData);
      if (response.status === 200) {
        alert("Ideia inserida com sucesso!");

        setFormData({
          title: "",
          description: "",
          benefits: "",
          whereToDo: "",
          performer_id: "",
          investment: "",
        });
        setSelectedPerformer(null);
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao inserir ideia!");
    }
  };

  const options = departmentList.map((department) => ({
    value: department.departmentId,
    label: department.name,
  }));

  return (
    <div>
      <h2>Adicionar Ideia</h2>
      <form onSubmit={handleInsertIdeia}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="campaign">Campanha:</label>
          <select name="campaign" id="campaign" value="Melhoria simples" disabled className="form-control">
            <option value="Melhoria simples">Melhoria simples</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">
            DESCRIÇÃO DA SUGESTÃO (Qual é a sua ideia? O que precisa ser feito para realizá-la? Que problema ou
            oportunidade existe atualmente que ela pode resolver?)
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="benefits">
            BENEFÍCIOS/GANHOS PREVISTOS (Listar todos os ganhos que a ideia poderá ter após sua implantação.)
          </label>
          <textarea
            name="benefits"
            id="benefits"
            value={formData.benefits}
            onChange={handleChange}
            className="form-control"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label htmlFor="whereToDo">Onde Fazer</label>
          <textarea
            type="text"
            name="whereToDo"
            id="whereToDo"
            value={formData.whereToDo}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="performer_id">Quem vai fazer</label>
          <Select
            name="performer_id"
            id="performer_id"
            value={selectedPerformer}
            onChange={(selectedOption) => {
              setSelectedPerformer(selectedOption);
              setFormData({ ...formData, performer_id: selectedOption.value });
            }}
            options={options}
            isSearchable
          />
        </div>
        <div className="form-group">
          <label htmlFor="investment">Investimentos para a execução</label>
          <textarea
            type="text"
            name="investment"
            id="investment"
            value={formData.investment}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="attachments">Anexos:</label>
          <input
            type="file"
            name="attachments"
            id="attachments"
            onChange={handleChange}
            className="form-control-file"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar Ideia
        </button>
      </form>
    </div>
  );
};

export default IdeiaForm;
