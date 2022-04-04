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

      <MyComponent />
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
          console.log("API: " + result);

          this.setState({
            isLoaded: true,
            items: result.items,
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
    return (
      <h1>Hola</h1>
    );
  }
}

export default ultimoProducto;
