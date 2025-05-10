import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

function Register() {
  const [datos, setDatos] = useState({
    usuario: '',
    nombre: '',
    gmail: '',
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
    setMensaje('Registrando...');

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      const result = await response.json();

      if (response.ok) {
        setMensaje('¡Registro exitoso!');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMensaje(result.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de conexión');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>REGISTRO</h1>
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
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={datos.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="gmail"
            placeholder="Email"
            value={datos.gmail}
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
          <button type="submit">REGISTRARSE</button>
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

export default Register;

