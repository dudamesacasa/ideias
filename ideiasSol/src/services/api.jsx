import axios from "axios";

// const token = localStorage.getItem("token");

// console.log(token)

export const api = axios.create({
  baseURL: "http://localhost:4000",
  // headers: {
  //   Authorization: {token},
  // },
});

export const createSession = async (username, password) => {
  return api.post("/login", { username, password });
};

export const getDepartments = async () => {
  return api.get("/getDepartments");
};

export const getGroups = async () => {
  return api.get("/getGroups");
};

export const deleteGroup = async (groupId) => {
  return api.delete(`/deleteGroup/${groupId}`);
}

export const updateGroup = async (editingGroupId, editedGroup) => {
  return api.put(`/updateGroup/${editingGroupId}`, editedGroup);
}

export const insertGroup = async (formData) => {
  return api.post("/insertGroup", {formData});
}

export const insertIdeia = async (formData) => {
  console.log(formData)
    return api.post("/insertIdeia", {formData});
}

export const getIdeias = async () => {
  return api.get("/getIdeias");
};

export const getIdeiasDetails = async (ideia) => {
  return api.get(`/getIdeiasDetails/${ideia}`);

};

export const deleteIdeia = async (ideiaId) => {
  return api.delete(`/deleteIdeia/${ideiaId}`);
}

export const updateIdeia = async (editingIdeiaId, editedData) => {
  return api.put(`/updateIdeia/${editingIdeiaId}`, editedData);
}

export const insertEmployee = async (formData) => {
  console.log(formData)
    return api.post("/insertEmployee", {formData});
}

export const getEmployee = async () => {
  return api.get("/getEmployee");
};

export const deleteEmployee = async (employeeId) => {
  return api.delete(`/deleteEmployee/${employeeId}`);
}

export const updateEmployee = async (editingEmployeeId, editedEmployee) => {
  return api.put(`/updateEmployee/${editingEmployeeId}`, editedEmployee);
}

