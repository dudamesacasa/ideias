import React, { useEffect, useState } from "react";
import axios from "axios";
import { getIdeiasRanking } from "../../services/api";

function IdeiasRanking() {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getIdeiasRanking();
        if (response.status === 200) {
            setRankingData(response.data);
        } else {
          console.error("Erro ao buscar ideias");
        }
      } catch (error) {
        console.error("Erro ao buscar ideias", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="container">
      <h1>Ranking Geral de Ideias</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Departamento</th>
            <th>Avatar</th>
            <th>Quantidade de Ideias</th>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <img src={item.avatar} alt="Avatar" width="50" height="50" />
              </td>
              <td>{item.qtd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IdeiasRanking;
