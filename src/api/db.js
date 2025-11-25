const API_BASE_URL = import.meta.env.VITE_API_URL;

// --- Helpers ---

const handleResponse = async (response) => {
    console.log(`[API] Petición a: ${response.url}`);
    console.log(`[API] Status: ${response.status}`);
    
    const text = await response.text();
    console.log(`[API] Respuesta cruda (inicio):`, text.substring(0, 100) + '...'); 

    let data;
    try {
        data = JSON.parse(text);
    } catch (error) {
        console.error('[API Error] No se pudo parsear JSON. Contenido recibido:', text.substring(0, 100) + '...');
        throw new Error(`Error de servidor (Status ${response.status}): ${text.substring(0, 50)}...`);
    }

    if (!response.ok) {
        throw (data.message || data || 'Error desconocido del servidor');
    }
    return data;
};

const getAuthHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            // El header x-user-id es requerido por los microservicios
            headers['x-user-id'] = user.id; 
        }
    } catch (e) {}
    return headers;
};

// --- Productos ---

export const getProducts = () => {
    return fetch(`${API_BASE_URL}/products`).then(handleResponse);
};

export const getProductById = (id) => {
    return fetch(`${API_BASE_URL}/products/${id}`).then(handleResponse);
};

export const addProduct = (productData) => {
    return fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    }).then(handleResponse);
};

export const updateProduct = (id, productData) => {
    return fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(productData),
    }).then(handleResponse);
};

export const deleteProduct = (id) => {
    return fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    }).then(handleResponse);
};

// --- Login / Registro ---
// Nota: Estas rutas deben coincidir con la configuración del router en login-service

export const loginUser = ({ email, password }) => {
    return fetch(`${API_BASE_URL}/login/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
};

export const registerUser = (userData) => {
    return fetch(`${API_BASE_URL}/login/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    }).then(handleResponse);
};

// --- Admin Usuarios ---
// Esta ruta ahora es funcional gracias al proxy en el Gateway

export const getUsers = () => {
    return fetch(`${API_BASE_URL}/users`, {
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const deleteUser = (userId) => {
    return fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const addUser = ({ email, password }) => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
};

// --- Carrito ---
// Rutas corregidas de 'itemlo' a 'items'

export const getCart = () => {
    return fetch(`${API_BASE_URL}/cart`, {
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const addToCartApi = (product) => {
    // RUTA CORREGIDA: Asumiendo que el Cart Service usa /items
    return fetch(`${API_BASE_URL}/cart/items`, { 
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(product)
    }).then(handleResponse);
};

export const removeFromCartApi = (productId) => {
    // RUTA CORREGIDA: Asumiendo que el Cart Service usa /items
    return fetch(`${API_BASE_URL}/cart/items/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const checkoutCart = () => {
    return fetch(`${API_BASE_URL}/cart/checkout`, {
        method: 'POST',
        headers: getAuthHeaders(),
    }).then(handleResponse);
};

// --- Blog ---

export const getBlogPosts = () => {
    return fetch(`${API_BASE_URL}/blog/posteos`).then(handleResponse);
};

// --- Utilidad ---

export function money(x) {
  return Intl.NumberFormat("es-CL", { 
    style: "currency", 
    currency: "CLP",
    minimumFractionDigits: 0
  }).format(x);
}