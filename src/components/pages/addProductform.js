import React from 'react'

import './form.css'
const addProductform = () => {
    
  return (
    <div>
        <form action="/api/tiendas" method="post">
            <div className='form--container'>
            <h2 className='form--title'>AGREGAR PRODUCTO</h2>


            <label>
                <h3>Nombre del producto</h3>
                <input type='text' className='form--nameinput' required></input>
            </label>

            <label>
                <h3>Precio del producto</h3>
                <input type='number' className='form--priceinput' required></input>
            </label>

            <label>
                <h3>Caracteristicas del producto</h3>
                <input type='text' className='form--featuresinput' required></input>
            </label>

            <label>
            <h3>Imagen del producto</h3>
                <div className='file'>
                <span>SUBIR</span>
                <input type='file' className='form--photoinput' required></input>
                </div>
            </label>
   
            <input type='submit' className='form--submitinput' required></input>
         

            </div>



        </form>
    </div>
  )
}

export default addProductform