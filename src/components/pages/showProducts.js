import React, { useState } from 'react';
import './showProducts.css';
import ProductFetcher from '../ProductFetcher';

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  return (
    <div>
      <ProductFetcher setData={setProducts} />
      <section className="container">
      <article className="product-container">
          <img src="samsung.jpg" className='img' alt="Producto Samsung" />
          <p>Desde:</p>
          <h2>$500.000</h2>
          <h3>Nombre Producto</h3>
        </article>

        <article className="product-container">
          <img src="samsung.jpg" className='img' alt="Producto Samsung" />
          <p>Desde:</p>
          <h2>$500.000</h2>
          <h3>Nombre Producto</h3>
        </article>


        <article className="product-container">
          <img src="samsung.jpg"  className='img' alt="Producto Samsung" />
          <p>Desde:</p>
          <h2>$500.000</h2>
          <h3>Nombre Producto</h3>
        </article>

        {products.map((product) => (
          <article className="product-container" key={product.id}>
            <img src={product.image} className='img' alt={product.title} />
            <p>Desde:</p>
            <h2>${product.price}</h2>
            <h3>{product.title}</h3>
          </article>
        ))}

      </section>
    </div>
  );
};

export default ShowProducts;
