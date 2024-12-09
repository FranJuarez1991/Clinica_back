const medicamentoService = require("../services/medicamento.services");
const medicamentoSchema = require("../models/medicamento.schema");

// Obtener medicamentos paginados
const obtenerMedicamentos = async (req, res) => {
  const { pagina = 1, limite = 20 } = req.query; // Parámetros de paginación

  try {
    const medicamentos = await medicamentoService.obtenerMedicamentosPaginados(
      pagina,
      limite
    );
    res.status(200).json({
      message: "Medicamentos obtenidos correctamente",
      data: medicamentos.medicamentos, // Suponiendo que la respuesta tiene un campo "medicamentos"
      total: medicamentos.total, // Total de medicamentos
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los medicamentos",
      error: error.message,
    });
  }
};
/* Obtener medicamento por descripción, mínimo 3 letras */
const obtenerMedicamentosPorDescripcion = async (req, res) => {
  const descripcion = req.query.descripcion; // Tomamos el parámetro descripcion

  // Validamos que la descripción tenga al menos 3 caracteres
  if (!descripcion || descripcion.length < 3) {
    return res.status(400).json({
      message: "La descripción debe tener al menos 3 caracteres",
    });
  }

  // Validar parámetros de paginación
  let pagina = parseInt(req.query.pagina) || 1;
  let limite = parseInt(req.query.limite) || 10;

  if (isNaN(pagina) || pagina <= 0) {
    return res
      .status(400)
      .json({ message: "La página debe ser un número positivo" });
  }
  if (isNaN(limite) || limite <= 0 || limite > 1000) {
    return res
      .status(400)
      .json({ message: "El límite debe ser un número entre 1 y 1000" });
  }

  try {
    // Llamamos al servicio de búsqueda por descripción, pasando los parámetros correctamente
    const medicamentos =
      await medicamentoService.obtenerMedicamentosPorDescripcion(
        descripcion,
        pagina,
        limite
      );
    return res.status(200).json({
      message: "Medicamentos encontrados",
      data: medicamentos,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener los medicamentos",
      error: error.message,
    });
  }
};

// Obtener medicamento por código
const obtenerMedicamentoPorCodigo = async (req, res) => {
  const { codigo } = req.params; // Parámetro del código

  try {
    const medicamento = await medicamentoService.obtenerMedicamentoPorCodigo(
      codigo
    );
    if (!medicamento) {
      return res.status(404).json({
        message: `Medicamento con código ${codigo} no encontrado`,
      });
    }
    res.status(200).json({
      message: "Medicamento obtenido correctamente",
      data: medicamento, // Retorna el medicamento con ese código
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el medicamento por código",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerMedicamentos,
  obtenerMedicamentosPorDescripcion,
  obtenerMedicamentoPorCodigo,
};
