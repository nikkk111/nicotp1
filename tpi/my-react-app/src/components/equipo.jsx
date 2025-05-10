import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './equipo.css';

const Equipo = () => {
  const { id } = useParams(); // ID del torneo
  const navigate = useNavigate();
  const [equipos, setEquipos] = useState(Array(12).fill(''));

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const equiposNoVacios = equipos.filter((equipo) => equipo.trim() !== '');
  
    if (equiposNoVacios.length === 0) {
      alert('Por favor, ingresa al menos un nombre de equipo');
      return;
    }
  
    const equiposParaAgregar = equiposNoVacios.map((nombre) => ({ nombre }));
  
    try {
      const response = await fetch(`http://localhost:3001/api/equipos/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equipos: equiposParaAgregar }),
      });
  
      if (response.ok) {
        alert('Equipos agregados con éxito');
        setEquipos(Array(12).fill(''));
        
        // Redirigir a la página de torneos
        navigate('/torneo');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Hubo un error al conectar con el servidor');
    }
  };

  const handleInputChange = (e, index) => {
    const newEquipos = [...equipos];
    newEquipos[index] = e.target.value;
    setEquipos(newEquipos);
  };

  return (
    <div className="equipo-container">
      <form onSubmit={handleSubmit}>
        {equipos.map((equipo, index) => (
          <input
            key={index}
            type="text"
            value={equipo}
            onChange={(e) => handleInputChange(e, index)}
            placeholder={`Equipo ${index + 1}`}
          />
        ))}
        <button type="submit">Agregar Equipos</button>
      </form>
    </div>
  );
};

export default Equipo;
