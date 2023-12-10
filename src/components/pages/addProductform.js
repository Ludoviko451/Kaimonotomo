import React, { useState } from 'react';
import './form.css';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import TagsBar from './tagsBar';
const AddProductform = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: '',
    etiquetas: [] // Campo para almacenar las etiquetas seleccionadas
  });

  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagChange = (selectedOptions) => {
    setFormData({ ...formData, etiquetas: selectedOptions || [] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        etiquetas: formData.etiquetas.map(tag => tag.value),
      };

      console.log(productData);

      const response = await fetch(`http://localhost:8080/api/v1/${userId}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        setSuccessMessage('Producto agregado satisfactoriamente');
        setFormData({ nombre: '', precio: '', imagen: '', descripcion: '', etiquetas: [] });
        setErrorMessage('');
        window.location.href = "/user"
      } else {
        setErrorMessage('Error al agregar el objeto');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error al enviar la solicitud');
      setSuccessMessage('');
    }
  };



  return (
    <div>
      {successMessage && <div className="message">{successMessage}</div>}
      {errorMessage && <div className="message">{errorMessage}</div>}
      <form action="/api/tiendas" method="post" onSubmit={handleSubmit}>
        <div className='form--container'>
          <h2 className='form--title'>AGREGAR PRODUCTO</h2>

          {/* Resto de los campos del formulario */}
          <label>
            <h3>Nombre del producto</h3>
            <input
              type='text'
              className='form--nameinput'
              required
              value={formData.nombre}
              onChange={handleInputChange}
              name='nombre'
            />
          </label>

          <label>
            <h3>Precio del producto</h3>
            <input
              type='number'
              className='form--priceinput'
              required
              value={formData.precio}
              onChange={handleInputChange}
              name='precio'
            />
          </label>

          <label>
            <h3>Características del producto</h3>
            <textarea
              className='form--featuresinput'
              required
              value={formData.descripcion}
              onChange={handleInputChange}
              name='descripcion'
            />
          </label>

          <label>
            <h3>Imagen del producto</h3>
            <input
              type='text'
              className='form--nameinput'
              required
              value={formData.imagen}
              onChange={handleInputChange}
              name='imagen'
            />
          </label>


            <label>
            <h3>Etiquetas del producto</h3>
            {/* Utilizando el componente TagsBar */}
            <TagsBar onTagChange={handleTagChange} selectedTags={formData.tags} />
          </label>

        

          <input type='submit' className='form--submitinput' required />
        </div>
      </form>
    </div>
  );
};

export default AddProductform;
