const { buscarDiagnosticoPorCodigo } = require("./diagnostico.services");
const HistoriaClinica = require("../models/historiaClinica.schema");
const Evolucion = require("../models/evolucion.schema");

// Validar si el diagnóstico existe
const validarDiagnostico = async (codigo) => {
  const diagnostico = await buscarDiagnosticoPorCodigo(codigo);
  if (!diagnostico) throw new Error("Diagnóstico no encontrado.");
  return diagnostico;
};

// Validar si la evolución es editable por el médico
const esEditablePorMedico = async (evolucion, medicoId) => {
  const medico = await MedicoModel.findById(evolucion.medico); // Cambio aquí
  if (!medico) throw new Error("El médico no existe.");

  if (evolucion.medico.toString() !== medicoId) return false;

  const limiteEdicion = new Date(evolucion.fecha);
  limiteEdicion.setHours(limiteEdicion.getHours() + 48);
  return new Date() <= limiteEdicion;
};

// Buscar la historia clínica por ID
const obtenerHistoriaClinicaPorId = async (historiaClinicaId) => {
  const historiaClinica = await HistoriaClinica.findById(historiaClinicaId);
  if (!historiaClinica) throw new Error("Historia clínica no encontrada.");
  return historiaClinica;
};

module.exports = {
  validarDiagnostico,
  esEditablePorMedico,
  obtenerHistoriaClinicaPorId,
};
