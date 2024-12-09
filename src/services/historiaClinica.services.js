const HistoriaClinica = require("../models/historiaClinica.schema");

const crearHistoriaClinica = async (datos) => {
  try {
    const nuevaHistoria = new HistoriaClinica(datos);
    return await nuevaHistoria.save();
  } catch (error) {
    throw new Error(`Error al crear la historia clínica: ${error.message}`);
  }
};
const listarHistoriasClinicas = async () => {
  try {
    return await HistoriaClinica.find()
      .populate("pacienteId", "nombre apellido dni") // Trae datos del paciente
      .populate("evoluciones"); // Trae las evoluciones asociadas
  } catch (error) {
    throw new Error(`Error al listar las historias clínicas: ${error.message}`);
  }
};
const obtenerHistoriaClinicaPorId = async (id) => {
  try {
    return await HistoriaClinica.findById(id)
      .populate("pacienteId", "nombre apellido dni")
      .populate("evoluciones");
  } catch (error) {
    throw new Error(`Error al obtener la historia clínica: ${error.message}`);
  }
};
const agregarEvolucion = async (idHistoria, evolucion) => {
  try {
    return await HistoriaClinica.findByIdAndUpdate(
      idHistoria,
      { $push: { evoluciones: evolucion } },
      { new: true }
    );
  } catch (error) {
    throw new Error(`Error al agregar la evolución: ${error.message}`);
  }
};

const agregarPedidoLaboratorio = async (idHistoria, pedido) => {
  try {
    const nuevoPedido = { pedido, fecha: new Date() };

    // Actualizar la historia clínica con el nuevo pedido
    return await HistoriaClinica.findByIdAndUpdate(
      idHistoria,
      { $push: { pedidosLaboratorio: nuevoPedido } },
      { new: true } // Devuelve el documento actualizado
    );
  } catch (error) {
    throw new Error(
      `Error al agregar el pedido de laboratorio: ${error.message}`
    );
  }
};

module.exports = {
  crearHistoriaClinica,
  listarHistoriasClinicas,
  obtenerHistoriaClinicaPorId,
  agregarEvolucion,
  agregarPedidoLaboratorio,
};
