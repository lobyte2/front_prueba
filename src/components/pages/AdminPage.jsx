// src/components/pages/AdminPage.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../templates/MainLayout';
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import Text from '../atoms/Text';
import { AuthContext } from '../../context/AuthContext';
import { getUsers, deleteUser, addUser, getProducts, addProduct } from '../../api/db'; // Importamos las nuevas funciones

const AdminPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Estados para la gestión de usuarios
    const [users, setUsers] = useState([]);
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [userError, setUserError] = useState('');

    // --- Estados para la gestión de productos ---
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductImage, setNewProductImage] = useState('');
    const [newProductDesc, setNewProductDesc] = useState('');
    const [productError, setProductError] = useState('');

    useEffect(() => {
        // Protección de la ruta
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }

        // Cargar datos iniciales
        getUsers().then(setUsers);
        getProducts().then(setProducts);

    }, [user, navigate]);

    // --- Lógica para Usuarios (se mantiene igual) ---
    const handleDeleteUser = async (userId) => {
        if (userId === user.id) {
            alert('No puedes eliminarte a ti mismo.');
            return;
        }
        const updatedUsers = await deleteUser(userId);
        setUsers(updatedUsers);
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setUserError('');
        try {
            const updatedUsers = await addUser({ email: newUserEmail, password: newUserPassword });
            setUsers(updatedUsers);
            setNewUserEmail('');
            setNewUserPassword('');
        } catch (err) {
            setUserError(err);
        }
    };

    // --- Lógica para Productos ---
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setProductError('');

        if (!newProductName || !newProductPrice || !newProductImage || !newProductDesc) {
            setProductError('Todos los campos son obligatorios.');
            return;
        }

        try {
            const productData = {
                name: newProductName,
                price: newProductPrice,
                image: newProductImage,
                description: newProductDesc
            };
            const updatedProducts = await addProduct(productData);
            setProducts(updatedProducts);

            // Limpiar el formulario
            setNewProductName('');
            setNewProductPrice('');
            setNewProductImage('');
            setNewProductDesc('');

        } catch (err) {
            setProductError('Hubo un error al agregar el producto.');
        }
    };


    return (
        <MainLayout>
            <Heading level={1} style={{ textAlign: 'center' }}>Panel de Administración</Heading>

            {/* --- Sección de Productos --- */}
            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                <Heading level={2}>Administrar Productos</Heading>
                
                {/* Formulario para agregar productos */}
                <form onSubmit={handleAddProduct} style={{ marginBottom: '20px' }}>
                    <Heading level={3}>Agregar Nuevo Producto</Heading>
                    <FormField label="Nombre del Producto" type="text" value={newProductName} onChange={e => setNewProductName(e.target.value)} />
                    <FormField label="Precio" type="number" value={newProductPrice} onChange={e => setNewProductPrice(e.target.value)} />
                    <FormField label="URL de la Imagen" type="text" value={newProductImage} onChange={e => setNewProductImage(e.target.value)} />
                    <FormField label="Descripción" type="textarea" value={newProductDesc} onChange={e => setNewProductDesc(e.target.value)} />
                    {productError && <Text style={{ color: 'red' }}>{productError}</Text>}
                    <Button type="submit">Agregar Producto</Button>
                </form>

                {/* Lista de productos actuales */}
                <Heading level={3}>Lista de Productos</Heading>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {products.map(p => (
                        <li key={p.id} style={{ background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
                            {p.name}
                        </li>
                    ))}
                </ul>
            </div>


            {/* --- Sección de Usuarios (se mantiene igual) --- */}
            <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                <Heading level={2}>Administrar Usuarios</Heading>
                <form onSubmit={handleAddUser} style={{ marginBottom: '20px' }}>
                    <Heading level={3}>Agregar Nuevo Usuario</Heading>
                    <FormField label="Email" type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} />
                    <FormField label="Contraseña" type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} />
                    {userError && <Text style={{ color: 'red' }}>{userError}</Text>}
                    <Button type="submit">Agregar Usuario</Button>
                </form>

                <Heading level={3}>Lista de Usuarios</Heading>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {users.map(u => (
                        <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '10px', borderRadius: '4px', marginBottom: '5px' }}>
                            <span>{u.email} ({u.role})</span>
                            <Button onClick={() => handleDeleteUser(u.id)} variant="danger">Eliminar</Button>
                        </li>
                    ))}
                </ul>
            </div>

        </MainLayout>
    );
};

export default AdminPage;