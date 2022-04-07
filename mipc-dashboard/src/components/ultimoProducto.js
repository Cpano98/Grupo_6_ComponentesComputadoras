import React from "react";
import "./styles/ultimoProducto.css";

function ultimoProducto({ titulo, descripcion }) {
  return (
    <div className="dataContUlt">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <div className="spacer-1"></div>
      <Productos />
    </div>
  );
}

class Productos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3030/api/products")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("RESPUESTA API: " + result.data.lastProduct);

          this.setState({
            isLoaded: true,
            item: result.data.lastProduct,
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
    const { error, isLoaded, item } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          <div className="elemento">
            <h4>Nombre:</h4>
            <p>{item.name}</p>
          </div>

          <div className="elemento">
            <h4>Precio:</h4>
            <p>$ {item.price}</p>
          </div>

          <div className="elemento">
            <h4>Marca:</h4>
            <p>{item.brand}</p>
          </div>

          <div className="elemento">
            <h4>SKU:</h4>
            <p>{item.sku}</p>
          </div>

          <div className="elemento">
            <h4>Stock:</h4>
            <p>{item.pieces} piezas</p>
          </div>
        </ul>
      );
    }
  }
}

export default ultimoProducto;
