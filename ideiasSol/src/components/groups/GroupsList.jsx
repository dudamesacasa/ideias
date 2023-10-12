import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGroups, updateGroup, deleteGroup } from "../../services/api"; // Importe as funções apropriadas para grupos

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editedGroup, setEditedGroup] = useState({
    name: "",
    departmentId: "",
    email: "",
    avatar: null,
    active: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGroups();
        if (response.status === 200) {
          setGroups(response.data);
        } else {
          console.error("Erro ao buscar grupos");
        }
      } catch (error) {
        console.error("Erro ao buscar grupos", error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getGroups();
      if (response.status === 200) {
        setGroups(response.data);
      } else {
        console.error("Erro ao buscar grupos");
      }
    } catch (error) {
      console.error("Erro ao buscar grupos", error);
    }
  };

  const handleEdit = (groupId) => {
    setEditingGroupId(groupId);

    const groupToEdit = groups.find((group) => group.groupId === groupId);

    if (groupToEdit) {
      setEditedGroup({
        name: groupToEdit.name,
        departmentId: groupToEdit.departmentId,
        email: groupToEdit.email,
        avatar: groupToEdit.avatar,
        active: groupToEdit.active,
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateGroup(editingGroupId, { 
        editedGroup 
    });

      if (response.status === 200) {
        setEditingGroupId(null);
        fetchData();
      } 
      else {
        console.error("Erro ao editar grupo");
      }
    } catch (error) {
      console.error("Erro ao editar grupo", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingGroupId(null);
  };

  const handleDelete = async (groupId) => {
    console.log("handleDelete");
    try {
      const response = await deleteGroup(groupId);

      if (response.status === 200) {
        alert("Grupo excluído com sucesso!");
        fetchData();
      } else {
        console.error("Erro ao excluir grupo");
      }
    } catch (error) {
      console.error("Erro ao excluir grupo", error);
      alert("Erro ao excluir grupo", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Lista de Grupos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Departamento</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.groupId}>
              <td>{group.groupId}</td>
              <td>
                {editingGroupId === group.groupId ? (
                  <input
                    type="text"
                    value={editedGroup.name}
                    onChange={(e) => setEditedGroup({ ...editedGroup, name: e.target.value })}
                  />
                ) : (
                  group.name
                )}
              </td>
              <td>
                {editingGroupId === group.groupId ? (
                  <input
                    type="text"
                    value={editedGroup.departmentId}
                    onChange={(e) => setEditedGroup({ ...editedGroup, departmentId: e.target.value })}
                  />
                ) : (
                  group.departmentId
                )}
              </td>
              <td>
                {editingGroupId === group.groupId ? (
                  <input
                    type="text"
                    value={editedGroup.email}
                    onChange={(e) => setEditedGroup({ ...editedGroup, email: e.target.value })}
                  />
                ) : (
                  group.email
                )}
              </td>
              <td>{/* Aqui você pode exibir o avatar, se aplicável */}</td>
              <td>{group.active ? "Ativo" : "Inativo"}</td>
              <td>
                {editingGroupId === group.groupId ? (
                  <div>
                    <button className="btn btn-success btn-sm mr-2" onClick={handleSave}>
                      Salvar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={handleCancelEdit}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div>
                    <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(group.groupId)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(group.groupId)}>
                      Excluir
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupsList;
