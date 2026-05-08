const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
    "./hospital.db",
    (err) => {

        if (err) {

            console.log(
                "Error al conectar BD"
            );

        } else {

            console.log(
                "Base de datos conectada"
            );

        }

    }
);

// TABLA USUARIOS
db.run(`

CREATE TABLE IF NOT EXISTS usuarios (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nombre TEXT,

    email TEXT UNIQUE,

    password TEXT,

    rol TEXT

)

`);

db.run(`
CREATE TABLE IF NOT EXISTS citas (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nombre TEXT,

    especialidad TEXT,

    fecha TEXT

)
`);

db.run(`

CREATE TABLE IF NOT EXISTS citas (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nombre TEXT,

    especialidad TEXT,

    fecha TEXT

)

`);

module.exports = db;