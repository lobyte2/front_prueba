// La URL de mi portal (Gateway)
// REVERTIMOS A USAR LA VARIABLE DE ENTORNO VITE_API_URL
const API_BASE_URL = import.meta.env.VITE_API_URL; 

// --- Helpers ---

// Helper para manejar la respuesta del fetch
const handleResponse = async (response) => {
    // LOG DE DEPURACIÓN
    console.log(`[API] Petición a: ${response.url}`);
    console.log(`[API] Status: ${response.status}`);
    
    // Leemos el texto completo para el diagnóstico
    const text = await response.text();
    console.log(`[API] Respuesta cruda (inicio):`, text.substring(0, 100) + '...'); 

    let data;
    try {
        data = JSON.parse(text);
    } catch (error) {
        // El servidor NO respondió JSON (probablemente HTML de 404)
        console.error('[API Error] No se pudo parsear JSON. Contenido recibido:', text.substring(0, 100) + '...');
        // Arroja un error claro
        throw new Error(`Error de servidor (Status ${response.status}): ${text.substring(0, 50)}...`);
    }

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
    // AHORA API_BASE_URL DEBE SER EL VALOR COMPLETO DE LA VARIABLE DE VERCEL
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

// Nuevas funciones: Editar y Eliminar Producto
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
        headers: getAuthHeaders(),
    }).then(handleResponse);
};

// --- Login / Registro (login-service) ---

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

// --- Admin Usuarios (user-service) ---

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

// --- Carrito (cart-service) ---

export const getCart = () => {
    return fetch(`${API_BASE_URL}/cart`, {
        headers: getAuthHeaders()
    }).then(handleResponse);
};

export const addToCartApi = (product) => {
    return fetch(`${API_BASE_URL}/cart/itemlo`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(product)
    }).then(handleResponse);
};

export const removeFromCartApi = (productId) => {
    return fetch(`${API_BASE_URL}/cart/itemlo/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    }).then(handleResponse);
};

// Nueva función: Finalizar Compra
export const checkoutCart = () => {
    return fetch(`${API_BASE_URL}/cart/checkout`, {
        method: 'POST',
        headers: getAuthHeaders(),
    }).then(handleResponse);
};

// --- Blog (blog-service) ---

export const getBlogPosts = () => {
    return fetch(`${API_BASE_URL}/blog/posteos`).then(handleResponse);
};

// --- Utilidad (Local) ---

export function money(x) {
  return Intl.NumberFormat("es-CL", { 
    style: "currency", 
    currency: "CLP",
    minimumFractionDigits: 0
  }).format(x);
}