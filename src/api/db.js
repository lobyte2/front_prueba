// La URL de mi portal (Gateway)
const API_URL = 'http://localhost:3000/api';

// --- Helpers ---

// Helper para manejar la respuesta del fetch
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw (data.message || data || 'Error desconocido del servidor');
    }
    return data;
};

// Helper para mandar el ID del usuario (para el carrito)
const getAuthHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            headers['x-user-id'] = user.id;
        }
    } catch (e) {
        // No hacer nada si falla
    }
    return headers;
};

// --- Productos (product-service) ---

export const getProducts = () => {
    return fetch(`${API_URL}/products`).then(handleResponse);
};

export const getProductById = (id) => {
    return fetch(`${API_URL}/products/${id}`).then(handleResponse);
};

export const addProduct = (productData) => {
    return fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    }).then(handleResponse);
};

// Nuevas funciones: Editar y Eliminar Producto
export const updateProduct = (id, productData) => {
    return fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    }).then(handleResponse);
};

export const deleteProduct = (id) => {
    return fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    }).then(handleResponse);
};

// --- Login / Registro (login-service) ---

export const loginUser = ({ email, password }) => {
    return fetch(`${API_URL}/login/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
};

export const registerUser = (userData) => {
    return fetch(`${API_URL}/login/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    }).then(handleResponse);
};

// --- Admin Usuarios (user-service) ---

export const getUsers = () => {
    return fetch(`${API_URL}/users`, {
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const deleteUser = (userId) => {
    return fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const addUser = ({ email, password }) => {
    return fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
};

// --- Carrito (cart-service) ---

export const getCart = () => {
    return fetch(`${API_URL}/cart`, {
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const addToCartApi = (product) => {
    return fetch(`${API_URL}/cart/itemlo`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(product)
    }).then(handleResponse);
};

export const removeFromCartApi = (productId) => {
    return fetch(`${API_URL}/cart/itemlo/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    }).then(handleResponse);
};

// Nueva función: Finalizar Compra
export const checkoutCart = () => {
    return fetch(`${API_URL}/cart/checkout`, {
        method: 'POST',
        headers: getAuthHeaders(),
    }).then(handleResponse);
};

// --- Blog (blog-service) ---

export const getBlogPosts = () => {
    return fetch(`${API_URL}/blog/posteos`).then(handleResponse);
};

// --- Utilidad (Local) ---

export function money(x) {
  return Intl.NumberFormat("es-CL", { 
    style: "currency", 
    currency: "CLP",
    minimumFractionDigits: 0
  }).format(x);
}