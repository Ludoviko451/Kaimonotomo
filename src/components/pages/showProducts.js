import React, { useState } from 'react';
import './showProducts.css';
import ProductFetcher from '../ProductFetcher';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState(''); // Estado para el diseño actual
  const [storeProduct, setStoreProducts] = useState([]);
  const location = useLocation();
  const [productsByTag, setProductsByTag] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  
  
  useEffect(() => {
    // Obtener los parámetros de la URL (en este caso, las etiquetas)
    const searchParams = new URLSearchParams(location.search);
    const tags = searchParams.get('tags');
    const text = searchParams.get('text')
  
    if (!tags &  !text) {
      // Si no hay etiquetas, cargar todos los productos
      fetch(`http://localhost:8080/api/v1/products`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar todos los productos');
          }
          return response.json();
        })
        .then(data => {
          console.log('Todos los productos:', data);
          setStoreProducts(data);
        })
        .catch(error => {
          console.error('Error al obtener todos los productos:', error);
        });
    } else if (!text) {
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
    }
    else {
      fetch(`http://localhost:8080/api/v1/allbyName/${text}`)
          .then(response => response.json())
          .then(products => {
            console.log('Resultados de búsqueda parcial:', products);
            
            setStoreProducts(products)
    });
}
  }, [location.search]);
  
 
  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  };

  const sortedProducts = [...storeProduct].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.precio - b.precio;
    } else {
      return b.precio - a.precio;
    }
  });

  const showProduct = (idTienda, productId) => {
    window.location.href = `/productPage?storeId=${idTienda}&productId=${productId}`;
  };

  const row = () => {
    setLayout('');
  };

  const column = () => {
    setLayout('column');
  };

  return (
    <div>
      <ProductFetcher setData={setProducts} />
          
      <div className='container--buttons'>
      <button className='buttonColumn' onClick={row}></button>
      <button className='buttonRow' onClick={column}></button>
      <button onClick={toggleSortOrder} className='buttonSort'>
        {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </button>
      </div>



      <section className={`container${layout}`}>
        {sortedProducts.map((product) => (
          <article
            className={`product-container${layout}`}
            key={product.id}
            onClick={() => {
              showProduct(product.idTienda, product.id);
            }}
          >
            <img src={product.imagen} className='img' alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>Desde:</p>
            <h2>${product.precio}</h2>
          </article>
        ))}
      </section>
    </div>
  );
};

export default ShowProducts;