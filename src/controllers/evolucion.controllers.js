const Evolucion = require("../models/evolucion.schema");
const {
  validarDiagnostico,
  esEditablePorMedico,
  obtenerHistoriaClinicaPorId,
} = require("../services/evolucion.services");

// Crear una evolución
const crearEvolucion = async (req, res) => {
  try {
    const { diagnosticoCodigo, textoLibre, historiaClinicaId } = req.body;

    // Validación manual de datos
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

    // Validar rol del usuario
    if (req.user.rol !== "medico") {
      return res
        .status(403)
        .json({ error: "Solo los médicos pueden crear evoluciones." });
    }

    // Validar diagnóstico y obtener información
    const diagnostico = await validarDiagnostico(diagnosticoCodigo);

    // Validar historia clínica
    const historiaClinica = await obtenerHistoriaClinicaPorId(
      historiaClinicaId
    );

    // Crear nueva evolución
    const nuevaEvolucion = new Evolucion({
      diagnostico: diagnostico._id,
      texto: textoLibre,
      medico: req.user.id,
      fecha: new Date(),
    });

    // Agregar evolución a la historia clínica
    historiaClinica.evoluciones.push(nuevaEvolucion);

    // Guardar evolución e historia clínica
    await Promise.all([nuevaEvolucion.save(), historiaClinica.save()]);

    res.status(201).json({ mensaje: "Evolución creada exitosamente." });
  } catch (error) {
    console.error("Error al crear evolución:", error.message);
    res.status(500).json({ error: error.message || "Error del servidor" });
  }
};

// Editar una evolución
const editarEvolucion = async (req, res) => {
  try {
    const { id } = req.params;
    const { textoEvolucion } = req.body;

    // Validación manual de datos
    if (!textoEvolucion || textoEvolucion.length < 10) {
      return res.status(400).json({
        error: "El texto de la evolución debe tener al menos 10 caracteres.",
      });
    }

    // Buscar evolución
    const evolucion = await Evolucion.findById(id);
    if (!evolucion) {
      return res.status(404).json({ error: "Evolución no encontrada." });
    }

    // Validar permisos y tiempo
    if (!esEditablePorMedico(evolucion, req.user.id)) {
      return res.status(403).json({
        error: "No puedes editar esta evolución o el tiempo ha expirado.",
      });
    }

    // Actualizar el texto de la evolución
    evolucion.texto = textoEvolucion;
    await evolucion.save();

    res.status(200).json({ mensaje: "Evolución actualizada exitosamente." });
  } catch (error) {
    console.error("Error al editar evolución:", error.message);
    res.status(500).json({ error: error.message || "Error del servidor" });
  }
};

module.exports = { crearEvolucion, editarEvolucion };
