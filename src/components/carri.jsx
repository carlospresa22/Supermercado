function Carrito({ productosCarrito, eliminarProductoDelCarrito }) {
  return (
    <ul>
      {productosCarrito.map((producto) => (
        <li key={producto.id}>
          <button
            className="boton-item"
            onClick={() => eliminarProductoDelCarrito(producto)}
          >
            -
          </button>
          {producto.name} (Cant: {producto.cantidad}) ($
          {producto.unitPrice.toFixed(2)} c/u)
        </li>
      ))}
    </ul>
  );
}

export default Carrito;
