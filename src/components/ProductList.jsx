import React from 'react';
import ProductItem from './ProductItem';
import './ProductList.css';

function ProductList({ products }) {
  return (
    <div className="product-list-container">
      <h2>Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos registrados aún.</p>
      ) : (
        <div className="product-list-grid">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;