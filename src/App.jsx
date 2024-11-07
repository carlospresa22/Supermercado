import React, { useState } from "react";
import SuperStock from "./components/SuperStock";
import Carrito from "./components/carri";
import groceries from "./data/groceries";
import "./App.css";

function App() {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [mensaje, setMensaje] = useState("");

  function agregarProductoAlCarrito(producto) {
    const limitados = ["Papel Higiénico", "Alcohol en Gel"];
    const cantidadActual =
      productosCarrito.find((item) => item.id === producto.id)?.cantidad || 0;
    const nuevoMensaje =
      limitados.includes(producto.name) && cantidadActual >= 5
        ? "Lo sentimos. No es posible comprar más unidades. Otras familias también necesitan abastecerse."
        : "";

    setMensaje(nuevoMensaje);

    setProductosCarrito((agregar) => {
      const existe = agregar.some((item) => item.id === producto.id);
      return limitados.includes(producto.name) && cantidadActual >= 5
        ? agregar
        : existe
        ? agregar.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...agregar, { ...producto, cantidad: 1 }];
    });
  }

  function eliminarProductoDelCarrito(producto) {
    setProductosCarrito((eliminar) =>
      eliminar
        .map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  const totalCarrito = productosCarrito.reduce((total, item) => {
    const cantidad = Number(item.cantidad);
    const precio = Number(item.unitPrice);
    return total + cantidad * precio;
  }, 0);

  return (
    <div className="container">
      <div className="productos">
        <h2>Lista de Productos</h2>
        <SuperStock
          productos={groceries}
          agregarProductoAlCarrito={agregarProductoAlCarrito}
        />
      </div>
      <div className="carrito">
        <h2>Carrito de Compras</h2>
        <Carrito
          productosCarrito={productosCarrito}
          eliminarProductoDelCarrito={eliminarProductoDelCarrito}
        />
        <div className="total">Total: ${totalCarrito.toFixed(2)}</div>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
}

export default App;
