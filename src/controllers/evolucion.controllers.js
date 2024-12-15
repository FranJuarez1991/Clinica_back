const Evolucion = require("../models/evolucion.schema");
const {
  validarDiagnostico,
  obtenerEvolucionesPorHistoriaClinica,
} = require("../services/evolucion.services");
const HistoriaClinica = require("../models/historiaClinica.schema");

// Crear evolución en el backend
const crearEvolucion = async (req, res) => {
  try {
    const { diagnosticoCodigo, textoLibre, historiaClinicaId, tipoEstudio } =
      req.body;

    // Validación de datos
    if (!diagnosticoCodigo || typeof diagnosticoCodigo !== "string") {
      return res
        .status(400)
        .json({ error: "El código del diagnóstico es obligatorio." });
    }
    if (!textoLibre || textoLibre.length < 10) {
      return res.status(400).json({
        error: "El texto de la evolución debe tener al menos 10 caracteres.",
      });
    }
    if (!historiaClinicaId) {
      return res
        .status(400)
        .json({ error: "El ID de la historia clínica es obligatorio." });
    }

    // Validar rol
    if (req.user.rol !== "medico") {
      return res
        .status(403)
        .json({ error: "Solo los médicos pueden crear evoluciones." });
    }

    // Validaciones de datos relacionados
    const diagnostico = await validarDiagnostico(diagnosticoCodigo);
    const historiaClinica = await HistoriaClinica.findById(historiaClinicaId);
    if (!historiaClinica) {
      return res.status(404).json({ error: "Historia clínica no encontrada." });
    }

    // Crear la evolución
    const nuevaEvolucion = new Evolucion({
      diagnostico: diagnostico._id,
      texto: textoLibre,
      medico: req.user.idUsuario, // El ID del médico que está creando la evolución
      historiaClinica: historiaClinica._id,
      fecha: new Date(),
      tipoEstudio: tipoEstudio || "N/A",
    });

    await nuevaEvolucion.save();
    historiaClinica.evoluciones.push(nuevaEvolucion._id);
    await historiaClinica.save();

    res.status(201).json({ mensaje: "Evolución creada exitosamente." });
  } catch (error) {
    console.error("Error al crear evolución:", error.message);
    res.status(500).json({
      error: "No se pudo crear la evolución, intente nuevamente.",
      detalle: error.message,
    });
  }
};

// Obtener evoluciones de un paciente
const obtenerEvoluciones = async (req, res) => {
  try {
    console.log(
      "Obteniendo evoluciones para historia clínica:",
      req.params.historiaClinicaId
    );

    const evoluciones = await obtenerEvolucionesPorHistoriaClinica(
      req.params.historiaClinicaId
    );

    if (!evoluciones.length) {
      return res.status(404).json({
        message: "No se encontraron evoluciones para esta historia clínica.",
      });
    }

    console.log("Evoluciones encontradas:", evoluciones);
    res.status(200).json(evoluciones);
  } catch (error) {
    console.error("Error al obtener evoluciones:", error.message);
    res.status(500).json({
      message: "Error al obtener las evoluciones.",
      detalle: error.message,
    });
  }
};
// Editar evolución
const editarEvolucion = async (req, res) => {
  try {
    const { diagnosticoCodigo, textoLibre, tipoEstudio } = req.body;

    // Obtén el ID de la evolución desde la URL
    const evolucionId = req.params.id;

    // Validación de datos
    if (!diagnosticoCodigo || typeof diagnosticoCodigo !== "string") {
      return res
        .status(400)
        .json({ error: "El código del diagnóstico es obligatorio." });
    }
    if (!textoLibre || textoLibre.length < 10) {
      return res.status(400).json({
        error: "El texto de la evolución debe tener al menos 10 caracteres.",
      });
    }

    if (!evolucionId) {
      return res
        .status(400)
        .json({ error: "El ID de la evolución es obligatorio." });
    }

    // Verificar si la evolución existe
    const evolucion = await Evolucion.findById(evolucionId);
    if (!evolucion) {
      return res.status(404).json({ error: "Evolución no encontrada." });
    }

    // Validar si el médico tiene permisos para editar la evolución
    if (!esEditablePorMedico(evolucion, req.user.idUsuario)) {
      return res.status(403).json({
        error: "El médico no tiene permisos para editar esta evolución.",
      });
    }

    // Validar el diagnóstico
    const diagnostico = await validarDiagnostico(diagnosticoCodigo);

    // Actualizar la evolución
    evolucion.diagnostico = diagnostico._id;
    evolucion.texto = textoLibre;
    evolucion.tipoEstudio = tipoEstudio || evolucion.tipoEstudio; // Mantener tipo de estudio anterior si no se cambia
    evolucion.fecha = new Date(); // Puedes actualizar la fecha si es necesario

    await evolucion.save();

    res.status(200).json({ mensaje: "Evolución actualizada exitosamente." });
  } catch (error) {
    console.error("Error al editar evolución:", error.message);
    res.status(500).json({
      error: "No se pudo editar la evolución, intente nuevamente.",
      detalle: error.message,
    });
  }
};

module.exports = {
  crearEvolucion,
  obtenerEvoluciones,
  editarEvolucion,
};
