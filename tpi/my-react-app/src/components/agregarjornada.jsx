import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AgregarJornada = () => {
  const { state } = useLocation();
  const { torneo_id } = state || {};

  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState(
    Array(6).fill({ equipoLocal: "", equipoVisitante: "", golesLocal: "", golesVisitante: "" })
  );

  // Cargar equipos del torneo al montar el componente
  useEffect(() => {
    if (torneo_id) {
      axios
        .get(`http://localhost:3001/api/equipos/${torneo_id}`)
        .then((response) => setEquipos(response.data))
        .catch((error) => console.error("Error al obtener equipos:", error));
    }
  }, [torneo_id]);

  // Manejar cambios en los partidos
  const handleChange = (index, field, value) => {
    const nuevosPartidos = [...partidos];
    nuevosPartidos[index] = { ...nuevosPartidos[index], [field]: value };
    setPartidos(nuevosPartidos);
  };

  // Enviar datos de los seis partidos
  const handleGuardarResultados = () => {
    const partidosValidos = partidos.every(
      (p) =>
        p.equipoLocal &&
        p.equipoVisitante &&
        p.equipoLocal !== p.equipoVisitante &&
        p.golesLocal !== "" &&
        p.golesVisitante !== ""
    );

    if (!partidosValidos) {
      alert("Debes completar correctamente todos los partidos.");
      return;
    }

    axios
      .post("http://localhost:3001/api/agregarresultado", {
        torneo_id,
        resultados: partidos, // Enviar todos los partidos
      })
      .then(() => alert("Resultados guardados correctamente"))
      .catch((error) => console.error("Error al guardar resultados:", error));
  };

  return (
    <div>
      <h2>Agregar Jornada</h2>
      {partidos.map((partido, index) => (
        <div key={index} style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
          <h3>Partido {index + 1}</h3>

          <label>Equipo Local:</label>
          <select value={partido.equipoLocal} onChange={(e) => handleChange(index, "equipoLocal", e.target.value)}>
            <option value="">Seleccionar equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.nombre}
              </option>
            ))}
          </select>

          <label>Goles Local:</label>
          <input
            type="number"
            value={partido.golesLocal}
            onChange={(e) => handleChange(index, "golesLocal", e.target.value)}
            min="0"
          />

          <label>Equipo Visitante:</label>
          <select value={partido.equipoVisitante} onChange={(e) => handleChange(index, "equipoVisitante", e.target.value)}>
            <option value="">Seleccionar equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.nombre}
              </option>
            ))}
          </select>

          <label>Goles Visitante:</label>
          <input
            type="number"
            value={partido.golesVisitante}
            onChange={(e) => handleChange(index, "golesVisitante", e.target.value)}
            min="0"
          />
        </div>
      ))}

      <button onClick={handleGuardarResultados}>Guardar Resultados</button>
    </div>
  );
};

export default AgregarJornada;
