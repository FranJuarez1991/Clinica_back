const express = require("express");
const {
  listarDiagnosticos,
  crearDiagnostico,
  obtenerDiagnosticoPorCodigo,
} = require("../controllers/diagnostico.controllers");

const router = express.Router();

// Rutas de Diagnósticos
router.get("/", listarDiagnosticos); // Listar todos los diagnósticos
router.post("/crear-diagnostico", crearDiagnostico); // Crear un nuevo diagnóstico
router.get("/:codigo", obtenerDiagnosticoPorCodigo); // Buscar un diagnóstico por código

module.exports = router;
