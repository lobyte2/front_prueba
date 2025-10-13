// src/components/templates/MainLayout.jsx
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import './MainLayout.css';

// Aquí está el cambio
const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;