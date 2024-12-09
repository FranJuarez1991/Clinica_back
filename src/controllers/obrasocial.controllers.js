const {
  obtenerObrasSociales,
  obtenerObraSocialPorCodigo,
} = require("../services/obrasSociales.services");

// Obtener todas las obras sociales
const ObtenerObrasSociales = async (req, res) => {
  try {
    const obrasSociales = await obtenerObrasSociales(); // Llamada al servicio para obtener todas las obras sociales
    res.status(200).json(obrasSociales); // Devuelve el resultado al cliente
  } catch (error) {
    console.error("Error al obtener las obras sociales:", error.message);
    res.status(500).json({
      message: "Error al obtener las obras sociales",
      error: error.response ? error.response.data : error.message, // Detalles del error de la API
    });
  }
};

// Obtener obra social por código
const ObtenerObrasSocialesPorCodigo = async (req, res) => {
  const { codigo } = req.params; // Extrae el código de los parámetros de la solicitud
  try {
    const obraSocial = await obtenerObraSocialPorCodigo(codigo); // Llamada al servicio para obtener la obra social por código
    if (!obraSocial) {
      return res.status(404).json({
        message: `No se encontró la obra social con código ${codigo}`,
      });
    }
    res.status(200).json(obraSocial); // Devuelve la obra social encontrada
  } catch (error) {
    console.error(
      `Error al obtener la obra social con código ${codigo}:`,
      error.message
    );
    res.status(500).json({
      message: `Error al obtener la obra social con código ${codigo}`,
      error: error.response ? error.response.data : error.message, // Detalles del error de la API
    });
  }
};

module.exports = {
  ObtenerObrasSociales,
  ObtenerObrasSocialesPorCodigo,
};
