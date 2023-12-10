import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductsbyTag = () => {
  const location = useLocation();
  const [productsByTag, setProductsByTag] = useState([]);

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
        setProductsByTag(data);
      })
      .catch(error => {
        console.error('Error al obtener productos por etiquetas:', error);
      });
  }, [location.search]);

  return (
    <div>
      <h1>Productos por etiqueta</h1>
      <div>
        {productsByTag.map(product => (
          <div key={product.id}>
            <h3>{product.nombre}</h3>
            {/* Mostrar otros detalles del producto */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsbyTag;
