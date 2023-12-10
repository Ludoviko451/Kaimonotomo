import React, { useState } from 'react';
import Select from 'react-select';
import { Tooltip } from 'react-tooltip';
import './searchComponent.css';
import TagsBar from './tagsBar';
import DropdownMenu from '../dropdownMenu';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleInputChange = newValue => {
    setSearchText(newValue);
    return newValue;
  };

  const redireccionarLogin = () => {
    window.location.href = '/login';
  };

  const handleSearch = () => {
    const trimmedText = searchText.trim();
    const isTagSearch = selectedTags.length > 0;
  
    if (isTagSearch) {
      // Búsqueda por etiquetas
      const tagsArray = selectedTags.map(tag => tag.value);
      fetch(`http://localhost:8080/api/v1/byTags?tags=${tagsArray.join(',')}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al buscar productos por etiquetas');
          }
          return response.json();
        })
        .then(data => {
          console.log('Productos por etiquetas:', data);
          // Haz algo con los productos encontrados por etiquetas
          window.location.href = `/?tags=${tagsArray.join(',')}`;
        })
        .catch(error => {
          console.error('Error al obtener productos por etiquetas:', error);
        });
    } else {
      // Búsqueda por texto
      const text = trimmedText || '';
      
      fetch(`http://localhost:8080/api/v1/byName/${text}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Producto no encontrado');
          }
        })
        .then(data => {
          if (data) {
            // Si se encuentra un producto, redirigir a la página del producto específico
            window.location.href = `/productPage?productId=${data.id}&storeId=${data.idTienda}`;
          } else {
            // Si no se encuentra un producto exacto, realizar búsqueda por coincidencia parcial
            fetch(`http://localhost:8080/api/v1/allbyName/${trimmedText}`)
              .then(response => response.json())
              .then(products => {
                console.log('Resultados de búsqueda parcial:', products);
                window.location.href = `/?text=${trimmedText}`
              })
              .catch(error => {
                console.error('Error al obtener resultados de búsqueda parcial:', error);
              });
          }
        })
        .catch(error => {
          console.error('Error al obtener resultados de búsqueda exacta:', error);
        });
    }
  };
  

  const handleTagChange = selectedOption => {
    setSelectedTags(selectedOption);
  };

  const index = () => {
    window.location.href = "/"
  }

  return (
    <header>
      <div className="search-bar">
        <div className="container--searchbar">
          <img loading="lazy" src="./kaimonotomoicon.png" className="img-2" onClick={() => {index()}}/>
        </div>

        <div className="container--searchbar">
          <div>
            <TagsBar onTagChange={handleTagChange} selectedTags={selectedTags} />
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            className="search-input"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Buscar
          </button>
          <Tooltip id="tagSuggestion" place="bottom" effect="solid">
            <span>Haz clic para buscar esta etiqueta</span>
          </Tooltip>
        </div>

        <div className="container--imagen">
          <DropdownMenu />
        </div>
      </div>
    </header>
  );
};

export default SearchComponent;
