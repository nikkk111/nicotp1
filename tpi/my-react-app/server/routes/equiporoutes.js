const express = require('express');  
const router = express.Router();  
const db = require('../db');  

// Ruta para agregar equipos a un torneo
router.post('/:id', (req, res) => {  
  const { id } = req.params;
  const { equipos } = req.body;  

  if (!equipos || equipos.length === 0) { 
    return res.status(400).json({ message: 'Se deben proporcionar equipos' }); 
  }

  const query = `      
    INSERT INTO equipos (torneo_id, nombre)
    VALUES ?
  `;

  const valoresEquipos = equipos.map((equipo) => [id, equipo.nombre]);  

  db.query(query, [valoresEquipos], (err, result) => {  
    if (err) {  
      console.error('Error al insertar equipos:', err);  
      return res.status(500).json({ message: 'Error al agregar equipos', error: err }); 
    }

    res.status(201).json({  
      message: 'Equipos agregados correctamente',  
      affectedRows: result.affectedRows,  
    });
  });
});

// NUEVA RUTA: Obtener equipos de un torneo por su ID
router.get('/:id', (req, res) => {  
  const { id } = req.params;

  const query = `SELECT id, nombre FROM equipos WHERE torneo_id = ?`;  

  db.query(query, [id], (err, results) => {  
    if (err) {  
      console.error('Error al obtener equipos:', err);  
      return res.status(500).json({ message: 'Error al obtener equipos', error: err });  
    }

    res.json(results);  
  });
});

module.exports = router;
