const axios = require("axios");

// Obtener medicamentos paginados
const obtenerMedicamentosPaginados = async (pagina = 1, limite = 10) => {
  try {
    const response = await axios.get(
      `https://istp1service.azurewebsites.net/api/servicio-salud/medicamentos/todos`,
      {
        params: {
          pagina: pagina,
          limite: limite,
        },
      }
    );
    return response.data; // Retorna los medicamentos de la API externa
  } catch (error) {
    throw new Error("Error al obtener los medicamentos");
  }
};
// Obtener medicamentos por descripción desde la API externa
const obtenerMedicamentosPorDescripcion = async (
  descripcion,
  pagina = 1,
  limite = 10
) => {
  try {
    const response = await axios.get(
      `https://istp1service.azurewebsites.net/api/servicio-salud/medicamentos`,
      {
        params: {
          descripcion: descripcion, // Descripción es el parámetro de búsqueda
          pagina: pagina, // Página
          limite: limite, // Límite de resultados
        },
      }
    );
    return response.data; // Retorna los medicamentos de la API externa
  } catch (error) {
    throw new Error("Error al obtener los medicamentos por descripción");
  }
};
// Obtener medicamento por código
const obtenerMedicamentoPorCodigo = async (codigo) => {
  try {
    const response = await axios.get(
      `https://istp1service.azurewebsites.net/api/servicio-salud/medicamentos/${codigo}`
    );
    return response.data; // Retorna el medicamento con ese código
  } catch (error) {
    throw new Error("Error al obtener medicamento por código");
  }
};

module.exports = {
  obtenerMedicamentosPaginados,
  obtenerMedicamentosPorDescripcion,
  obtenerMedicamentoPorCodigo,
};
