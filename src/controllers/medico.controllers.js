const medicoService = require("../services/medico.services");

// Controlador para obtener los datos del médico logueado
const obtenerDatosMedico = async (req, res) => {
  try {
    const userId = req.user.idUsuario; // Obtener el ID del usuario logueado desde el token
    const medico = await medicoService.obtenerMedicoPorId(userId);
    res.status(200).json({
      message: "Datos del médico obtenidos correctamente",
      data: medico,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los datos del médico",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerDatosMedico,
};
