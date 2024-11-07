function SuperStock({ productos, agregarProductoAlCarrito }) {
  return (
    <ul>
      {productos.map((producto) => (
        <li key={producto.id}>
          <button
            className="boton-item"
            onClick={() => agregarProductoAlCarrito(producto)}
          >
            +
          </button>
          {producto.name} (${producto.unitPrice.toFixed(2)} c/u)
        </li>
      ))}
    </ul>
  );
}

export default SuperStock;
