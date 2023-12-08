import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './pages/dropdownMenu.css'

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
  const [userData, setUserData] = useState(null); // Imagen de usuario

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setIsLoggedIn(true);
      setUserData(userData)
      console.log(userData)
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false); // Actualizar estado de autenticación
    handleClose();
  };

  const handleLogin = () => {
    window.location.href = '/login'
    handleClose();
  };

  const handleCrud = () => {
    window.location.href = "/user";
    handleClose();
  };

  return (
    <div>
      {isLoggedIn ? (
        userData ? ( // Mostrar la imagen del usuario si está disponible
          <IconButton onClick={handleMenuClick} size="large">
            <img src={userData.imagen} alt="User" style={{ width: 100, height: 100, borderRadius: '80%' }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleMenuClick} size="large">
            <PersonOutlineIcon sx={{ fontSize: 80 }} />
          </IconButton>
        )
      ) : (
        <PersonOutlineIcon sx={{ fontSize: 80 }} onClick={handleLogin}/>
      )}
      <Menu 
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className='containermenu'
      >
        {isLoggedIn ? (
          <div >
            <p className='containermenu--tiendanombre'>{userData.nombre}</p>
            <MenuItem onClick={handleCrud}>Acceder a gestión</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </div>
        ) : null}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
