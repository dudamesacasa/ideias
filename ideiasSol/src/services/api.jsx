import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Authorization: { token },
  },
});

export const createSession = async (username, password) => {
  return api.post("/login", { username, password });
};

export const getUserLogin = async (username, password) => {
  return api.post("/getUserLogin", { username, password });
};

export const getDepartments = async () => {
  return api.get("/getDepartments");
};

export const deleteDepartment = async (departmentId) => {
  return api.delete(`/deleteDepartment/${departmentId}`);
};

export const updateDepartment = async (editingDepartmentId, editedDepartment) => {
  return api.put(`/updateDepartment/${editingDepartmentId}`, editedDepartment);
};

export const insertDepartment = async (formData) => {
  return api.post("/insertDepartment", { formData });
};

export const getGroups = async () => {
  return api.get("/getGroups");
};

export const deleteGroup = async (groupId) => {
  return api.delete(`/deleteGroup/${groupId}`);
};

export const updateGroup = async (editingGroupId, editedGroup) => {
  return api.put(`/updateGroup/${editingGroupId}`, editedGroup);
};

export const insertGroup = async (groupData) => {
  return api.post("/insertGroup", { groupData });
};

export const insertIdeia = async (formData) => {
  return api.post("/insertIdeia", { formData });
};

export const getIdeias = async (user) => {
  return api.get("/getIdeias", { params: { user } });
};

export const getIdeiasDetails = async (ideia) => {
  return api.get(`/getIdeiasDetails/${ideia}`);
};

export const deleteIdeia = async (ideiaId) => {
  return api.delete(`/deleteIdeia/${ideiaId}`);
};

export const updateIdeia = async (editingIdeiaId, editedData) => {
  return api.put(`/updateIdeia/${editingIdeiaId}`, editedData);
};

export const insertEmployee = async (formData) => {
  return api.post("/insertEmployee", { formData });
};

export const getEmployee = async () => {
  return api.get("/getEmployee");
};

export const getEmployeesGroup = async () => {
  return api.get("/getEmployeesGroup");
};

export const deleteEmployee = async (employeeId) => {
  return api.delete(`/deleteEmployee/${employeeId}`);
};

export const updateEmployee = async (editingEmployeeId, editedEmployee) => {
  return api.put(`/updateEmployee/${editingEmployeeId}`, editedEmployee);
};

export const insertUser = async (formData) => {
  return api.post("/insertUser", { formData });
};

export const getUsers = async () => {
  return api.get("/getUsers");
};

export const deleteUser = async (UsersId) => {
  return api.delete(`/deleteUser/${UsersId}`);
};

export const updateUser = async (editingUserId, editedUser) => {
  return api.put(`/updateUser/${editingUserId}`, editedUser);
};

export const getIdeiasRanking = async () => {
  return api.get("/getIdeiasRanking");
};

export const getGroupMembers = async (groupId) => {
  return api.get("/getGroupMembers", { params: { groupId } });
};

export const deleteGroupMembers = async (memberId) => {
  return api.delete(`/deleteGroupMembers/${memberId}`);
};

export const updateGroupMember = async (memberId, editedMember) => {
  return api.put(`/updateGroupMember/${memberId}`, editedMember);
};

export const getGroupMembersFrequency = async (user) => {
  return api.get("/getGroupMembersFrequency", { params: { user } });
};

export const insertFrequency = async (meetingDate, attendanceData, user) => {
  return api.post("/insertFrequency", { meetingDate, attendanceData, user });
};

export const getFrequency = async (meetingDate, user) => {
  console.log("chegou na api");
  console.log(meetingDate);
  console.log(user);
  return api.get("/getFrequency", {
    params: {
      meetingDate,
      user,
    },
  });
};
