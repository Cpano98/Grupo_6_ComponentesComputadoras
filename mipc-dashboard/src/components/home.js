import React from "react";
import "./styles/home.css";
import DataCont from "../components/dataCont";

function home() {
  return (
    <div>
      <div className="genaralInfoContainer">
        <div>
          <DataCont
            titulo={"Total de productos"}
            descripcion={"en mi PC"}
            valor={12}
          />
        </div>
        <div>
          <DataCont
            titulo={"Total de usuarios"}
            descripcion={"registrados (clients)"}
            valor={12}
          />
        </div>
        <div>
          <DataCont
            titulo={"Total categorias"}
            descripcion={"de productos"}
            valor={12}
          />
        </div>
      </div>

      <div className="spacer-1"></div>

      <div className="genaralTwoContainer">
        <div>
          <DataCont
            titulo={"Total de productos"}
            descripcion={"Esta es la descripcion del componente"}
            valor={12}
          />
        </div>
        <div>
          <DataCont
            titulo={"Total de usuarios"}
            descripcion={"Esta es la descripcion del componente"}
            valor={12}
          />
        </div>
      </div>
    </div>
  );
}

export default home;
