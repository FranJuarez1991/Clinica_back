const express = require("express");
const {
  listarHistoriasClinicas,
  crearHistoriaClinica,
  agregarEvolucion,
  agregarPedidoLaboratorio,
} = require("../controllers/historiaClinica.controllers");
const {
  obtenerHistoriaClinicaPorId,
} = require("../services/historiaClinica.services");

const router = express.Router();

router.get("/", listarHistoriasClinicas);
router.post("/", crearHistoriaClinica);
router.post("/evoluciones", agregarEvolucion);
router.post("/pedidosLaboratorio", agregarPedidoLaboratorio);
router.get("/:id", obtenerHistoriaClinicaPorId);




module.exports = router;
