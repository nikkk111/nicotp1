const express = require('express'); 
const router = express.Router(); 
const { manejarTablaPosiciones } = require('../controllers/tablaposicionesController'); 

//manejar

router.get('/tabla/:torneoNombre', manejarTablaPosiciones); 

module.exports = router;  