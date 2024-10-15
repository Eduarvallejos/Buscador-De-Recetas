import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase'; // Importa tu configuración de Firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"; // Importa las funciones necesarias
import './LoginPage.css'

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');// Estado para determinar el modo
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Si está iniciando sesión, llama a signInWithEmailAndPassword
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Usuario autenticado
          navigate('/search'); // Redirigir a la página de búsqueda
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert('No Estas Registrado');
          console.error('Error de inicio de sesión:', errorMessage);
        });
      } else {
        // Si está registrándose, llama a createUserWithEmailAndPassword
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            alert('Usuario registrado');// Usuario registrado
            navigate('/search'); // Redirigir a la página de búsqueda
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.error('Error de registro:', errorMessage);
          });
      }
    };

  return (
    <div className="auth-page"> {/* Encapsula la página aquí */}
      <div className="auth-container">
        <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='button-login' type="submit">{isLogin ? "Iniciar Sesión" : "Registrarse"}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "¿No tienes una cuenta? Regístrate" : "¿Ya tienes una cuenta? Inicia Sesión"}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
