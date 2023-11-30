import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import image from "../../assets/img/lamp.png";
import { AuthProvider, AuthContext } from "../../contexts/auth";
import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FaList, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineFormatListBulleted } from "react-icons/md";

const CustomHeader = () => {
  const { authenticated, loading, role } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-secondary py-4">
      <div className="container-lg">
        <Navbar expand="lg" bg="secondary">
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
                <NavDropdown title={<MdOutlineFormatListBulleted size="30px" />} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/ideiasList">
                    Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ranking">
                    Ranking
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/frequency">
                    Controle de Frequencia
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {role === "GRUPO" && (
              <Nav>
                <NavDropdown title={<MdOutlineFormatListBulleted size="30px" />} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/insertIdeias">
                    Cadastrar Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ideiasList">
                    Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ranking">
                    Ranking
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/frequency">
                    Controle de Frequencia
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {(role === "LÍDER" || role === "RELATOR") && (
              <Nav>
                <NavDropdown title={<MdOutlineFormatListBulleted size="30px" />} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/insertIdeias">
                    Cadastrar Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ideiasList">
                    Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ranking">
                    Ranking
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/frequency">
                    Controle de Frequencia
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            {role === "ADMIN" && (
              <Nav>
                <NavDropdown title={<MdOutlineFormatListBulleted size="30px" />} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/ideiasList">
                    Ideias
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/insertEmployee">
                    Cadastrar Funcionários
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/employeeList">
                    Funcionários
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/insertGroups">
                    Cadastrar Grupos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/groupsList">
                    Grupos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/insertDepartment">
                    Cadastrar Departamentos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/departmentsList">
                    Departamentos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/insertUsers">
                    Cadastrar Usuários
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/usersList">
                    Usuários
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ranking">
                    Ranking
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/frequency">
                    Controle de Frequencia
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            <Nav.Link onClick={handleLogout}>
              <FaSignOutAlt size="30px" />
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default CustomHeader;
