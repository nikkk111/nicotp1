const db = require('../db');

const agregarResultados = (req, res) => {
    const { torneo_id, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante } = req.body;

    // Validar que todos los datos necesarios estén presentes
    if (!torneo_id || !equipo_local_id || !equipo_visitante_id || goles_local === undefined || goles_visitante === undefined) {
        return res.status(400).json({ message: "Todos los datos son obligatorios" });
    }

    // Insertar resultado en la tabla jornadas
    const insertJornadaQuery = `
        INSERT INTO jornadas (torneo_id, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insertJornadaQuery, [torneo_id, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante], (err, result) => {
        if (err) {
            console.error("Error al insertar jornada:", err);
            return res.status(500).json({ message: "Error al registrar el partido" });
        }

        // Una vez insertada la jornada, actualizamos la tabla de posiciones
        actualizarTablaPosiciones(torneo_id, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, res);
    });
};

// Función para actualizar la tabla de posiciones
const actualizarTablaPosiciones = (torneo_id, equipo_local_id, equipo_visitante_id, goles_local, goles_visitante, res) => {
    let puntosLocal = 0, puntosVisitante = 0;

    // Lógica de puntos según el resultado
    if (goles_local > goles_visitante) {
        puntosLocal = 3; // Gana el local
    } else if (goles_local < goles_visitante) {
        puntosVisitante = 3; // Gana el visitante
    } else {
        puntosLocal = 1;
        puntosVisitante = 1; // Empate
    }

    // Actualizar tabla de posiciones para el equipo local
    const updateQuery = `
        UPDATE tablaposiciones
        SET puntos = puntos + ?, goles_favor = goles_favor + ?, goles_contra = goles_contra + ?
        WHERE torneo_id = ? AND equipo_id = ?;
    `;

    // Actualizar posiciones del equipo local
    db.query(updateQuery, [puntosLocal, goles_local, goles_visitante, torneo_id, equipo_local_id], (err) => {
        if (err) {
            console.error("Error al actualizar tabla de posiciones (local):", err);
            return res.status(500).json({ message: "Error al actualizar la tabla de posiciones (local)" });
        }

        // Actualizar posiciones del equipo visitante
        db.query(updateQuery, [puntosVisitante, goles_visitante, goles_local, torneo_id, equipo_visitante_id], (err) => {
            if (err) {
                console.error("Error al actualizar tabla de posiciones (visitante):", err);
                return res.status(500).json({ message: "Error al actualizar la tabla de posiciones (visitante)" });
            }

            res.json({ message: "Resultado guardado y tabla de posiciones actualizada" });
        });
    });
};

module.exports = { agregarResultados };
