const Paciente = require("../models/paciente.schema");
const HistoriaClinica = require("../models/historiaClinica.schema");
const historiaClinicaService = require("../services/historiaClinica.services");

const listarHistoriasClinicas = async (req, res) => {
  try {
    const historias = await historiaClinicaService.listarHistoriasClinicas();
    res.status(200).json(historias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearHistoriaClinica = async (req, res) => {
  try {
    const { pacienteId, datosHistoria } = req.body;

    if (!pacienteId || !datosHistoria) {
      return res.status(400).json({
        msg: "Paciente ID y datos de la historia clínica son obligatorios",
      });
    }

    const paciente = await Paciente.findById(pacienteId);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    const historia = await historiaClinicaService.crearHistoriaClinica(
      datosHistoria
    );

    paciente.historiaClinicaId = historia._id;
    await paciente.save();

    res.status(201).json({
      message: "Historia clínica creada y asociada al paciente",
      data: historia,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

const agregarEvolucion = async (req, res) => {
  try {
    const { historiaClinicaId, evolucion } = req.body;

    if (!historiaClinicaId || !evolucion) {
      return res
        .status(400)
        .json({ msg: "ID de historia clínica y evolución son obligatorios" });
    }

    const historiaActualizada = await HistoriaClinica.findByIdAndUpdate(
      historiaClinicaId,
      { $push: { evoluciones: evolucion } },
      { new: true }
    );

    if (!historiaActualizada) {
      return res.status(404).json({ msg: "Historia clínica no encontrada" });
    }

    res.status(201).json({
      msg: "Evolución agregada correctamente",
      data: historiaActualizada,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const agregarPedidoLaboratorio = async (req, res) => {
  try {
    const { historiaClinicaId, tipoEstudio, observaciones, fecha } = req.body;

    if (!historiaClinicaId || !tipoEstudio) {
      return res.status(400).json({
        msg: "ID de historia clínica y tipo de estudio son obligatorios",
      });
    }

    const pedido = {
      pedido: tipoEstudio,
      observaciones: observaciones || "",
      fecha: fecha || new Date(),
    };

    const historiaActualizada = await HistoriaClinica.findByIdAndUpdate(
      historiaClinicaId,
      { $push: { pedidosLaboratorio: pedido } },
      { new: true }
    );

    if (!historiaActualizada) {
      return res.status(404).json({ msg: "Historia clínica no encontrada" });
    }

    res.status(201).json({
      msg: "Pedido de laboratorio agregado correctamente",
      data: historiaActualizada,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarHistoriasClinicas,
  crearHistoriaClinica,
  agregarEvolucion,
  agregarPedidoLaboratorio,
};
