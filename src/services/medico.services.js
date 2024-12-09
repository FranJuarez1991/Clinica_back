const UserModel = require("../models/usuarios.schema");

// Servicio para obtener los datos del médico logueado
const obtenerMedicoPorId = async (userId) => {
  try {
    // Buscar al médico en la base de datos usando el userId del token decodificado
    const medico = await UserModel.findById(userId).select(
      "nombreUsuario emailUsuario rol"
    );
    if (!medico) {
      throw new Error("Medico no encontrado");
    }
    return medico;
  } catch (error) {
    throw new Error("Error al obtener los datos del médico: " + error.message);
  }
};

module.exports = {
  obtenerMedicoPorId,
};
