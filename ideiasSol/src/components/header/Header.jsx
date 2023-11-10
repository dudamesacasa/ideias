import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import image from "../../assets/img/lamp.png";
import { AuthProvider, AuthContext } from "../../contexts/auth";
import { useContext } from 'react';


const CustomHeader = () => {
  // const role = localStorage.getItem("role");
  const { authenticated, loading, role } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("role");    
    localStorage.removeItem("token");    
    localStorage.removeItem("user");    
    navigate("/login");
  };

  return (
    <header className="bg-secondary py-4">
      <div className="container-lg">
        <Navbar bg="secondary">
          <Navbar.Brand>
            <Link to="/ideiasList">
              <img
                src={image}
                alt="Imagem de uma lâmpada acesa."
                className="img-thumbnail"
                style={{ width: "50px", height: "50px" }}
                data-toggle="tooltip"
                title="Página inicial"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            {role === "GESTOR" && (
              <Nav>
                <NavDropdown title="OPÇÕES" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/ideiasList">
                    Visualizar Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ranking">
                    Visualizar Ranking
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {role === "GRUPO" && (
              <Nav>
                <NavDropdown title="OPÇÕES" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/insertIdeias">
                    Cadastrar Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ideiasList">
                    Visualizar Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ranking">
                    Visualizar Ranking
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {(role === "LÍDER" || role === "RELATOR") && (
              <Nav>
                <NavDropdown title="OPÇÕES" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/insertIdeias">
                    Cadastrar Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ideiasList">
                    Visualizar Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ranking">
                    Visualizar Ranking
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/frequency">
                    Controle de Frequencia
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {role === "ADMIN" && (
              <Nav>
                <NavDropdown title="OPÇÕES" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/ideiasList">
                    Visualizar Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/insertEmployee">
                    Cadastrar Funcionários
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/employeeList">
                    Visualizar Funcionários
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/insertGroups">
                    Cadastrar Grupos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/groupsList">
                    Visualizar Grupos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/insertDepartment">
                    Cadastrar Departamentos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/departmentsList">
                    Visualizar Departamentos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/insertUsers">
                    Cadastrar Usuários
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/usersList">
                    Visualizar Usuários
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ranking">
                    Visualizar Ranking
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            <Nav.Link onClick={handleLogout} >Logout</Nav.Link>
          </Navbar.Collapse>
        </Navbar>

      </div>
    </header>
  );
};

export default CustomHeader;
