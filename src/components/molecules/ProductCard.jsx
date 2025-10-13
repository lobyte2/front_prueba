// src/components/2-molecules/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Heading from '../atoms/Heading';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { CartContext } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <Image src={product.image} alt={product.name} className="product-card-image" />
        <Heading level={3}>{product.name}</Heading>
      </Link>
      <Text className="product-card-price">${product.price.toFixed(2)}</Text>
      <Button variant="primary" onClick={() => addToCart(product)}>
        Añadir al Carrito
      </Button>
    </div>
  );
};

export default ProductCard;