import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    onSearch(query); // Realizar la búsqueda con el término actual
  };

  return (
    <form className="input-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={handleChange}
        
      />
      <FaSearch className='icon-search'/>
    </form>
  );
};

export default SearchBar;