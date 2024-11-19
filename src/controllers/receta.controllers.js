const recetaService = require("../services/receta.services");

// Crear una nueva receta
const crearReceta = async (req, res) => {
  try {
    const receta = await recetaService.crearReceta(req.body);
    res.status(201).json(receta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar recetas de una historia clínica específica
const listarRecetasPorHistoriaClinica = async (req, res) => {
  try {
    const { historiaClinicaId } = req.params;
    const recetas = await recetaService.listarRecetasPorHistoriaClinica(
      historiaClinicaId
    );
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearReceta,
  listarRecetasPorHistoriaClinica,
};
