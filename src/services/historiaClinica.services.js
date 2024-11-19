const HistoriaClinica = require("../models/historiaClinica.schema");

const crearHistoriaClinica = async (datos) => {
  try {
    const nuevaHistoria = new HistoriaClinica(datos);
    return await nuevaHistoria.save();
  } catch (error) {
    throw new Error("Error al crear la historia clínica.");
  }
};

const listarHistoriasClinicas = async () => {
  try {
    return await HistoriaClinica.find().populate("evoluciones");
  } catch (error) {
    throw new Error("Error al listar las historias clínicas.");
  }
};

const obtenerHistoriaClinicaPorId = async (id) => {
  try {
    return await HistoriaClinica.findById(id).populate("evoluciones");
  } catch (error) {
    throw new Error("Error al obtener la historia clínica.");
  }
};

const agregarDiagnostico = async (idHistoria, diagnostico) => {
  try {
    return await HistoriaClinica.findByIdAndUpdate(
      idHistoria,
      { $push: { diagnosticos: diagnostico } },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error al agregar el diagnóstico.");
  }
};

module.exports = {
  crearHistoriaClinica,
  listarHistoriasClinicas,
  obtenerHistoriaClinicaPorId,
  agregarDiagnostico,
};
