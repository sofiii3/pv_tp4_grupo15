import { useState, useMemo } from 'react';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    console.log('Lista de productos actual:', [...products, newProduct]); // Para verificar en consola por las dudas
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
 const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }

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
          <ProductForm onAddProduct={addProduct} />
        </div>

        <div className="grid-column-right"> 
          <SearchBar onSearchChange={handleSearchChange} searchTerm={searchTerm} />
          <ProductList products={filteredProducts} />
        </div>

      </div> 
    </div>
  );
}

export default App;