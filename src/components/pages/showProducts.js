import React, { useState } from 'react';
import './showProducts.css';
import ProductFetcher from '../ProductFetcher';

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState(''); // Estado para el diseño actual

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
