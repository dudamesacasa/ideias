import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/img/ideia_shutter.jpg";

function Initial() {
  return (
    <div className="text-center">
      <header className="bg-secondary py-4"> 
        <div className="container-lg">
          <div className="row">
            <div className="col">
              <Link to="/login" className="btn btn-dark float-end">Login</Link>
            </div>
          </div>
        </div>
      </header>

      <h1 className="display-4 my-4">SOL</h1>
      <h2>Programa de Ideias</h2>
      <img src={image} alt="Imagem de lâmpadas acendendo." className="mx-auto" />
    </div>
  );
}

export default Initial;
