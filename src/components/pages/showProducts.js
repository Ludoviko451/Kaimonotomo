import React, { useState } from 'react';
import './showProducts.css';
import ProductFetcher from '../ProductFetcher';
import { useEffect } from 'react';
const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState(''); // Estado para el diseño actual
  const [productsWithStores, setProductsWithStores] = useState([]);

  useEffect(() => {
    // Realiza la solicitud a la API para obtener los datos de las tiendas y los productos
    fetch('http://localhost:8080/api/v1/users')
      .then(response => response.json())
      .then(data => {
        // Mapea cada tienda y sus productos correspondientes
        const productsMappedWithStores = data.reduce((acc, store) => {
          if (store.productos) {
            const productsWithStoreInfo = store.productos.map(product => ({
              ...product,
              vendidoPor: store.nombre, // Agrega el nombre de la tienda como "vendido por"
            }));
            return [...acc, ...productsWithStoreInfo];
          }
          return acc;
        }, []);
        setProductsWithStores(productsMappedWithStores);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const row = () => {
    setLayout(''); // Cambia al diseño en fila
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

        {productsWithStores.map(product => (
          <article className={`product-container${layout}`} key={product.id}>
            <img src={product.imagen} className='img' alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>Desde:</p>             
            <h2>${product.precio}</h2>
            <p>Vendido por: {product.vendidoPor}</p>    

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
