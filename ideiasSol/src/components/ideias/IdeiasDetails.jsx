import React, { useEffect, useState } from "react";
import { getIdeiasDetails } from "../../services/api";


const IdeiaDetail = ({ ideia }) => {

  const [ideiasList, setIdeiasList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getIdeiasDetails(ideia);
        setIdeiasList(response.data);
        // setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar ideia", error);
        // setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Lista de Ideias</h1>
      <div className="row">
        {ideiasList.map((ideia) => (
          <div className="col-md-6" key={ideia.ideiaId}>
            <div className="card mb-4">
              <div className="card-body">
                {/* <h2 className="card-title">{ideia.title}</h2> */}
                <p className="card-text">
                  <strong>ID:</strong> {ideia.ideiaId}
                  <br />
                  
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

export default IdeiaDetail;
