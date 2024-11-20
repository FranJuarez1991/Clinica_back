const mongoose = require("mongoose");
const Paciente = require("../models/paciente.schema");

async function buscarPacientePorDNI(dni) {
  try {
    const paciente = await Paciente.findOne({ "paciente.dni": dni });

    if (!paciente) {
      console.log("No se encontró un paciente con ese DNI.");
      return null;
    }

    return paciente;
  } catch (err) {
    console.error("Error al buscar paciente por DNI:", err);
    throw err;
  }
}

module.exports = {
  buscarPacientePorDNI,
};
