const {
  obtenerMedicamentoPorCodigo,
} = require("../services/medicamento.services");
const {
  obtenerObraSocialPorCodigo,
} = require("../services/obrasSociales.services");
const Receta = require("../models/receta.schema"); // Modelo para guardar la receta

// Crear una nueva receta
const crearReceta = async (req, res) => {
  const { medicamentoCodigo, dosis, frecuencia, obraSocialCodigo, pacienteId } =
    req.body;

  try {
    // Obtener el medicamento usando su código
    const medicamento = await obtenerMedicamentoPorCodigo(medicamentoCodigo);
    if (!medicamento) {
      return res.status(404).json({ mensaje: "Medicamento no encontrado" });
    }

    // Obtener la obra social si se proporciona el código
    const obraSocial = obraSocialCodigo
      ? await obtenerObraSocialPorCodigo(obraSocialCodigo)
      : null;

    // Crear el objeto de la receta
    const nuevaReceta = {
      historiaClinicaId: pacienteId, // Aquí suponemos que tienes la relación con la historia clínica del paciente
      medicamentos: [
        {
          nombre: medicamento.nombre,
          dosis,
          frecuencia,
        },
      ],
      observaciones: req.body.observaciones || "", // para las observaciones
      fecha: new Date(),
    };

    // Si se tiene una obra social, agregarla a la receta
    if (obraSocial) {
      nuevaReceta.obraSocial = obraSocial.nombre;
    }

    // Guardar la receta en la base de datos
    const recetaGuardada = await Receta.create(nuevaReceta);

    // Devolver la respuesta al cliente
    res.status(201).json({
      mensaje: "Receta creada exitosamente",
      receta: recetaGuardada,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: "Error al crear la receta" });
  }
};

// Listar las recetas por historia clínica
const listarRecetasPorHistoriaClinica = async (req, res) => {
  const { historiaClinicaId } = req.params;

  try {
    // Buscar todas las recetas relacionadas con la historia clínica
    const recetas = await Receta.find({ historiaClinicaId })
      .populate("historiaClinicaId")
      .exec();

    res.status(200).json(recetas);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ mensaje: "Error al obtener las recetas" });
  }
};

module.exports = {
  crearReceta,
  listarRecetasPorHistoriaClinica,
};
