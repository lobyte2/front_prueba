// src/components/pages/LoginPage.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '../templates/MainLayout';
import Heading from '../atoms/Heading';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import { loginUser } from '../../api/db';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userData = await loginUser({ email, password });
            login(userData);
            // Redirige al admin al panel y al usuario a la página de productos
            navigate(userData.role === 'admin' ? '/admin' : '/products');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <MainLayout>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Heading level={1} style={{ textAlign: 'center' }}>Iniciar Sesión</Heading>
                <FormField label="Email" id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <FormField label="Contraseña" id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                {error && <Text style={{ color: 'red' }}>{error}</Text>}
                <Button type="submit" style={{ width: '100%' }}>Entrar</Button>
                <Text style={{ textAlign: 'center', marginTop: '15px' }}>
                    ¿No tienes cuenta? <Link to="/register" style={{ color: '#007bff' }}>Regístrate aquí</Link>
                </Text>
            </form>
        </MainLayout>
    );
};

export default LoginPage;