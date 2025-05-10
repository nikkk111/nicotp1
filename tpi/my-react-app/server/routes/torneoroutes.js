const express = require('express'); 
const router = express.Router(); 
const db = require('../db'); 



router.post('/', (req, res) => {
  
  const { nombre, jornada, participantes, ida_vuelta } = req.body;

  if (!nombre || !jornada || !participantes) {
    return res.status(400).json({ message: 'Faltan datos requeridos' }); 
  }
  
  const query = `
    INSERT INTO torneos (nombre, jornada, participantes, ida_vuelta)
    VALUES (?, ?, ?, ?)
  `;
  const values = [nombre, jornada, participantes, ida_vuelta]; 
  db.query(query, values, (err, result) => {
    if (err) { 
      console.error('Error al crear torneo:', err);
      return res.status(500).json({ message: 'Error al crear torneo' }); 
    }
    res.status(201).json({ id: result.insertId, message: 'Torneo creado con éxito' });
  });
});


router.get('/:id', (req, res) => {
  const { id } = req.params; 

  
  const query = 'SELECT * FROM torneos WHERE id = ?';

  
  db.query(query, [id], (err, results) => {
    if (err) { 
      console.error('Error al obtener torneo:', err);
      return res.status(500).json({ message: 'Error al obtener torneo' }); 
    }

 
    if (results.length > 0) {
      res.json(results[0]);
    } else {
    
      res.status(404).json({ message: 'Torneo no encontrado' });
    }
  });
});


module.exports = router;
