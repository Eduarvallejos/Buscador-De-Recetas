// components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { signOut } from "../firebase/firebase/auth";
import './ProtectedLayout.css';

function ProtectedLayout({children}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/'); // Redirigir a la página de inicio de sesión
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error);
      });
  };

  return(
    <div className='protected-layout'>
        <button className='logout-button' onClick={handleLogout}>Cerrar Sesion</button>
        <div className='protected-content'>{children}</div>
    </div>
  );
}

export default ProtectedLayout;
