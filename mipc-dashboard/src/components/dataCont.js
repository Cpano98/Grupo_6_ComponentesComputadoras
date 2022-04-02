import React from "react";
import "./styles/dataCont.css";


function dataCont({titulo, descripcion, valor}) {
  return (
    <div className="dataCont">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <div className="spacer-1"></div>
      <h2>{valor}</h2>
    </div>
  );
}

export default dataCont;
