const Paciente = require("../models/paciente.schema");

async function buscarPacientePorDNI(dni) {
  try {
    // Validación básica del DNI
    if (!/^\d{7,10}$/.test(dni)) {
      throw new Error("El DNI debe tener entre 7 y 10 dígitos.");
    }

    console.info(`Buscando paciente con DNI: ${dni}`);

    // Consulta para encontrar al paciente y hacer populate de la historiaClinicaId
    const paciente = await Paciente.findOne({ "paciente.dni": dni }).populate(
      "historiaClinicaId"
    ); // Esto hace que historiaClinicaId sea un objeto completo

    if (!paciente) {
      console.warn(`Paciente no encontrado con el DNI: ${dni}`);
      return null;
    }

    return paciente;
  } catch (err) {
    console.error("Error al buscar paciente por DNI:", err.message);
    throw err;
  }
}

module.exports = {
  buscarPacientePorDNI,
};
