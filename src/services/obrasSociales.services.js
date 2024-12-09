const axios = require("axios");

const API_BASE_URL =
  "https://istp1service.azurewebsites.net/api/servicio-salud/";

const obtenerObrasSociales = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}obras-sociales`);
    return response.data; // Devuelve el resultado de la API
  } catch (error) {
    console.error("Error al obtener todas las obras sociales:", error.message);
    throw error;
  }
};

const obtenerObraSocialPorCodigo = async (codigo) => {
  try {
    const response = await axios.get(`${API_BASE_URL}obras-sociales/${codigo}`);
    return response.data; // Devuelve el resultado de la API
  } catch (error) {
    console.error(
      `Error al obtener la obra social con código ${codigo}:`,
      error.message
    );
    throw error;
  }
};

module.exports = {
  obtenerObrasSociales,
  obtenerObraSocialPorCodigo,
};
