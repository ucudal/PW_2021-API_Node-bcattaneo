const fs = require("fs");

const archivoDb = "data/db.json";

/**
 * Valida que no exista el contacto
 * @param {*} nombreContacto 
 * @param {*} db 
 * @returns true si no existe
 */
const validarExistenciaContacto = (nombreContacto, db) =>
    db.contactos.filter((c) => c.nombreContacto == nombreContacto).length == 0;

/**
 * Actualiza el archivo de la base de datos
 * @param {*} db 
 */
const actualizarDb = (db) =>
    fs.writeFileSync(archivoDb, JSON.stringify(db));

/**
 * Obtiene la base de datos
 * @returns objeto con la base de datos
 */
const obtenerDb = () => JSON.parse(fs.readFileSync(archivoDb));

module.exports = { validarExistenciaContacto, actualizarDb, obtenerDb };