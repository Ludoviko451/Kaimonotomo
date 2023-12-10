import React from 'react'
import './storePage.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchComponent from './searchComponent'
const StorePage = () => {

    const [tienda, setTienda] = useState(null)
    const [storeProducts, setstoreProducts] = useState([])

    const location = useLocation();
    const storeId = new URLSearchParams(location.search).get('storeId');
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/${storeId}`)
          .then(response => {
            if (!response.ok) {
              if (response.status === 500) {
                throw new Error('Error interno del servidor');
              } else if (response.status === 404) {
                throw new Error('No existe esta tienda');
              } else {
                throw new Error('Error desconocido al obtener la tienda');
              }
            }
            return response.json();
          })
          .then(data => setTienda(data))
          .catch(error => {
            console.error('Error fetching data:', error);
            setTienda(null); // Establecer tienda como null para indicar que no existe
          });
    }, []);
    
    useEffect(() => {
        if (tienda && tienda.id) {
            fetch(`http://localhost:8080/api/v1/${tienda.id}/products`)
              .then(response => response.json())
              .then(data => {
                setstoreProducts(data);
                console.log(data); // Agregar este console.log para verificar los datos de los productos
              })
              .catch(error => console.error('Error fetching data:', error));
        }
    }, [tienda])

    const showProduct = (productId, idTienda) => {
      window.location.href = `/productPage?storeId=${idTienda}&productId=${productId}`
    };

  return (
    <div>
        <div>
          <SearchComponent></SearchComponent>
        </div>
        <div>
        {tienda ? (
            <div className='storecontainer'>
            <img className='storecontainer--img' alt='storeimage' src={tienda.imagen}></img>
            <p className='storecontainer--name'>{tienda.nombre}</p>
            <p className='storecontainer--address'>{tienda.direccion}/ {tienda.celular}</p>
            <p className='storecontainer--email'>{tienda.paginaWeb}</p>
        </div>
        ) : (
            <p>No existe esta tienda</p>
            
        )}      
        </div>

        <div className='storeproducts'>
        {storeProducts.length > 0 ? (
        storeProducts.map((product, index) => (
            <div className='itemproduct' key={index}>
                <p>{product.nombre}</p>
                <img src={product.imagen} alt={product.nombre} className='imgproduct' onClick={() => {showProduct(product.id, tienda.id)}} />
            </div>
        ))
        ) : (
            <p>No hay productos</p>
        )}


            </div>
     
    
    </div>
  )
}

export default StorePage