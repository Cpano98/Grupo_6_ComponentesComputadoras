import React from "react";
import "./styles/listadoCategorias.css";

function listadoCategorias({ titulo, descripcion }) {

  return (
    <div className="dataContCat">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <div className="spacer-1"></div>

      <div className="elemento">
        <div className="flexDisplay">
          <h4>Samsung</h4>
          <p>5 productos</p>
        </div>
      </div>

      <div className="elemento">
        <div className="flexDisplay">
          <h4>Samsung</h4>
          <p>5 productos</p>
        </div>
      </div>

      <div className="elemento">
        <div className="flexDisplay">
          <h4>Samsung</h4>
          <p>5 productos</p>
        </div>
      </div>

      <div className="elemento">
        <div className="flexDisplay">
          <h4>Samsung</h4>
          <p>5 productos</p>
        </div>
      </div>


    </div>
  );
}

export default listadoCategorias;
