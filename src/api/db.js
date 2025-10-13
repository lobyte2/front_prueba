// src/api/db.js

const products = [
    { id: 1, name: 'Roro Viper Ultimate', category: 'Mouse', price: 79.99, stock: 50, image: 'https://via.placeholder.com/400x300.png?text=Roro+Viper', description: 'Mouse inalámbrico ultraligero para gaming con sensor óptico de alta precisión.' },
    { id: 2, name: 'Roro BlackWidow V4', category: 'Keyboard', price: 169.99, stock: 30, image: 'https://via.placeholder.com/400x300.png?text=Roro+Keyboard', description: 'Teclado mecánico con switches personalizables y retroiluminación RGB.' },
    { id: 3, name: 'Roro Kraken V3', category: 'Headset', price: 99.99, stock: 45, image: 'https://via.placeholder.com/400x300.png?text=Roro+Headset', description: 'Auriculares con sonido envolvente 7.1 y micrófono con cancelación de ruido.' },
    { id: 4, name: 'Roro Goliathus', category: 'Mousepad', price: 29.99, stock: 100, image: 'https://via.placeholder.com/400x300.png?text=Roro+Mousepad', description: 'Alfombrilla de tela optimizada para todo tipo de sensores y sensibilidades.' },
    { id: 5, name: 'Roro Kiyo Pro', category: 'Webcam', price: 199.99, stock: 20, image: 'https://via.placeholder.com/400x300.png?text=Roro+Webcam', description: 'Webcam profesional con sensor de luz adaptable para streaming en alta definición.' },
    { id: 6, name: 'Roro Huntsman Mini', category: 'Keyboard', price: 119.99, stock: 60, image: 'https://via.placeholder.com/400x300.png?text=Roro+Huntsman', description: 'Teclado 60% con switches ópticos para una respuesta ultrarrápida.' },
    { id: 7, name: 'Roro DeathAdder V2', category: 'Mouse', price: 69.99, stock: 80, image: 'https://via.placeholder.com/400x300.png?text=Roro+DeathAdder', description: 'Diseño ergonómico icónico, ahora mejorado con un sensor de 20K DPI.' },
    { id: 8, name: 'Roro Seiren Mini', category: 'Microphone', price: 49.99, stock: 70, image: 'https://via.placeholder.com/400x300.png?text=Roro+Seiren', description: 'Micrófono de condensador ultracompacto, ideal para streaming y podcasting.' },
    { id: 9, name: 'Roro Iskur', category: 'Chair', price: 499.99, stock: 15, image: 'https://via.placeholder.com/400x300.png?text=Roro+Iskur', description: 'Silla gaming ergonómica con soporte lumbar integrado.' },
    { id: 10, name: 'Roro Blade 15', category: 'Laptop', price: 2199.99, stock: 10, image: 'https://via.placeholder.com/400x300.png?text=Roro+Blade+15', description: 'Portátil gaming con pantalla de alta tasa de refresco y gráficos de última generación.' }
];

let users = [
    { id: 1, email: 'roro@duoc.cl', password: 'admin', role: 'admin' },
    { id: 2, email: 'user@test.com', password: 'user123', role: 'user' },
];

// --- Product Functions ---
export const getProducts = () => new Promise(resolve => setTimeout(() => resolve(products), 200));
export const getProductById = (id) => new Promise(resolve => setTimeout(() => resolve(products.find(p => p.id === parseInt(id))), 200));

// --- Auth Functions ---
export const loginUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                resolve({ id: user.id, email: user.email, role: user.role });
            } else {
                reject('Credenciales inválidas');
            }
        }, 500);
    });
};

export const registerUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (users.some(u => u.email === email)) {
                reject('El correo ya está registrado');
            } else {
                const newUser = { id: users.length + 1, email, password, role: 'user' };
                users.push(newUser);
                resolve({ id: newUser.id, email: newUser.email, role: newUser.role });
            }
        }, 500);
    });
};

// --- Admin Functions ---
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
            if (users.some(u => u.email === email)) {
                reject('El correo ya existe');
            } else {
                const newUser = {
                    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
                    email,
                    password,
                    role: 'user' // Los admins solo pueden crear usuarios normales
                };
                users.push(newUser);
                resolve(users); // Devuelve la lista de usuarios actualizada
            }
        }, 300);
    });
};