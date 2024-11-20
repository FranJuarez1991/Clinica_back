const { Router } = require("express");

const {
  crearPacientes,
  buscarPaciente,
} = require("../controllers/paciente.controllers"); // Asegúrate de que esta ruta esté correcta

const router = Router();

// Ruta para crear pacientes harcodeados
router.post("/crear-pacientes", crearPacientes);

// Ruta para buscar un paciente por DNI
router.get("/buscar-paciente/:dni", buscarPaciente);

module.exports = router;
