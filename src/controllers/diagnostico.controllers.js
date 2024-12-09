const {
  obtenerDiagnosticos,
  agregarDiagnostico,
  buscarDiagnosticoPorCodigo,
} = require("../services/diagnostico.services");

// Lista de diagnósticos
const diagnosticos = [
  { codigo: "A00", descripcion: "Covid" },
  { codigo: "B01", descripcion: "Varicela" },
  { codigo: "D01", descripcion: "Dengue" },
  { codigo: "C01", descripcion: "Sinusitis crónica" },
  { codigo: "E01", descripcion: "Diabetes mellitus" },
  { codigo: "F01", descripcion: "Fiebre" },
  { codigo: "G01", descripcion: "Gripe" },
  { codigo: "I01", descripcion: "Hipertensión" },
];

// Agregar diagnósticos predefinidos
const crearDiagnostico = async (req, res) => {
  try {
    const resultados = await Promise.all(
      diagnosticos.map(async (diag) => {
        const existente = await buscarDiagnosticoPorCodigo(diag.codigo);
        if (!existente) {
          return await agregarDiagnostico(diag);
        }
        return null; // Ignorar si ya existe
      })
    );

    // Filtrar los diagnósticos que se agregaron exitosamente
    const nuevosDiagnosticos = resultados.filter((diag) => diag !== null);

    res.status(201).json({
      mensaje: "Diagnósticos predefinidos procesados exitosamente",
      agregados: nuevosDiagnosticos,
    });
  } catch (error) {
    console.error("Error al crear diagnósticos predefinidos:", error.message);
    res.status(500).json({ error: "Error al crear diagnósticos predefinidos" });
  }
};

// Obtener todos los diagnósticos
const listarDiagnosticos = async (req, res) => {
  try {
    const diagnosticos = await obtenerDiagnosticos();
    res.status(200).json(diagnosticos);
  } catch (error) {
    console.error("Error al listar los diagnósticos:", error.message);
    res.status(500).json({ error: "Error al obtener los diagnósticos" });
  }
};

// Buscar un diagnóstico por código
const obtenerDiagnosticoPorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const diagnostico = await buscarDiagnosticoPorCodigo(codigo);

    if (!diagnostico) {
      return res.status(404).json({ error: "Diagnóstico no encontrado" });
    }

    res.status(200).json(diagnostico);
  } catch (error) {
    console.error("Error al buscar el diagnóstico:", error.message);
    res.status(500).json({ error: "Error al buscar el diagnóstico" });
  }
};

module.exports = {
  listarDiagnosticos,
  crearDiagnostico,
  obtenerDiagnosticoPorCodigo,
};
