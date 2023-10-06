import React, { useReducer, useState, useContext } from "react";
import "../css/FormLogin.css";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/auth";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="container">
      <header>
        <div className="header-content">
          <Link className="newTaskButton" to="/">
            <svg width="39" height="52">
              <rect x="1" y="1" width="12" height="12" rx="6" fill="#447CF0" />
              <rect
                x="1"
                y="14"
                width="12"
                height="12"
                rx="2"
                fill="#0F1A31"
              />{" "}
              <rect x="1" y="40" width="12" height="12" rx="2" fill="#0F1A31" />
              <rect
                x="14"
                y="14"
                width="12"
                height="12"
                rx="2"
                fill="#0F1A31"
              />
              <rect
                x="14"
                y="40"
                width="12"
                height="12"
                rx="2"
                fill="#0F1A31"
              />
              <rect x="1" y="27" width="12" height="12" rx="2" fill="#0F1A31" />
              <rect
                x="14"
                y="27"
                width="12"
                height="12"
                rx="2"
                fill="#0F1A31"
              />
              <rect
                x="27"
                y="27"
                width="12"
                height="12"
                rx="2"
                fill="#0F1A31"
              />
              <rect x="27" y="1" width="12" height="12" rx="2" fill="#0F1A31" />
              <rect x="14" y="1" width="12" height="12" rx="2" fill="#0F1A31" />
            </svg>
          </Link>
        </div>
      </header>
      <div className="content-formLogin">
        <form onSubmit={handleSubmit}>
          <h1 className="title">Task Manager</h1>
          <p className="text">Login</p>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            name="username"
            placeholder="Login"
            className="loginInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="submitButton" type="submit" value="Enviar">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
