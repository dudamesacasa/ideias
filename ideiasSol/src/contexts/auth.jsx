import React, { createContext, useState, useEffect, state } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      setRole(role);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await createSession(username, password);

    const loggedUser = response.data.username;
    const role = response.data.type;
    const token = response.data.accessToken;

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(loggedUser);
    setRole(role);
    navigate("/ideiasList");

    console.log('role auth')
    console.log(role)
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // localStorage.removeItem("role");

    axios.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};
