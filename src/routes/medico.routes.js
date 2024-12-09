const express = require("express");
const { obtenerDatosMedico } = require("../controllers/medico.controllers");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

// Ruta para obtener los datos del médico logueado
router.get("/mi-datos", authMiddleware("medico"), obtenerDatosMedico);

module.exports = router;
