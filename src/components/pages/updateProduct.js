import React, { useState, useEffect } from 'react';
import './form.css';
import { useLocation } from 'react-router-dom';
import TagsBar from './tagsBar'; // Asegúrate de importar el componente TagsBar

const UpdateProduct = () => {
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
  const productId = new URLSearchParams(location.search).get('productId');

  // Función para obtener la información del producto para su actualización
  useEffect(() => {
    const getProductInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/${userId}/products/${productId}`);
        if (response.ok) {
          const productData = await response.json();
          setFormData({
            nombre: productData.nombre,
            precio: productData.precio,
            imagen: productData.imagen,
            descripcion: productData.descripcion,
            etiquetas: productData.etiquetas // Establecer las etiquetas existentes
          });

          console.log(productData)
        } else {
          setErrorMessage('No se pudo obtener la información del producto');
        }
      } catch (error) {
        setErrorMessage('Error al obtener la información del producto');
      }
    };
    
    getProductInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagChange = (selectedOptions) => {
    const formattedTags = selectedOptions.map(tag => ({ value: tag, label: tag }));
    setFormData({ ...formData, etiquetas: formattedTags || [] });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const productData = {
        nombre: formData.nombre,
        precio: formData.precio,
        imagen: formData.imagen,
        descripcion: formData.descripcion,
        etiquetas: formData.etiquetas.map(tag => tag.value) // Obtener solo los valores de las etiquetas
      };
  
      const response = await fetch(`http://localhost:8080/api/v1/${userId}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (response.ok) {
        setSuccessMessage('Producto actualizado satisfactoriamente');
        setErrorMessage('');
        // Redireccionar a la página de usuario después de la actualización exitosa
        window.location.href = "/user";
      } else {
        setErrorMessage('Error al actualizar el producto');
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
      <form onSubmit={handleSubmit}>
        <div className='form--container'>
          <h2 className='form--title'>ACTUALIZAR PRODUCTO</h2>

          <label>
            <h3>Nombre del producto</h3>
            <input
              type='text'
              className='form--nameinput'
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
              value={formData.precio}
              onChange={handleInputChange}
              name='precio'
            />
          </label>

          <label>
            <h3>Caracteristicas del producto</h3>
            <input
              type='text'
              className='form--featuresinput'
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
              value={formData.imagen}
              onChange={handleInputChange}
              name='imagen'
            />
          </label>


          <label>
            <h3>Etiquetas del producto</h3>
            {/* Utilizando el componente TagsBar */}
            <TagsBar onTagChange={handleTagChange} selectedTags={formData.etiquetas} />
          </label>
          <input type='submit' className='form--submitinput' required />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
