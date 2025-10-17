// src/components/pages/ProductsPage.jsx
import { useState, useEffect } from 'react';
import MainLayout from '../templates/MainLayout';
import Heading from '../atoms/Heading';
import ProductGrid from '../organisms/ProductGrid';
import { getProducts } from '../../api/db';

const ProductsPage = () => {
  // Guarda la lista original y completa de productos.
  const [products, setProducts] = useState([]);
  
  // Guarda el texto que el usuario escribe en el buscador.
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // Filtra los productos basándose en el texto del buscador.
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <Heading level={1} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Nuestro Catálogo
      </Heading>

      {/* Input para el buscador, dentro de la página. */}
      <input
        type="text"
        placeholder="Buscar en el catálogo..."
        className="input-field" // Reutilizamos un estilo que ya tienes
        style={{ width: '100%', maxWidth: '600px', margin: '0 auto 30px', display: 'block' }}
        onChange={e => setSearchTerm(e.target.value)} // Actualiza el estado con cada letra.
      />
      
      {/* Muestra la lista de productos ya filtrada. */}
      <ProductGrid products={filteredProducts} />
    </MainLayout>
  );
};

export default ProductsPage;