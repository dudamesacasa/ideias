import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getGroups,
  updateGroup,
  deleteGroup,
  getDepartments,
  getGroupMembers,
  deleteGroupMembers,
} from "../../services/api";
import CustomHeader from "../header/Header";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Select from "react-select";
import { Link } from "react-router-dom";

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState('');
  const [editedGroup, setEditedGroup] = useState({
    name: "",
    departmentId: "",
    email: "",
    avatar: null,
    active: true,
  });
  const [editedMember, setEditedMember] = useState({
    leader: "",
    reporter: "",
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

    (async () => {
      const response = await getDepartments();
      setDepartmentList(response.data);
    })();
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

  const handleShowMembers = async (groupId) => {
    try {
      const response = await getGroupMembers(groupId);

      if (response.status === 200) {
        setMembers(response.data);
      } else {
        console.error("Erro ao buscar membros do grupo");
      }
    } catch (error) {
      console.error("Erro ao buscar membros do grupo", error);
    }

    setShowMembers(groupId);
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
        editedGroup,
      });

      if (response.status === 200) {
        setEditingGroupId(null);
        fetchData();
      } else {
        console.error("Erro ao editar grupo");
      }
    } catch (error) {
      console.error("Erro ao editar grupo", error);
    }
  };
  
  const handleCancelEdit = () => {
    setEditingGroupId(null);
  };


  const handleEditMembers = (memberId) => {
    console.log('memberId')
    console.log(memberId)
    setEditingMemberId(memberId);

    const memberToEdit = members.find((member) => member.memberId === memberId);

    if (memberToEdit) {
      setEditedMember({
        leader: memberToEdit.leader,
        reporter: memberToEdit.reporter,
      });
    }
  };

  const handleSaveMembers = async () => {
    try {
      const response = await updateGroupMember(editingMemberId, editedMember);
  
      if (response.status === 200) {
        setEditingMemberId(null);
      } else {
        console.error("Erro ao salvar as alterações do membro");
      }
    } catch (error) {
      console.error("Erro ao salvar as alterações do membro", error);
    }
  };

  
  const handleCancelEditMembers = () => {
    setEditingMemberId(null);
  };

  const handleDelete = async (groupId) => {
    try {
      const confirmDelete = window.confirm("Tem certeza que deseja excluir este grupo?");

      if (!confirmDelete) {
        return;
      }

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

  const handleDeleteMember = async (memberId) => {
    try {
      const confirmDelete = window.confirm("Tem certeza que deseja excluir este membro?");

      if (!confirmDelete) {
        return;
      }

      const response = await deleteGroupMembers(memberId);

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

  const optionsDepartments = departmentList.map((department) => ({
    value: department.departmentId,
    label: department.name,
  }));

  

  return (
    <div>
      <CustomHeader></CustomHeader>
      <div className="container mt-4">
        <div className="row text-center justify-content-end">
          <h1>Lista de Grupos</h1>
          <div className="col-auto justify-content-end">
            <Link to="/insertGroups" className="btn btn-primary">
              +
            </Link>
          </div>
        </div>
        <table className="table text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Departamento</th>
              <th>Email</th>
              {/* <th>Avatar</th> */}
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <React.Fragment key={group.groupId}>
                <tr key={group.groupId}>
                  <td>{group.groupId}</td>
                  <td>
                    {editingGroupId === group.groupId ? (
                      <input
                        type="text"
                        value={editedGroup.name}
                        onChange={(e) => setEditedGroup({ ...editedGroup, name: e.target.value })}
                        className="form-control"
                        required
                      />
                    ) : (
                      group.name
                    )}
                  </td>
                  <td>
                    {editingGroupId === group.groupId ? (
                      <Select
                        name="departmentId"
                        id="departmentId"
                        value={optionsDepartments.find((option) => option.value === editedGroup.departmentId)}
                        onChange={(selectedOption) => {
                          setSelectedDepartment(selectedOption);
                          setEditedGroup({ ...editedGroup, departmentId: selectedOption.value });
                        }}
                        options={optionsDepartments}
                        isSearchable
                        required
                      />
                    ) : (
                      group.depName
                    )}
                  </td>
                  <td>
                    {editingGroupId === group.groupId ? (
                      <input
                        type="text"
                        value={editedGroup.email}
                        onChange={(e) => setEditedGroup({ ...editedGroup, email: e.target.value })}
                        className="form-control"
                        required
                      />
                    ) : (
                      group.email
                    )}
                  </td>
                  {/* <td>
                  {editingGroupId === group.groupId ? (
                    <input
                      type="text"
                      value={editedGroup.avatar}
                      onChange={(e) => setEditedGroup({ ...editedGroup, avatar: e.target.value })}
                      className="form-control"
                      
                    />
                  ) : (
                    group.avatar
                  )}
                 </td> */}
                  <td>
                    {editingGroupId === group.groupId ? (
                      <select
                        onChange={(e) => setEditedGroup({ ...editedGroup, active: e.target.value })}
                        value={editedGroup.active}
                        className="form-control"
                      >
                        <option value="1">Ativo</option>
                        <option value="0">Inativo</option>
                      </select>
                    ) : (
                      <td>{group.active ? "Ativo" : "Inativo"}</td>
                    )}
                  </td>

                  <td>
                    {editingGroupId === group.groupId ? (
                      <div>
                        <button className="btn btn-success btn-sm mr-2" onClick={handleSave}>
                          <FaSave />
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={handleCancelEdit}>
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="btn btn-primary btn-sm mr-2"
                          onClick={() => handleShowMembers(group.groupId)}
                        >
                          Membros
                        </button>
                        &nbsp;
                        <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(group.groupId)}>
                          <FaEdit />
                        </button>
                        &nbsp;
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(group.groupId)}>
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
                {showMembers === group.groupId && (
                  <tr key={`members-${group.groupId}`}>
                    <td colSpan="6">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Líder</th>
                            <th>Relator</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((member) => (
                            <tr key={member.memberId}>
                              <td>{member.name}</td>
                              <td>
                                {editingMemberId === member.memberId ? (
                                  <input
                                    type="checkbox"
                                    value={member.leader}
                                    onChange={(e) => setEditedMember({ ...editedMember, leader: e.target.value })}
                                    className="form-check-input"
                                  />
                                ) : member.leader ? (
                                  "Sim"
                                ) : (
                                  "Não"
                                )}
                              </td>
                              <td>
                                {editingMemberId === member.memberId ? (
                                  <input
                                    type="checkbox"
                                    value={member.reporter}
                                    onChange={(e) => setEditedMember({ ...editedMember, reporter: e.target.value })}
                                    className="form-check-input"
                                  />
                                ) : member.reporter ? (
                                  "Sim"
                                ) : (
                                  "Não"
                                )}
                              </td>
                              <td> 
                                {editingMemberId === member.memberId ? (
                                  <div>
                                    <button className="btn btn-success btn-sm mr-2" onClick={handleSaveMembers}>
                                      <FaSave />
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={handleCancelEditMembers}>
                                      <FaTimes />
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <button
                                      className="btn btn-primary btn-sm mr-2"
                                      onClick={() => handleEditMembers(member.memberId)}
                                    >
                                      <FaEdit />
                                    </button>
                                    &nbsp;
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => handleDeleteMember(group.groupId, member.memberId)}
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupsList;
