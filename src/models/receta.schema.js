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

  {
    timestamps: true,
    validate: {
      // Validación para limitar a 2 medicamentos como máximo
      validator: function (v) {
        return v.medicamentos.length <= 2;
      },
      message: "No puede haber más de 2 medicamentos en la receta.",
    },
  }
);


module.exports = mongoose.model("Receta", recetaSchema);
