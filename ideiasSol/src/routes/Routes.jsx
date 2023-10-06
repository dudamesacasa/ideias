import React, { useContext } from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "../contexts/auth";

import IdeiasForm from "../components/ideias/IdeiasForm";
import IdeiasList from "../components/ideias/IdeiasList";
import EmployeeList from "../components/employees/EmployeeList";
import EmployeeForm from "../components/employees/EmployeeForm";
import IdeiaDetail from "../components/ideias/IdeiasDetails";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/ideias" element={<IdeiasForm />}></Route>
          <Route path="/listIdeias" element={<IdeiasList />}></Route>
          <Route path="/detailsIdeias" element={<IdeiaDetail />}></Route>
          <Route path="/employee" element={<EmployeeForm />}></Route>          
          <Route path="/employeeList" element={<EmployeeList />}></Route>


          
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
