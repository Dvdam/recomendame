var mysql      = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'acamica',
  database: 'peliculas'
});

connection.connect();
module.exports = connection;