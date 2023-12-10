import React from 'react'

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchComponent from './searchComponent'
import './productPage.css'
const ProductPage = () => {

    const [product, setProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [tiendas, setTiendas] = useState([]);

    const location = useLocation();
    const productId = new URLSearchParams(location.search).get('productId');
    const storeId = new URLSearchParams(location.search).get('storeId');
    
    useEffect(() => {

        fetch(`http://localhost:8080/api/v1/${storeId}/products/${productId}`) // Reemplaza con la URL de tu API
          .then(response => response.json())
          .then(data => setProduct(data))
          .catch(error => console.error('Error fetching data:', error));
      
    },[])

    useEffect(() => {
        if (product) {
            fetch(`http://localhost:8080/api/v1/allbyName/${product.nombre}`)
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching data:', error));
                console.log(products)
        }
    }, [product]);
    
    const obtenerTienda = async (idTienda) => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/${idTienda}`);
          const data = await response.json();
          return data; // Retorna los datos de la tienda
        } catch (error) {
          console.error('Error fetching data:', error);
          return null; // Manejar errores, por ejemplo, retornando null
        }
      };
      
      // Hacer fetch para cada idTienda en productos
      const obtenerTiendasDeProductos = async (productos) => {
        const tiendasPromises = productos.map(producto => obtenerTienda(producto.idTienda));
        
        // Ejecutar todas las solicitudes de forma concurrente
        const tiendas = await Promise.all(tiendasPromises);
        setTiendas(tiendas)
        console.log(tiendas); // Aquí tendrás un array con la información de cada tienda
      };
      

      useEffect(() => {
        if (products.length > 0) {
          obtenerTiendasDeProductos(products);
        }
      }, [products]);
      
      const showStore = (storeId) => {
        console.log(storeId)
        window.location.href = `/storePage?storeId=${storeId}`
      }
      


    return (

        <div>
        <div>
          <SearchComponent></SearchComponent>
        </div>
          {product ? (
            <div>
              <div className='product--container'>
                <img src={product.imagen} className='product--image' alt="Producto" />
                <p className='product--name'>Nombre del producto: {product.nombre}</p>
                <p className='product--description'>Descripcion del producto: {product.descripcion}</p>
                <p className='product--price'>Precio: {product.precio}$</p>
              </div>
            </div>
          ) : (
            <p>Cargando...</p>
          )}

        
          <div className='shops--container'>
        <p className='textstore'>Tiendas que venden este producto:</p>
        {tiendas.map((tienda, index) => (
            <div key={index} className='shop--item' onClick={() => showStore(tienda.id)}>
            <div className='container--storename'> 
            <p className='store--name'>Nombre: {tienda.nombre}</p>
            </div>
            <div className='container--storeaddress'>
            <p className='store--adress'>Direccion : {tienda.direccion}</p>
            </div>
            
            {products.map((producto, index) => {
                if (producto.idTienda === tienda.id) {
                    
                return <div className='container--storeprice'>
                <p key={index}>Precio: {producto.precio}</p>
                </div>;
              
                }
                return null;
            })}
            </div>
        ))}
        </div>


        </div>
      );
      
}

export default ProductPage