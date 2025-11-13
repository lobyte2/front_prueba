import { createContext, useState, useEffect, useContext } from 'react';
import { getCart, addToCartApi, removeFromCartApi } from '../api/db';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, user } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated && user) {
            setLoading(true);
            getCart()
                .then(setCart)
                .catch(err => {
                    console.error("Error al cargar el carrito:", err.message);
                    setCart([]);
                })
                .finally(() => setLoading(false));
        } else {
            setCart([]);
        }
    }, [isAuthenticated, user]);

    const addToCart = async (product) => {
        if (!isAuthenticated) {
            alert('Debes iniciar sesión para agregar productos al carrito');
            return;
        }
        try {
            const updatedCart = await addToCartApi(product);
            setCart(updatedCart);
        } catch (error) {
            console.error("Error al agregar al carrito:", error.message);
        }
    };

    const removeFromCart = async (productId) => {
        if (!isAuthenticated) return;
        try {
            const updatedCart = await removeFromCartApi(productId);
            setCart(updatedCart);
        } catch (error) {
            console.error("Error al eliminar del carrito:", error.message);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, loadingCart: loading }}>
            {children}
        </CartContext.Provider>
    );
};