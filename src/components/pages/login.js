import React, { useState } from 'react';
import axios from 'axios';
import './form.css';
import { useEffect } from 'react';
const Login = () => {
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', {
        id: id,
      });

      if (response.status === 200) {
        localStorage.setItem('userData', JSON.stringify(response.data));
        setErrorMessage('INICIO DE SESION EXITOSO');
        

        console.log('Login exitoso'); // Aquí puedes redirigir a otra página o realizar otras acciones
     
        window.location.href = "/user"
      }
    } catch (error) {
      setErrorMessage('Credenciales inválidas');
      console.error('Error de inicio de sesión:', error);
    }
  };

  const addTienda = () => {
    
    window.location.href = "/addTienda"
  }

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      // Si hay datos de usuario en el almacenamiento local, redirige a la página de usuario
      window.location.href = '/user';
    }
  }, []);
  
  return (
    <div>
      {errorMessage && <div className="message">{errorMessage}</div>}
      <form    className='form--container' onSubmit={handleLogin}>
        <label>
          <h3>Ingrese su ID</h3>
          <input
            type='text'
            value={id}
            className='form--idinput'
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
        <input type='submit' className='form--submitinput' value='Iniciar Sesión' />
        <button className='form--crearcuenta' onClick={() => addTienda()}>Crear Cuenta</button>
      </form>
    </div>
  );
};

export default Login;
