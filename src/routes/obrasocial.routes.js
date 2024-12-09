const express = require("express");
const {
  ObtenerObrasSociales,
  ObtenerObrasSocialesPorCodigo,
} = require("../controllers/obrasocial.controllers");

const router = express.Router();

// Ruta para obtener todas las obras sociales
router.get("/", ObtenerObrasSociales);

// Ruta para obtener una obra social por código
router.get("/:codigo", ObtenerObrasSocialesPorCodigo);

module.exports = router;
