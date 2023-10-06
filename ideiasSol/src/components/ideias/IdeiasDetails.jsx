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
        console.log(response.data);
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


//   return (
//     <div>
//       <h2>Detalhes da Ideia</h2>
//       <div>
//         <strong>Título:</strong> {ideia.title}
//       </div>
//       <div>
//         <strong>Status:</strong> {ideia.status}
//       </div>
//       <div>
//         <strong>Descrição:</strong> {ideia.description}
//       </div>
//       <div>
//         <strong>Benefícios:</strong> {ideia.benefits}
//       </div>
//       <div>
//         <strong>Onde Fazer:</strong> {ideia.whereToDo}
//       </div>
//       <div>
//         <strong>Investimento:</strong> {ideia.investment}
//       </div>
//       <div>
//         <strong>Problema:</strong> {ideia.problem}
//       </div>
//       <div>
//         <strong>Como Era Antes:</strong> {ideia.howWas}
//       </div>
//       <div>
//         <strong>Cálculo Antes:</strong> {ideia.calculationBefore}
//       </div>
//       <div>
//         <strong>Sugestão:</strong> {ideia.suggestion}
//       </div>
//       <div>
//         <strong>Como Ficou Depois:</strong> {ideia.howWasAfter}
//       </div>
//       <div>
//         <strong>Cálculo Depois:</strong> {ideia.calculationAfter}
//       </div>
//       <div>
//         <strong>Ganhos:</strong> {ideia.gains}
//       </div>
//       <div>
//         <strong>Possui Ganhos Ambientais:</strong> {ideia.hasEnvironmentalGains ? "Sim" : "Não"}
//       </div>
//       {ideia.hasEnvironmentalGains && (
//         <div>
//           <strong>Ganhos Ambientais:</strong> {ideia.environmentalGains}
//         </div>
//       )}
//       <div>
//         <strong>Possui Ganhos de Segurança:</strong> {ideia.hasSecurityGains ? "Sim" : "Não"}
//       </div>
//       {ideia.hasSecurityGains && (
//         <div>
//           <strong>Ganhos de Segurança:</strong> {ideia.securityGains}
//         </div>
//       )}
//       <div>
//         <strong>Envolvimento do Grupo:</strong> {ideia.groupInvolvement}
//       </div>
//       <div>
//         <strong>Glossário:</strong> {ideia.glossary}
//       </div>
//       <button className="btn btn-warning">Editar</button>
//       <button className="btn btn-danger">Excluir</button>
//     </div>
//   );
// };

// export default IdeiaDetail;
