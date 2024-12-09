const Diagnostico = require("../models/diagnostico.schema");

// Obtener todos los diagnósticos
const obtenerDiagnosticos = async () => {
  return await Diagnostico.find({});
};

// Agregar un nuevo diagnóstico
const agregarDiagnostico = async (diagnosticoData) => {
  const diagnostico = new Diagnostico(diagnosticoData);
  return await diagnostico.save();
};

// Buscar un diagnóstico por código
const buscarDiagnosticoPorCodigo = async (codigo) => {
  return await Diagnostico.findOne({ codigo });
};

module.exports = {
  obtenerDiagnosticos,
  agregarDiagnostico,
  buscarDiagnosticoPorCodigo,
};
