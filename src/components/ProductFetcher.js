import React, { useState, useEffect } from 'react';

const ProductFetcher = ({ setData }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const productsData = await response.json();
        setData(productsData);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    fetchData();
  }, [setData]);

  return null; // Este componente no renderiza nada directamente
};

export default ProductFetcher;
