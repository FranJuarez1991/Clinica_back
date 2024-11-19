const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const evolucionSchema = new Schema(
  {
    medico: {
      nombre: { type: String, required: true },
      rol: { type: String, required: true },
    },
    fechaHora: { type: Date, default: Date.now },
    diagnostico: { type: String, required: true },
    textoLibre: { type: String },
    plantilla: { type: String },
    historiaClinicaId: {
      type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model("Evolucion", evolucionSchema);
