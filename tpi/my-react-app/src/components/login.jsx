import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [datos, setDatos] = useState({
    usuario: '',
    contraseña: '',
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('Verificando...');

    try {
      const response = await fetch('http://localhost:3001/login', { //pos
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      const result = await response.json();

      if (response.ok) {
        setMensaje('¡Login exitoso!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMensaje(result.message || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de conexión');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={datos.usuario}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={datos.contraseña}
            onChange={handleChange}
            required
          />
          <button type="submit">INICIAR SESIÓN</button>
        </form>
        {mensaje && (
          <div
            style={{
              color: mensaje.includes('exitoso') ? 'green' : 'red',
              marginTop: '10px',
            }}
          >
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
