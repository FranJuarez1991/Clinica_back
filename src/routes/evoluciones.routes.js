const express = require("express");

const {
  crearEvolucion,
  editarEvolucion,
} = require("../controllers/evolucion.controllers");
const router = express.Router();

// Crear una nueva evolución
router.post("/", crearEvolucion);

// Editar una evolución existente
router.put("/:id", editarEvolucion);

module.exports = router;
