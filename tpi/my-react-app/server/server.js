const express = require('express'); // servidores en Node.js.
const cors = require('cors'); //solicitudes desde otros orígenes.
const db = require('./db'); 
const bodyParser = require('body-parser'); // solicitudes HTTP
const torneoRoutes = require('./routes/torneoroutes'); // rrr
const equipoRoutes = require('./routes/equiporoutes');
const tablaposicionesRoutes = require('./routes/tablaposicionesroutes'); 
const AgregarJornadaRoutes = require('./routes/AgregarJornadaRoutes');
const app = express(); // instancia



app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

app.use(cors()); 
app.use(bodyParser.json());


app.get('/test', (req, res) => {
  res.json({ message: 'Servidor funcionando' }); 
});

app.post('/register', (req, res) => {
  const { usuario, nombre, gmail, contraseña } = req.body; 
  const query = 'INSERT INTO usuario (usuario, nombre, gmail, contraseña) VALUES (?, ?, ?, ?)'; 
  db.query(query, [usuario, nombre, gmail, contraseña], (err, result) => { 
    if (err) {
      console.error('Error en registro:', err); 
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Usuario o correo ya existe' }); //
      }
      return res.status(500).json({ message: 'Error en el servidor' }); 
    }
    res.status(201).json({ message: 'Usuario registrado con éxito' }); 
  });
});


app.post('/login', (req, res) => {
  const { usuario, contraseña } = req.body;
  const query = 'SELECT * FROM usuario WHERE usuario = ? AND contraseña = ?'; 
  db.query(query, [usuario, contraseña], (err, results) => { 
    if (err) {
      console.error('Error en consulta:', err); 
      return res.status(500).json({ message: 'Error en servidor' });
    }
    if (results.length > 0) { 
      res.json({ message: 'Login exitoso', user: results[0] }); 
    } else {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' }); 
    }
  });
});


app.use('/torneo', torneoRoutes); 
app.use('/api/equipos', equipoRoutes); 
app.use('/api/tablaposiciones', tablaposicionesRoutes); 
//app.use('/api/resultados', agregarResultadoRoutes); 
app.use('/api/jornadas', AgregarJornadaRoutes);


const PORT = 3001; 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); 
});
