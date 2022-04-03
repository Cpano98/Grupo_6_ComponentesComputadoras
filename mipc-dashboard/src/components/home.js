import React from "react";
import "./styles/home.css";
import DataCont from "../components/dataCont";
import UltimoProducto from "../components/ultimoProducto";
import ListadoCategorias from "../components/listadoCategorias";

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
            titulo={"Total categorías"}
            descripcion={"de productos"}
            valor={12}
          />
        </div>
      </div>

      <div className="spacer-1"></div>

      <div className="genaralTwoContainer">
        <div>
          <UltimoProducto titulo={"Último producto"} descripcion={"creado"} />
        </div>
        <div>
          <ListadoCategorias titulo={"Categorías"} descripcion={"creadas"} />
        </div>
      </div>
    </div>
  );
}

export default home;
