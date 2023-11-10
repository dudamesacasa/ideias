import React, { useEffect, useState } from "react";
import { getIdeiasRanking } from "../../services/api";
import CustomHeader from "../header/Header";

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
    <div>
      <CustomHeader></CustomHeader>
      <div className="container mt-4">
        <h1 className="text-center">Ranking Geral de Ideias</h1>
        <table className="table table-striped">
          <thead className="text-center">
            <tr>
              <th>Posição</th>
              <th>Departamento</th>
              <th>Avatar</th>
              <th>Quantidade de Ideias</th>
            </tr>
          </thead>
          <tbody className="text-center">
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
    </div>
  );
}

export default IdeiasRanking;
