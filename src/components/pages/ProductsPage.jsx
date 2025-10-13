// src/components/pages/ProductsPage.jsx
import { useState, useEffect } from 'react';
import MainLayout from '../templates/MainLayout';
import Heading from '../atoms/Heading';
import ProductGrid from '../organisms/ProductGrid';
import { getProducts } from '../../api/db';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <MainLayout>
      <Heading level={1} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Nuestro Catálogo
      </Heading>
      <ProductGrid products={products} />
    </MainLayout>
  );
};

export default ProductsPage;