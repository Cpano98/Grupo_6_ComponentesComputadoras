import React from "react";
import "./styles/ultimoProducto.css";

function ultimoProducto({ titulo, descripcion }) {
  return (
    <div className="dataContUlt">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <div className="spacer-1"></div>

      <div className="elemento">
        <h4>Nombre:</h4>
        <p>Monitor Gamer ASUS TUF Gaming VG27WQ LED 27</p>
      </div>

      <div className="elemento">
        <h4>Precio:</h4>
        <p>$8499</p>
      </div>

      <div className="elemento">
        <h4>Marca:</h4>
        <p>Asus</p>
      </div>

      <div className="elemento">
        <h4>SKU:</h4>
        <p>90LM05F0B01E10</p>
      </div>

      <div className="elemento">
        <h4>Stock:</h4>
        <p>2 piezas</p>
      </div>
    </div>
  );
}

export default ultimoProducto;
