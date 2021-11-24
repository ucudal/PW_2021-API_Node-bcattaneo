const express = require("express");
const cors = require("cors");
const { validarExistenciaContacto, actualizarDb, obtenerDb } = require("./utils");

const claveExperiencia = "experiencia-laboral";

let app = express();
let db = obtenerDb();

//app.use(cors())
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/hola-mundo", function(req, res) {
    res.send("¡Hola mundo!");
});

app.get("/experiencia-laboral", function(req, res) {
    res.send({
        [claveExperiencia]: db[claveExperiencia],
    });
});

app.post("/enviar-formulario", function(req, res) {
    const body = req.body;
    const nombreContacto = body.nombreContacto;
    const emailContacto = body.emailContacto;
    const mensajeContacto = body.mensajeContacto;

    if (!nombreContacto) {
        res.status(400).send("Falta el nombre de contacto");
    } else {
        // Agrega contacto a la lista sólo si no existe
        if (validarExistenciaContacto(nombreContacto, db)) {
            db.contactos.push({
                nombreContacto: nombreContacto,
                emailContacto: emailContacto,
                mensajeContacto: mensajeContacto
            });
            actualizarDb(db);
        }
        // Define cookie HTTP only
        res.cookie("PW_2021-CV_Contacto", nombreContacto, {
            httpOnly: false,
            path: '/',
        });
        res.send("ok");
    }
});

// Casos no definidos
app.use(function(req, res, next) {
    res.status(404).send("404 - No fue encontrado");
});

app.listen(process.env.PORT || 3000, (a) => {
    console.log("Servidor disponible en http://localhost:3000");
});

module.exports = app;