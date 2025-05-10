import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './torneo.css';

const Torneos = () => {
  const [torneos, setTorneos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTorneos = JSON.parse(localStorage.getItem('torneos')) || [];
    setTorneos(storedTorneos);
  }, []); // ajusta
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedTorneos = JSON.parse(localStorage.getItem('torneos')) || [];
      setTorneos(updatedTorneos);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); // localStorage

  const irACrearTorneo = () => {
    navigate('/crear');
  };

  const irABuscarTabla = () => {
    navigate('/buscartabla'); //jsx
  };

  return (
    <div className="torneos-container">
      <div className="nav-bar">
        <button onClick={() => navigate('/')} className="nav-button">
          INICIO
        </button>
        <button onClick={() => navigate('/torneo')} className="nav-button">
          MIS TORNEOS
        </button>
      </div>

      <button className="nuevo-torneo" onClick={irACrearTorneo}>
        NUEVO TORNEO
      </button>

      {/* Botón de buscar */}
      <button className="buscar-torneo" onClick={irABuscarTabla}>
        BUSCAR TORNEO
      </button>
    </div>
  );
};

export default Torneos;

