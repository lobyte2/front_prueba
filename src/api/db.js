// src/api/db.js

const products = [
    { id: 1, name: "Control Xbox", price: 59000, image: "/img/xbox.webp", description: "Control inalámbrico de Xbox con diseño ergonómico y vibración háptica." },
    { id: 2, name: "Auriculares Logitech", price: 60000, image: "/img/logi.jpeg", description: "Auriculares Logitech con micrófono incorporado y sonido envolvente." },
    { id: 3, name: "Escritorio Cougar", price: 150000, image: "/img/cougar.avif", description: "Escritorio gamer Cougar con superficie amplia y soporte para accesorios." },
    { id: 4, name: "Teclado HyperX", price: 49990, image: "/img/teclado.jpg", description: "Teclado mecánico HyperX con retroiluminación RGB y switches precisos." },
    { id: 5, name: "Mouse Glorious", price: 24990, image: "/img/glorious.jpg", description: "Mouse Glorious ultraligero con sensor de alta precisión y diseño perforado." },
    { id: 6, name: "Monitor 24\"", price: 159990, image: "/img/monitor.jpg", description: "Monitor de 24 pulgadas Full HD con alta tasa de refresco y bordes delgados." },
    { id: 7, name: "Silla Gamer", price: 89990, image: "/img/silla.jpg", description: "Silla gamer ergonómica con soporte lumbar y ajuste de altura reclinable." },
];

// Da formato de peso chileno a un número, sin decimales.
export function money(x) {
  return Intl.NumberFormat("es-CL", { 
    style: "currency", 
    currency: "CLP",
    minimumFractionDigits: 0
  }).format(x);
}

let users = [
    { id: 1, email: 'roro@duoc.cl', password: 'admin', role: 'admin', fullName: 'Admin Roro', phone: 'N/A', region: 'N/A' },
    { id: 2, email: 'user@test.com', password: 'user123', role: 'user', fullName: 'Usuario Test', phone: '987654321', region: 'Los Lagos' },
];

// --- Funciones de Productos ---
export const getProducts = () => new Promise(resolve => setTimeout(() => resolve(products), 200));
export const getProductById = (id) => new Promise(resolve => setTimeout(() => resolve(products.find(p => p.id === parseInt(id))), 200));

// Agrega un nuevo producto a la lista.
export const addProduct = (productData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newProduct = {
                id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                name: productData.name,
                price: parseFloat(productData.price),
                image: productData.image,
                description: productData.description,
            };
            products.push(newProduct);
            resolve([...products]);
        }, 300);
    });
};

// --- Funciones de Autenticación (Login y Registro) ---
export const loginUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!password || password.length < 5 || password.length > 15) {
                return reject('La contraseña debe tener entre 5 y 15 caracteres');
            }
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                resolve({ id: user.id, email: user.email, role: user.role });
            } else {
                reject('Credenciales inválidas');
            }
        }, 500);
    });
};

export const registerUser = (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const { email, password, fullName, phone, region } = userData;
            if (!password || password.length < 5 || password.length > 15) {
                return reject('La contraseña debe tener entre 5 y 15 caracteres');
            }
            if (users.some(u => u.email === email)) {
                return reject('El correo ya está registrado');
            }
            const newUser = {
                id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                email, password, role: 'user', fullName,
                phone: phone || 'No especificado', region,
            };
            users.push(newUser);
            resolve({ id: newUser.id, email: newUser.email, role: newUser.role });
        }, 500);
    });
};

// --- Funciones del Administrador ---
export const getUsers = () => new Promise(resolve => setTimeout(() => resolve(users), 200));
export const deleteUser = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            users = users.filter(u => u.id !== userId);
            resolve(users);
        }, 300);
    });
};
export const addUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!password || password.length < 5 || password.length > 15) {
                return reject('La contraseña debe tener entre 5 y 15 caracteres');
            }
            if (users.some(u => u.email === email)) {
                return reject('El correo ya existe');
            }
            const newUser = {
                id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                email, password, role: 'user', fullName: 'Nuevo Usuario',
                phone: 'N/A', region: 'N/A'
            };
            users.push(newUser);
            resolve(users);
        }, 300);
    });
};