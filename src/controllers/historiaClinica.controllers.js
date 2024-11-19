const historiaClinicaService = require("../services/historiaClinica.services");

const listarHistoriasClinicas = async (req, res) => {
  try {
    const historias = await historiaClinicaService.listarHistoriasClinicas();
    res.status(200).json(historias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearHistoriaClinica = async (req, res) => {
  try {
    const historia = await historiaClinicaService.crearHistoriaClinica(
      req.body
    );
    res.status(201).json(historia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { listarHistoriasClinicas, crearHistoriaClinica };
