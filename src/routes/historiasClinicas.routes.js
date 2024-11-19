const express = require("express");
const {
  listarHistoriasClinicas,
  crearHistoriaClinica,
} = require("../controllers/historiaClinica.controllers");

const router = express.Router();

router.get("/", listarHistoriasClinicas);
router.post("/", crearHistoriaClinica);

module.exports = router;
