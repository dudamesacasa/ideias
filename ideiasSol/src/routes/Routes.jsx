import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "../contexts/auth";

import IdeiasForm from "../components/ideias/IdeiasForm";
import IdeiasList from "../components/ideias/IdeiasList";
import EmployeeList from "../components/employees/EmployeeList";
import EmployeeForm from "../components/employees/EmployeeForm";
import IdeiaDetail from "../components/ideias/IdeiasDetails";
import GroupsList from "../components/groups/GroupsList";
import GroupForm from "../components/groups/GroupForm";
import DepartmentForm from "../components/departments/DepartmentsForm";
import DepartmentsList from "../components/departments/DepartmentsList";
import UsersForm from "../components/users/UsersForm";
import UsersList from "../components/users/UsersList";
import IdeiasRanking from "../components/ranking/ranking";
import Initial from "../components/initial/initial";
import LoginForm from "../components/auth/LoginFrom";
import FrequenciaControl from "../components/frequency/FrequencyForm";
import AttendanceList from "../components/frequency/FrequencyList";

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading, role } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    if (role === undefined) {
      return <Navigate to="/login" />;
    }

    if (role === "GESTOR" && !["/ideiasList", "/ranking", "/frequencyList"].includes(window.location.pathname)) {
      return <Navigate to="/login" />;
    }

    if (role === "GRUPO" && !["/insertIdeias", "/ideiasList", "/ranking"].includes(window.location.pathname)) {
      return <Navigate to="/login" />;
    }

    if (
      (role === "LÍDER" || role === "RELATOR") &&
      !["/insertIdeias", "/ideiasList", "/ranking", "/frequency", , "/frequencyList"].includes(window.location.pathname)
    ) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Initial />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route
            exact
            path="/insertIdeias"
            element={
              <Private>
                <IdeiasForm />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/ideiasList"
            element={
              <Private>
                <IdeiasList />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/ideiasDetails"
            element={
              <Private>
                <IdeiaDetail />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/insertEmployee"
            element={
              <Private>
                <EmployeeForm />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/employeeList"
            element={
              <Private>
                <EmployeeList />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/insertGroups"
            element={
              <Private>
                <GroupForm />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/groupsList"
            element={
              <Private>
                <GroupsList />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/insertDepartment"
            element={
              <Private>
                <DepartmentForm />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/departmentsList"
            element={
              <Private>
                <DepartmentsList />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/insertUsers"
            element={
              <Private>
                <UsersForm />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/usersList"
            element={
              <Private>
                <UsersList />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/ranking"
            element={
              <Private>
                <IdeiasRanking />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/frequency"
            element={
              <Private>
                <FrequenciaControl />
              </Private>
            }
          ></Route>
          <Route
            exact
            path="/frequencyList"
            element={
              <Private>
                <AttendanceList />
              </Private>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
