const express = require("express");
const authMiddleware = require("../middlewares/auth");
const { check } = require("express-validator");

const {
  crearEvolucion,
  editarEvolucion,
} = require("../controllers/evolucion.controllers");
const router = express.Router();

// Crear una nueva evolución
router.post(
  "/",
  authMiddleware("medico"), // Validación del rol de "medico"
  [
    check(
      "diagnosticoCodigo",
      "El código de diagnóstico es obligatorio"
    ).notEmpty(),
    check("textoLibre", "El texto de la evolución es obligatorio").notEmpty(),
  ],
  crearEvolucion
);

router.put(
  "/:id",
  authMiddleware("medico"), // Validación del rol de "medico"
  [check("textoLibre", "El texto de la evolución es obligatorio").notEmpty()],
  editarEvolucion
);
module.exports = router;