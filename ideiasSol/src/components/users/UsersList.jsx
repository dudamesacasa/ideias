import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUsers, updateUser, deleteUser } from "../../services/api";
import CustomHeader from "../header/Header";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    user: "",
    active: true,
    type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error("Erro ao buscar usuários");
        }
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getUsers();
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error("Erro ao buscar usuários");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  const handleEdit = (userId) => {
    setEditingUserId(userId);

    const userToEdit = users.find((user) => user.userId === userId);

    if (userToEdit) {
      setEditedUser({
        user: userToEdit.user,
        active: userToEdit.active,
        type: userToEdit.type,
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateUser(editingUserId, editedUser);

      if (response.status === 200) {
        setEditingUserId(null);

        fetchData();
      } else {
        console.error("Erro ao editar usuário");
      }
    } catch (error) {
      console.error("Erro ao editar usuário", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await deleteUser(userId);

      if (response.status === 200) {
        fetchData();
      } else {
        console.error("Erro ao excluir usuário");
      }
    } catch (error) {
      console.error("Erro ao excluir usuário", error);
    }
  };

  return (
    <div>
      <CustomHeader></CustomHeader>
      <div className="container mt-4">
        <div className="row text-center justify-content-end">
          <h1>Lista de Usuários</h1>
          <div className="col-auto justify-content-end">
            <Link to="/insertUsers" className="btn btn-primary">
              +
            </Link>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuário</th>
              <th>Status</th>
              <th>Tipo</th>
              <th>Vínculo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>
                  {editingUserId === user.userId ? (
                    <input
                      type="text"
                      value={editedUser.user}
                      onChange={(e) => setEditedUser({ ...editedUser, user: e.target.value })}
                      className="form-control"
                    />
                  ) : (
                    user.user
                  )}
                </td>
                <td>
                  {editingUserId === user.userId ? (
                    <select
                      onChange={(e) =>
                        setEditedUser({ ...editedUser, active: e.target.value === "true" ? true : false })
                      }
                      value={editedUser.active ? "true" : "false"}
                      className="form-control"
                    >
                      <option value="true">Ativo</option>
                      <option value="false">Inativo</option>
                    </select>
                  ) : user.active ? (
                    "Ativo"
                  ) : (
                    "Inativo"
                  )}
                </td>
                <td>{user.type}</td>
                <td>
                  {user.type === "GESTOR"
                    ? user.employeeName
                    : user.type === "GRUPO" || user.type === "LÍDER" || user.type === "RELATOR"
                    ? user.groupName
                    : "ADMIN"}
                </td>
                <td>
                  {editingUserId === user.userId ? (
                    <div>
                      <button className="btn btn-success btn-sm mr-2" onClick={handleSave}>
                        <FaSave />
                      </button>
                      &nbsp;
                      <button className="btn btn-danger btn-sm" onClick={handleCancelEdit}>
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(user.userId)}>
                        <FaEdit />
                      </button>
                      &nbsp;
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.userId)}>
                        <FaTrash /> 
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
