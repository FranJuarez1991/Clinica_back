const Receta = require("../models/receta.schema");
const HistoriaClinica = require("../models/historiaClinica.schema");

const crearReceta = async (datos) => {
  try {
    const nuevaReceta = new Receta(datos);
    const recetaGuardada = await nuevaReceta.save();

    // Vincular la receta a la historia clínica
    await HistoriaClinica.findByIdAndUpdate(datos.historiaClinicaId, {
      $push: { recetas: recetaGuardada._id },
    });

    return recetaGuardada;
  } catch (error) {
    throw new Error("Error al crear la receta.");
  }
};

const listarRecetasPorHistoriaClinica = async (historiaClinicaId) => {
  try {
    return await Receta.find({ historiaClinicaId });
  } catch (error) {
    throw new Error("Error al listar las recetas.");
  }
};

module.exports = {
  crearReceta,
  listarRecetasPorHistoriaClinica,
};
