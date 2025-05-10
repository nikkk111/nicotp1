import React, { useState } from 'react'; // Importa React y useState para manejar el estado del componente.
import { useNavigate } from 'react-router-dom'; // Hook para redirigir a otras páginas.
import "./crear.css"; // Asegura que los estilos se apliquen desde el archivo CSS correspondiente.

const Crear = () => { // Define el componente Crear.
  // Estados para almacenar los datos del formulario.
  const [nombre, setNombre] = useState('');
  const [jornada, setJornada] = useState('');
  const [participantes, setParticipantes] = useState('');
  const [idaYVuelta, setIdaYVuelta] = useState(false);
  
  // Hook para la navegación entre rutas.
  const navigate = useNavigate();

  // Función que maneja el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recarga de página).

    // Verifica si los campos obligatorios están vacíos.
    if (!nombre || !jornada || !participantes) {
      alert('Por favor, completa todos los campos.'); // Muestra una alerta si algún campo está vacío.
      return; // Sale de la función si algún campo está vacío.
    }

    // Crea el objeto con los datos del torneo para enviarlo al backend.
    const nuevoTorneo = {
      nombre,
      jornada,
      participantes,
      ida_vuelta: idaYVuelta, // Valor booleano de "Ida y vuelta".
    };

    try {
      // Realiza una solicitud HTTP POST al backend para crear un nuevo torneo.
      const response = await fetch('http://localhost:3001/torneo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoTorneo), // Convierte los datos del torneo a formato JSON.
      });

      // Si la respuesta es exitosa, redirige al usuario al componente de equipos con el ID del torneo recién creado.
      if (response.ok) {
        const data = await response.json(); // Obtiene los datos de la respuesta.
        navigate(`/equipo/${data.id}`); // Redirige al componente de equipos, pasando el ID del torneo.
      } else {
        // Si hay un error, muestra el mensaje de error.
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      // En caso de un error de conexión, muestra una alerta.
      alert('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="crear-container"> {/* Contenedor principal del componente */}
      <form onSubmit={handleSubmit}> {/* Formulario para crear el torneo */}
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)} // Actualiza el estado del nombre del torneo.
          placeholder="Nombre del torneo"
          required
        />
        <input
          type="text"
          value={jornada}
          onChange={(e) => setJornada(e.target.value)} // Actualiza el estado de la jornada.
          placeholder="Jornada"
          required
        />
        <input
          type="text"
          value={participantes}
          onChange={(e) => setParticipantes(e.target.value)} // Actualiza el estado de los participantes.
          placeholder="Participantes"
          required
        />
        <input
          type="checkbox"
          checked={idaYVuelta}
          onChange={() => setIdaYVuelta(!idaYVuelta)} // Alterna el estado de idaYVuelta cuando se marca o desmarca el checkbox.
        />
        {' '}
        <label>Ida y vuelta</label> {/* Etiqueta para el checkbox */}
        <button type="submit">Crear Torneo</button> {/* Botón para enviar el formulario */}
      </form>
    </div>
  );
};

export default Crear; // Exporta el componente Crear para usarlo en otras partes de la aplicación.
