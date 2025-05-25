import { useState, useEffect } from 'react';
import './ProductForm.css';

function ProductForm({ onAddProduct, productToEdit, onCancelEdit }) {
  const [productData, setProductData] = useState({
    descripcion: '',
    precioUnitario: '',
    descuento: '',
    stock: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setProductData({
        descripcion: productToEdit.descripcion,
        precioUnitario: productToEdit.precioUnitario,
        descuento: productToEdit.descuento,
        stock: productToEdit.stock,
      });
    } else {
      setProductData({
        descripcion: '',
        precioUnitario: '',
        descuento: '',
        stock: '',
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const precioUnitarioNum = parseFloat(productData.precioUnitario);
    const descuentoNum = parseFloat(productData.descuento);

    let precioConDescuento = precioUnitarioNum;
    if (!isNaN(precioUnitarioNum) && !isNaN(descuentoNum) && descuentoNum >= 0 && descuentoNum <= 100) {
      precioConDescuento = precioUnitarioNum * (1 - descuentoNum / 100);
    }

    const productToSave = {
      id: productToEdit ? productToEdit.id : Date.now().toString(),
      descripcion: productData.descripcion,
      precioUnitario: precioUnitarioNum,
      descuento: descuentoNum,
      precioConDescuento: parseFloat(precioConDescuento.toFixed(2)), 
      stock: parseInt(productData.stock),
    };

    onAddProduct(productToSave);

    setProductData({
      descripcion: '',
      precioUnitario: '',
      descuento: '',
      stock: '',
    });

    if (productToEdit && onCancelEdit) {
      onCancelEdit(); // Salir del modo edición después de guardar
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form-container">
      <h2>{productToEdit ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>

      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={productData.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="precioUnitario">Precio Unitario:</label>
        <input
          type="number"
          id="precioUnitario"
          name="precioUnitario"
          value={productData.precioUnitario}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label htmlFor="descuento">Descuento (%):</label>
        <input
          type="number"
          id="descuento"
          name="descuento"
          value={productData.descuento}
          onChange={handleChange}
          min="0"
          max="100"
          step="1"
        />
      </div>

      <div>
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={productData.stock}
          onChange={handleChange}
          min="0"
          step="1"
          required
        />
      </div>

      <div className="form-buttons">
        <button type="submit">
          {productToEdit ? 'Guardar Cambios' : 'Agregar Producto'}
        </button>

        {productToEdit && (
          <button type="button" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;