import React, { useContext } from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "../contexts/auth";

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
// import EmployeeAttendanceControl from "../components/frequency/FrequencyForm";
import Initial from "../components/initial/initial";
import LoginForm from "../components/auth/LoginFrom";

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
          <Route path="/" element={<Initial/>}></Route>
          <Route path="/insertIideias" element={<IdeiasForm />}></Route>
          <Route path="/ideiaslist" element={<IdeiasList />}></Route>
          <Route path="/ideiasDetails" element={<IdeiaDetail />}></Route>
          <Route path="/insertEmployee" element={<EmployeeForm />}></Route>          
          <Route path="/employeeList" element={<EmployeeList />}></Route>
          <Route path="/insertGroups" element={<GroupForm />}></Route>
          <Route path="/groupsList" element={<GroupsList />}></Route>
          <Route path="/insertDepartment" element={<DepartmentForm />}></Route>
          <Route path="/departmentsList" element={<DepartmentsList />}></Route>     
          <Route path="/insertUsers" element={<UsersForm />}></Route>     
          <Route path="/usersList" element={<UsersList />}></Route>     
          <Route path="/ranking" element={<IdeiasRanking />}></Route>  
          <Route path="/login" element={<LoginForm />}></Route>  
          {/* <Route path="/frequency" element={<EmployeeAttendanceControl />}></Route>      */}


        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
