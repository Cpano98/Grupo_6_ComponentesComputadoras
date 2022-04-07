import React from "react";
import "./styles/todosLosProductos.css";

function todosLosProductos() {
  return (
    <div>
      <h2>Todos los productos</h2>
      <p>Se enlistan todos los productos registrados en MiPc</p>
      <div className="spacer-1"></div>

      <div className="dataContUltProductos">
        <Productos />
      </div>
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
    fetch("https://cors-everywhere.herokuapp.com/http://152.70.154.161:3000/api/products")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("RESPUESTA API: " + result.data.allProducts);
          this.setState({
            isLoaded: true,
            items: result.data.allProducts,
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
            <div className="content">
              <div className="elementoProductos">
                <p>{item.name.substring(0, 13)}</p>
              </div>
              <div className="elementoProductos">
                <p>$ {item.price}</p>
              </div>
              <div className="elementoProductos">
                <p>{item.brand}</p>
              </div>
              <div className="elementoProductos">
                <p>{item.sku}</p>
              </div>
              <div className="elementoProductos">
                <p>{item.pieces} piezas</p>
              </div>
            </div>
          ))}
        </ul>
      );
    }
  }
}

export default todosLosProductos;
