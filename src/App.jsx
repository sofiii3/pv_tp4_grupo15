import { useState, useMemo } from 'react';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [productToEdit, setProductToEdit] = useState(null);

  const saveProduct = (product) => {
    if (productToEdit) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? product : p))
      );
      setProductToEdit(null);
    } else {
      setProducts([...products, product]);
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
  };

  const cancelEdit = () => {
    setProductToEdit(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return products.filter((product) =>
      product.descripcion.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.id.toString().includes(lowerCaseSearchTerm)
    );
  }, [products, searchTerm]);

  return (
    <div className="App">
      <h1>Gestión de Productos</h1>

      <div className="main-content-grid">
        <div className="grid-column-left">
          <ProductForm
            onAddProduct={saveProduct}
            productToEdit={productToEdit}
            onCancelEdit={cancelEdit}
          />
        </div>

        <div className="grid-column-right">
          <SearchBar onSearchChange={handleSearchChange} searchTerm={searchTerm} />
          <ProductList
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;