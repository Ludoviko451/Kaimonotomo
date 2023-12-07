import React, { useState } from 'react';
import Select from 'react-select';
import { Tooltip } from 'react-tooltip';
import './searchComponent.css'
const SearchComponent = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchText, setSearchText] = useState('');
  const tagsOptions = [
    { value: 'monitor', label: 'Monitor' },
    { value: 'audio', label: 'Audio' },
    // Otras opciones de etiquetas disponibles
  ];

  const handleTagChange = selectedOption => {
    setSelectedTags(selectedOption);
  };

  const handleInputChange = newValue => {
    setSearchText(newValue);
    return newValue;
  };

  const redireccionarLogin = () => {

    window.location.href = "/login"
  }


  const handleSearch = () => {
    const text = searchText || '';
  
    fetch(`http://localhost:8080/api/v1/byName/${text}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        return response.json();
      })
      .then(data => {
        console.log("Response Data:", data);

        window.location.href = `/productPage?productId=${data.id}&storeId=${data.idTienda}`
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  
  


  return (
    <header>
      <div className='search-bar'>
        <div className='container--searchbar'>
        <img loading="lazy" srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353& "className="img-2" />

        </div>

        <div className='container--searchbar'>
        <Select
            isMulti
            options={tagsOptions}
            value={selectedTags}
            onChange={handleTagChange}
            placeholder="Selecciona o busca etiquetas..."
          />
          <input
            type="text"
            placeholder="Buscar..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>Buscar</button>
          <Tooltip id='tagSuggestion' place="bottom" effect="solid">
            <span>Haz clic para buscar esta etiqueta</span>
          </Tooltip>
        </div>
        <div className='container--imagen'>
          <img loading="lazy" onClick={redireccionarLogin} src="https://cdn.builder.io/api/v1/image/assets/TEMP/c92e6091-cb14-4592-8436-d43333f112e7?apiKey=65389d7fce93477e9980a2b2c102c353&" className="img-4" />
        </div>
      </div>
    </header>
  )
}

export default SearchComponent;
