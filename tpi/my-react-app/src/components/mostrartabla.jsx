import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./mostrartabla.css";

const MostrarTabla = () => {
  const { state } = useLocation();
  const { tabla } = state || {}; // dis
  const navigate = useNavigate();

  if (!tabla) {
    return <div>No se encontró la tabla de posiciones</div>;
  }

  const handleAgregarJornada = () => {
    navigate('/agregarjornada'); // Redirige a agregarjornada.jsx
  };
  
  return (
    <div className="page-container">
      <div className="header">
        <div className="title">TORNEOS</div>
      </div>

      <div className="buttons">
      <button onClick={handleAgregarJornada}>Agregar Resultados</button>
        <button onClick={() => navigate('/torneo')} className="nav-button">MIS TORNEOS</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Posición</th>
              <th>Equipo</th>
              <th>Puntos</th>
              <th>Goles a favor</th>
              <th>Goles en contra</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((equipo, index) => (
              <tr key={equipo.id}>
                <td>{index + 1}</td>
                <td>{equipo.equipo}</td>
                <td>{equipo.puntos}</td>
                <td>{equipo.goles_favor}</td>
                <td>{equipo.goles_contra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MostrarTabla;
