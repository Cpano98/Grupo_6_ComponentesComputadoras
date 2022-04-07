import React from "react";
import "./styles/listadoCategorias.css";

function listadoCategorias({ titulo, descripcion }) {
  return (
    <div className="dataContCat">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <div className="spacer-1"></div>
      <Categorias />
    </div>
  );
}


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
    fetch("https://cors-everywhere.herokuapp.com/http://152.70.154.161:3000/api/products")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("RESPUESTA API: " + result.data.categories);
          this.setState({
            isLoaded: true,
            items: result.data.categories,
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
      return (
        <ul>
          {items.map((item) => (
            <div className="elemento">
              <div className="flexDisplay">
                <h4> {item.category}</h4>
                <p>{item.count}</p>
              </div>
            </div>
          ))}
        </ul>
      );
    }
  }
}

export default listadoCategorias;
