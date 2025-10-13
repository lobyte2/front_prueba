// src/components/pages/AdminPage.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../templates/MainLayout';
import { AuthContext } from '../../context/AuthContext';
// Importa la nueva función 'addUser' que agregaremos a la API
import { getUsers, deleteUser, addUser } from '../../api/db';
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
// Reutilizamos la molécula que ya creamos para los campos del formulario
import FormField from '../molecules/FormField';

const AdminPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    
    // Estados para el nuevo formulario de usuario
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        } else {
            getUsers().then(setUserList);
        }
    }, [user, navigate]);

    const handleDelete = async (userId) => {
        if (userId === user.id) {
            alert("No puedes eliminar al administrador actual.");
            return;
        }
        const updatedUsers = await deleteUser(userId);
        setUserList(updatedUsers);
    };

    // Función para manejar la creación de usuarios
    const handleAddUser = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        try {
            // Llama a la función de la API para agregar el usuario
            const updatedUsers = await addUser({ email: newEmail, password: newPassword });
            setUserList(updatedUsers); // Actualiza la tabla con la nueva lista de usuarios
            setSuccessMessage(`¡Usuario ${newEmail} agregado con éxito!`);
            // Limpia los campos del formulario
            setNewEmail('');
            setNewPassword('');
        } catch (err) {
            setError(err); // Muestra un mensaje si el correo ya existe
        }
    };

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <MainLayout>
            <Heading level={1}>Panel de Administración</Heading>
            <Text>Bienvenido, {user.email}.</Text>

            {/* ▼▼▼ SECCIÓN NUEVA: Formulario para Agregar Usuario ▼▼▼ */}
            <div style={{ marginTop: '30px', background: '#fff', padding: '20px', borderRadius: '8px' }}>
                <Heading level={2}>Agregar Nuevo Usuario</Heading>
                <form onSubmit={handleAddUser} style={{ marginTop: '15px' }}>
                    <FormField 
                        label="Email del Nuevo Usuario" 
                        id="new-email" 
                        type="email" 
                        value={newEmail} 
                        onChange={e => setNewEmail(e.target.value)} 
                    />
                    <FormField 
                        label="Contraseña Temporal" 
                        id="new-password" 
                        type="password" 
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} 
                    />
                    {error && <Text style={{ color: 'red', marginBottom: '10px' }}>{error}</Text>}
                    {successMessage && <Text style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</Text>}
                    <Button type="submit">Agregar Usuario</Button>
                </form>
            </div>

            {/* Tabla para Gestionar Usuarios Existentes */}
            <div style={{ marginTop: '30px', background: '#fff', padding: '20px', borderRadius: '8px' }}>
                <Heading level={2}>Gestionar Usuarios Existentes</Heading>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #333' }}>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Rol</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(u => (
                            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>{u.email}</td>
                                <td style={{ padding: '10px' }}>{u.role}</td>
                                <td style={{ padding: '10px' }}>
                                    <Button variant="secondary" onClick={() => handleDelete(u.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    );
};

export default AdminPage;