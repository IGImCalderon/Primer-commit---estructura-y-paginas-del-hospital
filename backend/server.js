const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");

const db = require("../backend/database");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    express.static(
        path.resolve(__dirname, "..")
    )
);

// =========================
// REGISTRO
// =========================

app.post("/usuarios", async (req, res) => {

    const {
        nombre,
        email,
        password,
        rol
    } = req.body;

    try {

        // VERIFICAR EMAIL REPETIDO
        db.get(
            "SELECT * FROM usuarios WHERE email = ?",
            [email],
            async (err, row) => {

                if (row) {

                    return res.json({
                        mensaje:
                        "El usuario ya existe"
                    });
                }

                const hash =
                await bcrypt.hash(password, 10);

                db.run(
                    `
                    INSERT INTO usuarios
                    (
                        nombre,
                        email,
                        password,
                        rol
                    )

                    VALUES (?, ?, ?, ?)
                    `,
                    [
                        nombre,
                        email,
                        hash,
                        rol
                    ],

                    function(err) {

                        if (err) {

                            return res.json({
                                mensaje:
                                "Error al registrar"
                            });
                        }

                        res.json({
                            mensaje:
                            "Usuario registrado"
                        });

                    }
                );

            }
        );

    } catch {

        res.json({
            mensaje:
            "Error servidor"
        });

    }

});
app.post("/citas", (req, res) => {

    const {
        nombre,
        especialidad,
        fecha
    } = req.body;

    db.run(
        `
        INSERT INTO citas
        (nombre, especialidad, fecha)
        VALUES (?, ?, ?)
        `,
        [nombre, especialidad, fecha],

        function(err) {

            if (err) {

                return res.json({
                    mensaje: "Error al guardar cita"
                });

            }

            res.json({
                mensaje: "Cita agendada correctamente"
            });

        }
    );

});

// =========================
// LOGIN
// =========================

app.post("/login", (req, res) => {

    const {
        email,
        password
    } = req.body;

    db.get(
        `
        SELECT * FROM usuarios
        WHERE email = ?
        `,
        [email],

        async (err, usuario) => {

            if (!usuario) {

                return res.json({
                    mensaje:
                    "Usuario no encontrado"
                });

            }

            const valido =
            await bcrypt.compare(
                password,
                usuario.password
            );

            if (!valido) {

                return res.json({
                    mensaje:
                    "Contraseña incorrecta"
                });

            }

            res.json({

                mensaje:
                "Login correcto",

                usuario: {

                    id:
                    usuario.id,

                    nombre:
                    usuario.nombre,

                    rol:
                    usuario.rol
                }

            });

        }
    );

});

// =========================
// VER USUARIOS
// =========================

app.get("/usuarios", (req, res) => {

    db.all(
        `
        SELECT
        id,
        nombre,
        email,
        rol

        FROM usuarios
        `,
        [],

        (err, rows) => {

            res.json(rows);

        }
    );

});

// =========================
// ELIMINAR
// =========================

app.delete("/usuarios/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        `
        DELETE FROM usuarios
        WHERE id = ?
        `,
        [id],

        function(err) {

            if (err) {

                return res.json({
                    mensaje:
                    "Error"
                });

            }

            res.json({
                mensaje:
                "Usuario eliminado"
            });

        }

    );

});

// =========================
// MODIFICAR
// =========================

app.put("/usuarios/:id", (req, res) => {

    const id = req.params.id;

    const {
        nombre,
        rol
    } = req.body;

    db.run(
        `
        UPDATE usuarios

        SET
        nombre = ?,
        rol = ?

        WHERE id = ?
        `,
        [
            nombre,
            rol,
            id
        ],

        function(err) {

            if (err) {

                return res.json({
                    mensaje:
                    "Error al actualizar"
                });

            }

            res.json({
                mensaje:
                "Usuario actualizado"
            });

        }

    );

});

app.get("/citas", (req, res) => {

    db.all(
        "SELECT * FROM citas",
        [],
        (err, rows) => {

            if (err) {

                return res.json([]);

            }

            res.json(rows);

        }
    );

});

// =========================

app.listen(3000, () => {

    console.log(
        "Servidor en puerto 3000"
    );

});