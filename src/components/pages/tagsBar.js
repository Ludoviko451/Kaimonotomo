import React, { useState } from 'react';
import Select from 'react-select';
import './tagsBar.css';

const TagsBar = ({ onTagChange, selectedTags }) => {
  const tagsOptions = [
    { value: 'monitor', label: 'Monitor' },
    { value: 'audio', label: 'Audio' },
    { value: 'usb', label: 'Usb' },
    { value: 'almacenamiento', label: 'Almacenamiento' },
    { value: 'logitech', label: 'Logitech' },
    { value: 'nvidia', label: 'Nvidia' },
    { value: 'audio', label: 'Sonido' },
    { value: 'mouse', label: 'Raton' },
    { value: 'mouse', label: 'Mouse' },
    { value: 'audifonos', label: 'Audifonos' },
    { value: 'computadoras', label: 'Computadoras' },
    { value: 'laptops', label: 'Laptops' },
    { value: 'tablets', label: 'Tablets' },
    { value: 'monitores', label: 'Monitores' },
    { value: 'teclados', label: 'Teclados' },
    { value: 'ratones', label: 'Ratones' },
    { value: 'impresoras', label: 'Impresoras' },
    { value: 'auriculares', label: 'Auriculares' },
    { value: 'altavoces', label: 'Altavoces' },
    { value: 'cámaras', label: 'Cámaras' },
    { value: 'proyectores', label: 'Proyectores' },
    { value: 'memoria-usb', label: 'Memoria USB' },
    { value: 'discos-duros', label: 'Discos Duros' },
    { value: 'tarjetas-gráficas', label: 'Tarjetas Gráficas' },
    { value: 'procesadores', label: 'Procesadores' },
    { value: 'móviles', label: 'Móviles' },
    { value: 'accesorios-gaming', label: 'Accesorios Gaming' },
    { value: 'cámaras-vigilancia', label: 'Cámaras de Vigilancia' },
    { value: 'domótica', label: 'Domótica' },
    { value: 'cables', label: 'Cables' },
  ];


  const handleTagChange = (selectedOption) => {
    if (onTagChange) {
      onTagChange(selectedOption);
    }
  };

  return (
    <div>
      <label className='tags--container'>
        <Select
          className='tags--select'
          isMulti
          options={tagsOptions}
          value={selectedTags}
          onChange={handleTagChange}
          placeholder="Selecciona o busca etiquetas..."
        />
      </label>
    </div>
  );
};

export default TagsBar;
