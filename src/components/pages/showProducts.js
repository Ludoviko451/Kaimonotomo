import React, { useState } from 'react';
import './showProducts.css';
import ProductFetcher from '../ProductFetcher';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState(''); // Estado para el diseño actual
  const [storeProduct, setStoreProducts] = useState([]);
  const location = useLocation();
  const [productsByTag, setProductsByTag] = useState([]);
  
  
  useEffect(() => {

      fetch(`http://localhost:8080/api/v1/products`) // Reemplaza con la URL de tu API
        .then(response => response.json())
        .then(data => setStoreProducts(data))
        .catch(error => console.error('Error fetching data:', error));
    
  },[])

  
  useEffect(() => {
    // Obtener los parámetros de la URL (en este caso, las etiquetas)
    const searchParams = new URLSearchParams(location.search);
    const tags = searchParams.get('tags');

    // Realizar la búsqueda de productos por etiqueta
    fetch(`http://localhost:8080/api/v1/byTags?tags=${tags}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al buscar productos por etiquetas');
        }
        return response.json();
      })
      .then(data => {
        console.log('Productos por etiquetas:', data);
        setStoreProducts(data);
      })
      .catch(error => {
        console.error('Error al obtener productos por etiquetas:', error);
      });
  }, [location.search]);
  const row = () => {
    setLayout(''); // Cambia al diseño en fila
  };

  const showProduct = (idTienda, productId) => {
    window.location.href = `/productPage?storeId=${idTienda}&productId=${productId}`
  };

  const column = () => {
    setLayout('column'); // Cambia al diseño en columna
  };

  return (
    <div>
      <ProductFetcher setData={setProducts} />
      
      <div className='container--buttons'>
      <button className='buttonColumn' onClick={row}></button>
      <button className='buttonRow' onClick={column}></button>
      </div>

      <section className={`container${layout}`}>

      <article className={`product-container${layout}`}>
          <img src="samsung.jpg" className='img' alt="Producto Samsung" />
          <h3>Nombre Producto</h3>
          <div>
          <p>Desde:</p>
          </div>
          <h2>$500.000</h2>
       
          
          
        </article>

        <article className={`product-container${layout}`}>
          <img src="samsung.jpg" className='img' alt="Producto Samsung" />
          <h3>Nombre Producto</h3>
          <div>
          <p>Desde:</p>
          </div>
          <h2>$500.000</h2>
       
          
          
        </article>


        <article className={`product-container${layout}`}>
          <img src="samsung.jpg"  className='img' alt="Producto Samsung" />
          <h3>Nombre Producto</h3>
          <div>
          <p>Desde:</p>
          </div>
          <h2>$500.000</h2>
       
          
          
        </article>


        {storeProduct.map(product => (
          <article className={`product-container${layout}`} key={product.id} onClick={() => {showProduct(product.idTienda, product.id)}}>
            <img src={product.imagen} className='img' alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>Desde:</p>             
            <h2>${product.precio}</h2>


          </article>
        ))}
        
        {products.map((product) => (
          <article className={`product-container${layout}`} key={product.id}>
            <img src={product.image} className='img' alt={product.title} />

            <h3>{product.title}</h3>
            <p>Desde:</p>             
            <h2>${product.price}</h2>    
          
          </article>
        ))}



      </section>
    </div>
  );
};

export default ShowProducts;
