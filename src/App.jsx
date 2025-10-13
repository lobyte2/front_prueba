// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage.jsx';
import ProductsPage from './components/pages/ProductsPage.jsx';
import ProductDetailPage from './components/pages/ProductDetailPage.jsx';
import CartPage from './components/pages/CartPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import AdminPage from './components/pages/AdminPage.jsx';
// ¡Asegúrate de importar las otras páginas cuando las crees!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;