import React, { useEffect, useState } from 'react';
import './user.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    
    const fetchData = async () => {
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        const userId = parsedUserData.id;

        try {
          const response = await fetch(`http://localhost:8080/api/v1/${userId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const userDataFromApi = await response.json();
          setUserData(userDataFromApi);
        } catch (error) {
          console.error('Hubo un problema al obtener los datos del usuario desde la API:', error);
        }
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.reload();
    window.location.href = "/";

  
  };

  const addProduct = () => {
    window.location.href = `/addproduct?userId=${userData.id}`;
  };

  const updateProduct = (productId) => {

    window.location.href = `/updateProduct?userId=${userData.id}&productId=${productId}`;

  }

  const deleteProduct = (id, idUser) => {
    fetch(`http://localhost:8080/api/v1/users/${idUser}/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(`El producto con ID ${id} ha sido eliminado correctamente`);
        // Actualizar el estado local después de eliminar el producto
        const updatedProducts = userData.productos.filter((producto) => producto.id !== id);
        setUserData({
          ...userData,
          productos: updatedProducts,
        });
      })
      .catch((error) => {
        console.error('Hubo un problema al eliminar el producto:', error);
      });
  };

  return (
    <div>
      <button className="cerrarsesion" onClick={handleLogout}>Cerrar Sesión</button>
      <div className='contenedor'></div>
      {userData ? (
        <div>
          <div className='containertitle'>
            <h2>Perfil de Usuario</h2>
            <p>ID: {userData.id}</p>
            <p>Nombre: {userData.nombre}</p>
          </div>
          <div className='container'>
            <article className='userproduct-container' onClick={addProduct}>
              <h1 className='plus'>+</h1>
            </article>
            {userData.productos && userData.productos.length > 0 ? (
              userData.productos.map((producto) => (
                <article className='userproduct-container' key={producto.id}>
                  <h2 className='product-name'>{producto.nombre}</h2>
                  <h3 className='product-price'>{producto.precio}$</h3>
                  <h3 className='product-description'>{producto.descripcion}</h3>
                  <img className="product-image" src={producto.imagen} alt={producto.nombre} />
                  <div className='button-container'>
                  <button className="deleteButton" onClick={() => deleteProduct(producto.id, userData.id)}>Eliminar</button>
                  <button className='updateButton' onClick={() => updateProduct(producto.id)}>Actualizar</button>
                  </div>
                </article>
              ))
            ) : (
              <p>No hay productos</p>
            )}
          </div>
        </div>
      ) : (
        <p>No se han encontrado datos del usuario.</p>
      )}
    </div>
  );
};

export default UserProfile;
