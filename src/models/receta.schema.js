const mongoose = require("mongoose");

const recetaSchema = new mongoose.Schema(
  {
    historiaClinicaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HistoriaClinica",
      required: true,
    },
    medicamentos: [
      {
        nombre: { type: String, required: true },
        dosis: { type: String, required: true },
        frecuencia: { type: String, required: true },
      },
    ],
    observaciones: { type: String, maxlength: 500 },
    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receta", recetaSchema);
