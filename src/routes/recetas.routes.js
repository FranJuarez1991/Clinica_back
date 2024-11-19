const express = require("express");
const router = express.Router();
const {
  crearReceta,
  listarRecetasPorHistoriaClinica,
} = require("../controllers/receta.controllers");

// Ruta para crear una nueva receta
router.post("/", crearReceta);

// Ruta para listar recetas de una historia clínica específica
router.get("/:historiaClinicaId", listarRecetasPorHistoriaClinica);

module.exports = router;
