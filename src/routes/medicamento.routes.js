const express = require("express");
const {
  obtenerMedicamentos,
  obtenerMedicamentosPorDescripcion,
  obtenerMedicamentoPorCodigo,
} = require("../controllers/medicamento.controllers");

const router = express.Router();

// Ruta para obtener los medicamentos paginados
router.get("/", obtenerMedicamentos);

// Ruta para obtener medicamentos por descripción (mínimo 3 caracteres)
router.get("/descripcion", obtenerMedicamentosPorDescripcion);

// Ruta para obtener medicamento por código
router.get("/:codigo", obtenerMedicamentoPorCodigo);

module.exports = router;
