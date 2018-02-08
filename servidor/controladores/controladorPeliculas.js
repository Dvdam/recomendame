//se importa una referencia a la conexión.
var con = require('../lib/conexionbd');

function buscarPeliculas(req, res){
//Traigo todo lo que me da el front-End
    var sql = "SELECT * FROM pelicula WHERE 1=1 ";
    var anio = req.query.anio;
    var titulo = req.query.titulo;
    var genero = req.query.genero;
    var orden = req.query.columna_orden;
    var tipo_orden = req.query.tipo_orden;
    var pagina = req.query.pagina;
    var cantidad = req.query.cantidad;
    var pedido = '';

if (titulo) {
    pedido += " AND titulo LIKE '%" + titulo + "%'"; 
}
if (anio) {
    pedido += " AND anio LIKE " + anio; 
}
if(genero) {
    pedido += " AND genero_id = " + genero;
}
if (orden) {
    pedido += " ORDER BY " + orden + " ";
}
if (tipo_orden){
    pedido += tipo_orden;
}

var paginas = (pagina * cantidad) - cantidad ;
    if(pagina == 1){
        var paginacion = " LIMIT 0," + cantidad;
    }
    if(pagina > 1){
        var paginacion = " LIMIT " + paginas + "," + cantidad;
    }
var busco = sql + pedido + paginacion;
// console.log(busco);
con.query(busco, function(error, resultado, fields) {
    if(error) {
        console.log('ERROR', error.message);
        return res.status(404).send(error);
    } 
    var sqlTotal = "SELECT COUNT(*) AS total FROM pelicula WHERE 1=1 " + pedido;
    con.query(sqlTotal, function(error, total, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var response = {
            'peliculas': resultado,
            'total': total[0].total
        };
        res.send(JSON.stringify(response));
        // console.log(response)
    });
});
}

// -------------------------------------------------------Muestro la Informacion de cada Pelicula seleccionada ------------------------------------------------------------------------
function buscarPelicula(req, res) {
    //se obtiene el path param id
    var id = req.params.id;
    //se crea la consulta que obtiene
    var peliculas = "SELECT poster, titulo, anio, trama, fecha_lanzamiento, director, duracion, puntuacion, genero.nombre FROM pelicula JOIN genero ON genero_id = genero.id WHERE pelicula.id = " + id;
    console.log(peliculas);
    //se ejecuta la consulta
    con.query(peliculas, function(error, resultado, fields) {
    if(error) {
        console.log('ERROR', error.message);
        return res.status(404).send(error);
    }
    if (resultado.length == 0) {
        console.log("No se encontro ninguna pelicula con ese id");
        return res.status(404).send("No se encontro ninguna pelicula con ese id");
    }
    var actores = "SELECT actor.nombre FROM actor_pelicula JOIN pelicula ON pelicula_id = pelicula.id JOIN actor ON actor_id = actor.id WHERE pelicula.id = " + id;
        con.query(actores, function(error, actor, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            if (actor.length == 0) {
                console.log("No se encontraron actores con ese id");
                return res.status(404).send("No se encontro ningun actor con esa pelicula");
            }
            var generos = "SELECT genero.nombre FROM pelicula JOIN genero ON genero_id = genero.id WHERE pelicula.id = " + id;
            con.query(generos, function(error, genero, fields) {
                if (error) {
                    console.log("Hubo un error en la consulta", error.message);
                    return res.status(404).send("Hubo un error en la consulta");
                }
                if (genero.length == 0) {
                    console.log("No se encontro ninguna pelicula con ese genero");
                    return res.status(404).send("No se encontro ninguna pelicula con ese genero");
                }
                    var response = {
                        'pelicula': resultado[0],
                        'actores' : actor,
                        'genero' : genero
                    };
        
            res.send(JSON.stringify(response));
            // console.log(response);
            });
        });
    });
}

// -------------------------------Termina donde muestro toda la info por ID de las peliculas ---------------------------------------


// ------------------------------- MUESTRO LOS GENEROS de las peliculas --------------------------------------------------------------
function buscarGeneros(req, res) {
    var sql = "select * from genero"
    //se ejecuta la consulta
    con.query(sql, function(error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        //si no hubo error, se crea el objeto respuesta con las peliculas encontradas
        var response = {
            'generos': resultado
        };
        //se envía la respuesta
        res.send(JSON.stringify(response));
    });
}

// /*-------------------------------------------------------------------------RECOMENDADOR DE PELIS --------------------------------------------------------------------------------------- */

function recomiendoPelicula(req, res) {
     //Traigo todo lo que me da el front-End
     var sql = "SELECT pelicula.id, pelicula.poster, pelicula.titulo, pelicula.anio, pelicula.trama, pelicula.fecha_lanzamiento, pelicula.director, pelicula.duracion, pelicula.puntuacion, genero.nombre FROM pelicula  JOIN genero ON genero_id = genero.id ";
     var genero = req.query.genero;
     var anio_inicio = req.query.anio_inicio;
     var anio_fin = req.query.anio_fin;
     var puntuacion = req.query.puntuacion;
     var recomiendo = [];
     if (genero) {
        recomiendo.push("genero.nombre = '" + genero + "'");          
     }
     if (puntuacion) {
        recomiendo.push("pelicula.puntuacion = " + puntuacion);
    }
    if (anio_inicio) {
        recomiendo.push(" pelicula.anio BETWEEN " + anio_inicio + " AND " + anio_fin );
    }

    var peli_lista = recomiendo.join(' AND ');
     if (peli_lista != '') {
         peli_lista = ' WHERE ' + peli_lista;
     }
     
    var recomendacion = (sql + peli_lista);
    // console.log(recomendacion)
     //se ejecuta la consulta
     con.query(recomendacion, function(error, resultado, fields) {
     if(error) {
         console.log('ERROR', error.message);
         return res.status(404).send(error);
         console.log(resultado)
     } else {     
        var response = {
            'peliculas': resultado
        };
        res.send(JSON.stringify(response));
        // console.log(response)
        }   
    });
}

/*----------------------------------------------------------------------------------------------------------------------------- */

//se exportan las funciones creadas
module.exports = {
    buscarPeliculas: buscarPeliculas,
    buscarPelicula: buscarPelicula,
    buscarGeneros: buscarGeneros,
    recomiendoPelicula: recomiendoPelicula

};