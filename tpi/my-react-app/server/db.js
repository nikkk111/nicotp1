const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'ctpoba.edu.ar',
  user: 'sandovaln', 
  password: '47033072', 
  database: '24_71_D', 
});



db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

module.exports = db;
