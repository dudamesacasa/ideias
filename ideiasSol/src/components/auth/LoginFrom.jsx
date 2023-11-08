import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../contexts/auth";

import image from "../../assets/img/lamp.png";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div>
      <header className="bg-secondary py-4">
        <div className="container-lg">
          <div className="row">
            <div className="col">
              <Link to="/" >
                <img src={image} alt="Imagem de uma lâmpada acesa." 
                className="img-thumbnail"
                style={{ width: "50px", height: "50px" }}
                data-toggle="tooltip"
                title="Página inicial"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="content-formLogin">
          <form onSubmit={handleSubmit} className="my-5">
            <h1 className="display-4 text-center">Sol</h1>
            <h2 className="text-center">Programa de Ideias</h2>
            <p className="text-center">Login</p>
            {error && <p className="text-danger text-center">{error}</p>}
            <input
              type="text"
              name="username"
              placeholder="Login"
              className="form-control my-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control my-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary btn-block" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
