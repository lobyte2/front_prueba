// src/components/3-organisms/Header.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import Button from '../atoms/Button';
import SearchForm from '../molecules/SearchForm';
import './Header.css';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="main-header">
            <Link to="/" className="logo">Perifericos.roro</Link>
            <nav className="main-nav">
                <Link to="/">Inicio</Link>
                <Link to="/products">Productos</Link>
                {/* Agrega aquí más links como Nosotros, Contacto, etc. */}
                {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
            </nav>
            <div className="header-actions">
                <SearchForm />
                <Link to="/cart" className="cart-link">
                    🛒 Carrito ({cartItemCount})
                </Link>
                {user ? (
                    <div className="user-info">
                        <span>{user.email}</span>
                        <Button onClick={logout} variant="secondary">Logout</Button>
                    </div>
                ) : (
                    <div className="login-actions">
                         <Link to="/login">Iniciar Sesión</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;