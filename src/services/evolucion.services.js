const Diagnostico = require("../models/diagnostico.schema"); // Asegúrate de importar el modelo Diagnostico
const HistoriaClinica = require("../models/historiaClinica.schema");
const Evolucion = require("../models/evolucion.schema");

// Validar si el diagnóstico existe
const validarDiagnostico = async (codigo) => {
  const diagnostico = await Diagnostico.findOne({ codigo });
  if (!diagnostico) {
    throw new Error("Diagnóstico no encontrado.");
  }
  return diagnostico;
};

// Validar si la evolución es editable por el médico
const esEditablePorMedico = (evolucion, idMedico) => {
  // Verificar si el médico es el mismo que el de la evolución
  if (evolucion.medico.toString() !== idMedico) {
    return false; // El médico no puede editar evoluciones de otros
  }

  // Verificar si han pasado más de 48 horas desde la fecha de creación
  const ahora = new Date();
  const fechaCreacion = new Date(evolucion.fecha);
  const diferenciaEnHoras = Math.abs(
    (ahora - fechaCreacion) / (1000 * 60 * 60)
  );

  if (diferenciaEnHoras > 48) {
    return false; // El tiempo ha expirado
  }

  return true; // La evolución puede ser editada
};

// Obtener evoluciones por historia clínica
const obtenerEvolucionesPorHistoriaClinica = async (historiaClinicaId) => {
  try {
    console.log("Buscando historia clínica con ID:", historiaClinicaId);
    const historiaClinica = await HistoriaClinica.findById(historiaClinicaId);
    if (!historiaClinica) {
      throw new Error("Historia clínica no encontrada.");
    }

    console.log("Historia clínica encontrada:", historiaClinica);

    // No hacer populate de 'medico' para evitar el error
    const evoluciones = await Evolucion.find({
      historiaClinica: historiaClinicaId,
    })
      .populate("diagnostico") // Solo hacer populate para el diagnóstico
      .populate("historiaClinica"); // Solo hacer populate para la historia clínica

    if (evoluciones.length === 0) {
      throw new Error(
        "No se encontraron evoluciones para esta historia clínica."
      );
    }

    return evoluciones;
  } catch (error) {
    console.error(
      "Error en obtenerEvolucionesPorHistoriaClinica:",
      error.message
    );
    throw new Error(error.message || "Error al obtener las evoluciones.");
  }
};

module.exports = {
  validarDiagnostico,
  esEditablePorMedico,
  obtenerEvolucionesPorHistoriaClinica,
};
