import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getIdeias } from "../../services/api";
import { deleteIdeia } from "../../services/api";
import { updateIdeia } from "../../services/api";
import { getDepartments } from "../../services/api";

import "bootstrap/dist/css/bootstrap.min.css";
import IdeiaDetail from "./IdeiasDetails";

const IdeiasList = () => {
  const [ideiasList, setIdeiasList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingIdeiaId, setEditingIdeiaId] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [editedData, setEditedData] = useState({
    campaign: "",
    status: "",
    description: "",
    benefits: "",
    whereToDo: "",
    performer_id: "",
    investment: "",
    attachments: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await getIdeias();
        setIdeiasList(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar ideias:", error);
        setLoading(false);
      }
    })();

    (async () => {
      const response = await getDepartments();
      setDepartmentList(response.data);
      // console.log(response.data);
      setLoading(false);
    })();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getIdeias();
      if (response.status === 200) {
        setIdeiasList(response.data);
      } else {
        console.error("Erro ao buscar ideias");
      }
    } catch (error) {
      console.error("Erro ao buscar ideias", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setEditedData({ ...editedData, [name]: value });

    // console.log("editedData.performer_id");
    // console.log(editedData.performer_id);
  };

  const handleDelete = async (ideiaId) => {
    try {
      const response = await deleteIdeia(ideiaId);
      if (response.status === 200) {
        setIdeiasList(ideiasList.filter((val) => val.ideiaId !== ideiaId));
        fetchData();
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao deletar ideia!");
      alert('Erro ao deletar ideia!')
    }
  };

  const handleEdit = (ideiaId) => {
    setEditingIdeiaId(ideiaId);

    const ideiaToEdit = ideiasList.find((ideia) => ideia.ideiaId === ideiaId);

    if (ideiaToEdit) {
      setEditedData({
        campaign: ideiaToEdit.campaign,
        status: ideiaToEdit.status,
        description: ideiaToEdit.description,
        benefits: ideiaToEdit.benefits,
        whereToDo: ideiaToEdit.whereToDo,
        performer_id: ideiaToEdit.performer_id,
        investment: ideiaToEdit.investment,
        attachments: ideiaToEdit.attachments,
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateIdeia(editingIdeiaId, {
        editedData,
      });

      console.log("editedData");
      console.log(editedData);

      if (response.status === 200) {
        setEditingIdeiaId(null);
        fetchData();
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao alterar ideia!");
    }
  };

  const handleCancelEdit = () => {
    setEditingIdeiaId(null);
    setIsEditing(false);
  };

  const handleDetails = (ideiaId) => {
    return <Link to={`IdeiaDetail/${ideiaId}`} />;
  };

  return (
    <div className="container">
      <h1 className="my-4">Lista de Ideias</h1>
      <div className="row">
        {ideiasList.map((ideia) => (
          <div className="col-md-6" key={ideia.ideiaId}>
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">{ideia.title}</h2>
                <p className="card-text">
                  <strong>ID:</strong> {ideia.ideiaId}
                  <br />
                  {editingIdeiaId === ideia.ideiaId ? (
                    <>
                      <label htmlFor="editedCampaign">Campanha:</label>
                      <input
                        type="text"
                        id="editedCampaign"
                        value={editedData.campaign}
                        onChange={(e) => setEditedData({ ...editedData, campaign: e.target.value })}
                        className="form-control"
                      />
                      <br />
                      <label htmlFor="editedDescription">Descrição:</label>
                      <textarea
                        id="editedDescription"
                        value={editedData.description}
                        onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                        className="form-control"
                      />
                      <br />
                      <label htmlFor="editedBenefits">Benefícios:</label>
                      <textarea
                        id="editedBenefits"
                        value={editedData.benefits}
                        onChange={(e) => setEditedData({ ...editedData, benefits: e.target.value })}
                        className="form-control"
                      />
                      <br />
                      <label htmlFor="editedWhereToDo">Onde Fazer:</label>
                      <textarea
                        id="editedWhereToDo"
                        value={editedData.whereToDo}
                        onChange={(e) => setEditedData({ ...editedData, whereToDo: e.target.value })}
                        className="form-control"
                      />
                      <br />
                      <label htmlFor="editedPerformer_id">Quem vai fazer</label>
                      <select
                        onChange={handleChange}
                        name="performer_id"
                        id="editedPerformer_id"
                        value={editedData.performer_id}
                        className="form-control"
                      >
                        <option value="">Selecione um departamento</option>
                        {departmentList.map((department) => (
                          <option key={department.departmentId} value={editedData.performer_i}>
                            {department.name}
                          </option>
                        ))}
                      </select>
                      <br />
                      <label htmlFor="editedInvestment">Investimento:</label>
                      <textarea
                        id="editedInvestment"
                        value={editedData.investment}
                        onChange={(e) => setEditedData({ ...editedData, investment: e.target.value })}
                        className="form-control"
                      />
                      <button className="btn btn-danger" onClick={handleCancelEdit}>
                        Cancelar Edição
                      </button>
                    </>
                  ) : (
                    <>
                      <br />
                      <strong>Campanha:</strong> {ideia.campaign}
                      <br />
                      <strong>Status:</strong> {ideia.status}
                      <br />
                      <strong>Descrição:</strong> {ideia.description}
                      <br />
                      <strong>Benefícios:</strong> {ideia.benefits}
                      <br />
                      <strong>Onde fazer:</strong> {ideia.whereToDo}
                      <br />
                      <strong>Executor:</strong> {ideia.name}
                      <br />
                      <strong>Investimento:</strong> {ideia.investment}
                      <br />
                      <strong>Anexos:</strong> {ideia.attachments}
                    </>
                  )}
                </p>
                <div className="d-flex justify-content-between">
                  {editingIdeiaId === ideia.ideiaId ? (
                    <button className="btn btn-success" onClick={handleSave}>
                      Salvar
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleEdit(ideia.ideiaId)}>
                      Editar
                    </button>
                  )}

                  <button className="btn btn-danger" onClick={() => handleDelete(ideia.ideiaId)}>
                    Deletar
                  </button>
                  <button className="btn btn-info" onClick={() => handleDetails(ideia.ideiaId)}>
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeiasList;
