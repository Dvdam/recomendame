//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//Lamando a los controladores
var controladorPeliculas = require('./controladores/controladorPeliculas');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//cuando se llama a la ruta /peliculas, se ejecuta la acción buscarpeliculas.
app.get('/peliculas', controladorPeliculas.buscarPeliculas);
//cuando se llama a la ruta /peliculas/recom....., se ejecuta la acción recomiendoPelicula.
app.get('/peliculas/recomendacion', controladorPeliculas.recomiendoPelicula);
//cuando se llama a la ruta /peliculas/id, se ejecuta la acción buscarpelicula.
app.get('/peliculas/:id', controladorPeliculas.buscarPelicula);
//cuando se llama a la ruta /generos, se ejecuta la acción buscarGeneros.
app.get('/generos', controladorPeliculas.buscarGeneros);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

