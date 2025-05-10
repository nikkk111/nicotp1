import React, { useState } from 'react'; // Importa React y useState para manejar el estado del componente.
import { useNavigate } from 'react-router-dom'; // Hook para redirigir a otras páginas.
import './BuscarTabla.css'; // Asegura que los estilos se apliquen desde el archivo CSS corre

const BuscarTabla = () => { // Define el componente BuscarTabla.
  // Estado para almacenar el nombre del torneo ingresado y el mensaje de error o éxito.
  const [torneoNombre, setTorneoNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Hook para la navegación entre rutas.
  const navigate = useNavigate();

  // Función que maneja el envío del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recarga de página).

    try {
      // Realiza una solicitud HTTP GET al backend para obtener la tabla de posiciones del torneo.
      const response = await fetch(`http://localhost:3001/api/tablaposiciones/tabla/${encodeURIComponent(torneoNombre)}`);

      // Si la respuesta no es exitosa, muestra un mensaje de error.
      if (!response.ok) {
        const errorData = await response.json();
        setMensaje(errorData.message || 'Error desconocido');
        return; // Sale de la función si ocurre un error.
      }

      const data = await response.json(); // Si la solicitud es exitosa, obtiene los datos de la tabla.
      // Redirige al componente mostrartabla.jsx, pasando los datos obtenidos en el estado.
      navigate('/mostrartabla', { state: { tabla: data.tabla } });
    } catch (error) {
      console.error('Error al hacer la solicitud:', error); // Imprime el error en consola para debugging.
      setMensaje('Error al comunicarse con el servidor'); // Muestra un mensaje de error en caso de problemas de conexión.
    }
  };

  return (
    <div className="tabla-container"> {/* Contenedor principal del componente */}
      <header className="tabla-header"> {/* Cabecera con el botón de navegación */}
        <button onClick={() => navigate('/torneo')} className="nav-button">
          MIS TORNEOS
        </button>
      </header>

      <h1 className="titulo">Buscar Tabla de Posiciones</h1> {/* Título de la página */}

      {/* Formulario para ingresar el nombre del torneo y buscar la tabla de posiciones */}
      <form onSubmit={handleSubmit} className="tabla-form">
        <input
          type="text"
          value={torneoNombre}
          onChange={(e) => setTorneoNombre(e.target.value)} // Actualiza el estado del nombre del torneo.
          placeholder="Nombre del Torneo"
          required
          className="tabla-input" // Estilo para el campo de texto
        />
        <button type="submit" className="tabla-button">Buscar</button> {/* Botón de envío del formulario */}
      </form>

      {/* Muestra un mensaje si hay algún error o éxito en la solicitud */}
      {mensaje && <p className="tabla-mensaje">{mensaje}</p>}
    </div>
  );
};

export default BuscarTabla;
