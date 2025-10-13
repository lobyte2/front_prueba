// src/components/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import MainLayout from '../templates/MainLayout';
import Heading from '../atoms/Heading';
import ProductGrid from '../organisms/ProductGrid';
import { getProducts } from '../../api/db';
import Text from '../atoms/Text';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Obtenemos todos los productos y mostramos solo los primeros 4 como "destacados"
    getProducts().then(allProducts => {
      setFeaturedProducts(allProducts.slice(0, 4));
    });
  }, []);

  return (
    <MainLayout>
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <Heading level={1}>¡Bienvenido a Perifericos.roro!</Heading>
        <Text>La mejor calidad en periféricos para potenciar tu setup.</Text>
      </div>
      
      <Heading level={2}>Productos Destacados</Heading>
      <ProductGrid products={featuredProducts} />
    </MainLayout>
  );
};

export default HomePage;