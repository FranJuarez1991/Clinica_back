const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const evolucionSchema = new Schema(
  {
    medico: {
      type: Types.ObjectId, // Referencia al modelo Medico
      ref: "Medico",
      required: true,
    },
    fechaHora: { type: Date, default: Date.now },
    diagnostico: {
      type: Types.ObjectId, // Se refiere al modelo de Diagnóstico
      ref: "Diagnostico",
      required: true,
    },
    textoLibre: { type: String },
    plantilla: { type: String },
    historiaClinicaId: {
      type: Types.ObjectId,
      ref: "HistoriaClinica",
      required: true,
    },
    editableHasta: {
      type: Date,
      default: () => Date.now() + 48 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

module.exports = model("Evolucion", evolucionSchema);
