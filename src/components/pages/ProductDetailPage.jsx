// src/components/pages/ProductDetailPage.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../templates/MainLayout';
import { getProductById } from '../../api/db';
import Heading from '../atoms/Heading';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import { CartContext } from '../../context/CartContext';

const ProductDetailPage = () => {
    const { id } = useParams(); // Obtiene el ID del producto de la URL
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        getProductById(id).then(setProduct);
    }, [id]);

    if (!product) {
        return <MainLayout><div>Cargando...</div></MainLayout>;
    }

    return (
        <MainLayout>
            <div style={{ display: 'flex', gap: '40px', padding: '40px', background: '#fff', borderRadius: '8px' }}>
                <Image src={product.image} alt={product.name} style={{ maxWidth: '500px', borderRadius: '8px' }} />
                <div>
                    <Heading level={1}>{product.name}</Heading>
                    <Text style={{ fontSize: '1.2em', color: '#555' }}>{product.description}</Text>
                    <Heading level={2} style={{ color: '#28a745', margin: '20px 0' }}>${product.price.toFixed(2)}</Heading>
                    <Button onClick={() => addToCart(product)}>Añadir al Carrito</Button>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProductDetailPage;