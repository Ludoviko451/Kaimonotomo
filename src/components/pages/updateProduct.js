import React, { useState } from 'react';
import './form.css';
import { useLocation } from 'react-router-dom';

const UpdateProduct = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: ''
  });

  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');
  const productId = new URLSearchParams(location.search).get('productId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {};

      // Verificar y agregar los campos que tienen valores
      if (formData.nombre.trim() !== '') {
        updatedFormData.nombre = formData.nombre;
      }
      if (formData.precio.trim() !== '') {
        updatedFormData.precio = formData.precio;
      }
      if (formData.descripcion.trim() !== '') {
        updatedFormData.descripcion = formData.descripcion;
      }
      if (formData.imagen.trim() !== '') {
        updatedFormData.imagen = formData.imagen;
      }

      const response = await fetch(`http://localhost:8080/api/v1/${userId}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        setSuccessMessage('Producto actualizado satisfactoriamente');
        setFormData({ nombre: '', precio: '', imagen: '', descripcion: '' });
        setErrorMessage('');
        window.location.href = "/user";
      } else {
        setErrorMessage('Error al actualizar el objeto');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error al enviar la solicitud');
      setSuccessMessage('');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {successMessage && <div className="message">{successMessage}</div>}
      {errorMessage && <div className="message">{errorMessage}</div>}
      <form action="/api/tiendas" method="post" onSubmit={handleSubmit}>
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

          <input type='submit' className='form--submitinput' required />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
