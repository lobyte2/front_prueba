// src/components/2-molecules/SearchForm.jsx
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de búsqueda aquí
    alert("Buscando...");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
      <Input type="search" placeholder="Buscar periféricos..." />
      <Button type="submit" variant="primary">Buscar</Button>
    </form>
  );
};

export default SearchForm;