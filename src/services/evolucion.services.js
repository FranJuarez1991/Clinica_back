const Evolucion = require("../models/evolucion.schema");
const HistoriaClinica = require("../models/historiaClinica.schema");

const crearEvolucion = async (datos) => {
  try {
    const nuevaEvolucion = new Evolucion(datos);
    const evolucionGuardada = await nuevaEvolucion.save();

    // Vincular la evolución a la historia clínica
    await HistoriaClinica.findByIdAndUpdate(datos.historiaClinicaId, {
      $push: { evoluciones: evolucionGuardada._id },
    });

    return evolucionGuardada;
  } catch (error) {
    throw new Error("Error al crear la evolución.");
  }
};

const obtenerEvolucionPorId = async (id) => {
  try {
    return await Evolucion.findById(id);
  } catch (error) {
    throw new Error("Error al obtener la evolución.");
  }
};

const editarEvolucion = async (idEvolucion, datos, usuarioId) => {
  try {
    const evolucion = await Evolucion.findById(idEvolucion);

    if (!evolucion) {
      throw new Error("Evolución no encontrada.");
    }

    // Verificar si el usuario es el creador y si está en el plazo de edición
    if (evolucion.editableHasta < Date.now()) {
      throw new Error("El tiempo para editar la evolución ha expirado.");
    }

    Object.assign(evolucion, datos);
    return await evolucion.save();
  } catch (error) {
    throw new Error("Error al editar la evolución.");
  }
};

module.exports = {
  crearEvolucion,
  obtenerEvolucionPorId,
  editarEvolucion,
};
