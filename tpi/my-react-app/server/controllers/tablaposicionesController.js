const db = require('../db'); 


const manejarTablaPosiciones = (req, res) => {
  const { torneoNombre } = req.params;  

  
  const verificarQuery = `
    SELECT tp.id, e.nombre AS equipo, tp.puntos, tp.goles_favor, tp.goles_contra
    FROM tablaposiciones tp
    INNER JOIN torneos t ON tp.torneo_id = t.id
    INNER JOIN equipos e ON tp.equipo_id = e.id
    WHERE t.nombre = ?
    ORDER BY tp.puntos DESC, tp.goles_favor DESC;
  `;

  db.query(verificarQuery, [torneoNombre], (err, results) => {  
    if (err) {  
      console.error('Error al verificar la tabla de posiciones:', err);  
      return res.status(500).json({ message: 'Error al verificar la tabla de posiciones', error: err.message });  
    }

    if (results.length > 0) {  
      return res.json({ tabla: results, redireccion: true });  
    }

    
    const obtenerEquiposQuery = `
      SELECT e.id AS equipo_id, t.id AS torneo_id
      FROM equipos e
      INNER JOIN torneos t ON t.id = e.torneo_id
      WHERE t.nombre = ?
    `;

    db.query(obtenerEquiposQuery, [torneoNombre], (err, equipos) => {  
      if (err) {  
        console.error('Error al obtener equipos del torneo:', err);  
        return res.status(500).json({ message: 'Error al obtener equipos del torneo', error: err.message });  
      }

      if (equipos.length === 0) {  
        return res.status(404).json({ message: 'Torneo no encontrado o sin equipos asociados' });  
      }

      
      const insertarQuery = `
        INSERT INTO tablaposiciones (torneo_id, equipo_id, puntos, goles_favor, goles_contra)
        VALUES ?
      `;
      const valores = equipos.map((equipo) => [equipo.torneo_id, equipo.equipo_id, 0, 0, 0]); 

      db.query(insertarQuery, [valores], (err) => {  
        if (err) { 
          console.error('Error al insertar equipos en tabla de posiciones:', err);  
          return res.status(500).json({ message: 'Error al insertar equipos en tabla de posiciones', error: err.message });  
        }

       
        db.query(verificarQuery, [torneoNombre], (err, resultadosActualizados) => {  
          if (err) {  
            console.error('Error al obtener tabla de posiciones actualizada:', err); 
            return res.status(500).json({ message: 'Error al obtener datos actualizados', error: err.message }); 
          }
          res.json({ tabla: resultadosActualizados, redireccion: true });  
        });
      });
    });
  });
};

module.exports = { manejarTablaPosiciones };  
