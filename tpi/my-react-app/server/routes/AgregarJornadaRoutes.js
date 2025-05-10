// server/routes/AgregarJornadaRoutes.js
const express = require('express');
const router = express.Router();
const { agregarResultados } = require('../controllers/AgregarJornadaController');

router.post('/agregarresultado', agregarResultados);

module.exports = router;
