CREATE DATABASE peliculas;
USE peliculas;

-- Tabla Pelicula
CREATE TABLE pelicula (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    duracion INT(5),
    director VARCHAR(400),
    anio INT(5) ,
    fecha_lanzamiento DATE,
    puntuacion INT(2),
    poster VARCHAR(300),
    trama VARCHAR (700)
);

-- Tabla genero
CREATE TABLE genero (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (30)
);

-- Tabla actor
CREATE TABLE actor (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (70)
);


-- Creo la Tabla actor_pelicula
CREATE TABLE actor_pelicula (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    actor_id INT, 
    pelicula_id INT
);

-- Agrego la clave foranea a la tabla actor_pelicula
ALTER TABLE actor_pelicula  ADD FOREIGN KEY (actor_id) REFERENCES actor(id);
-- Agrego la clave foranea a la tabla actor_pelicula
ALTER TABLE actor_pelicula  ADD FOREIGN KEY (pelicula_id) REFERENCES pelicula(id);
-- Agrego el campo genero_id en la tabla pelicula
ALTER TABLE pelicula  ADD COLUMN genero_id INT;
-- Agrego la clave foranea a la tabla pelicula
ALTER TABLE pelicula  ADD FOREIGN KEY (genero_id) REFERENCES genero(id);