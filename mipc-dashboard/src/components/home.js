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
            valor={<MyComponent />}
          />
          
        </div>
        <div>
          <DataCont
            titulo={"Total de usuarios"}
            descripcion={"registrados (clients)"}
            valor={<Users />}
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

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://152.70.154.161:3000/api/products")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("RESPUESTA API: " + result);
          console.log(result.data.totalProducts);

          this.setState({
            isLoaded: true,
            items: result.data.totalProducts,
          });
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return items;
    }
  }
}


class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://152.70.154.161:3000/api/users")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("RESPUESTA API: " + result);
          console.log(result.data.totalusers);

          this.setState({
            isLoaded: true,
            items2: result.data.totalusers,
          });
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items2 } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return items2;
    }
  }
}


/*
class Categorias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3030/api/users")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("RESPUESTA API: " + result);
          console.log(result.data.totalusers);

          this.setState({
            isLoaded: true,
            items2: result.data.totalusers,
          });
        },
        // Nota: es importante manejar errores aquí y no en
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items2 } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return items2;
    }
  }
}
*/

export default home;
