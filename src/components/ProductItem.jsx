import React from 'react';
import './ProductItem.css';


function ProductItem({ product, onEdit, onDelete }) {
  return (
    <div className="product-item">
      <h3>{product.descripcion}</h3>
      <p>ID: {product.id}</p>
      <p>Precio Unitario: ${product.precioUnitario}</p>
      <p>Descuento: {product.descuento}%</p>
      <p>Precio con Descuento: ${product.precioConDescuento}</p>
      <p>Stock: {product.stock}</p>
      {/* Aca van los botones de editar y eliminar*/}
      <p className="product-actions">
        <button onClick={() => onEdit(product)}>Editar</button>
        <button onClick={() => onDelete(product.id)}>Eliminar</button>
      </p>
    </div>
  );
}

export default ProductItem;