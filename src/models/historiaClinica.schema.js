const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const historiaClinicaSchema = new Schema(
  {
    diagnosticos: [
      {
        tipo: {
          type: Types.ObjectId,
          ref: "Diagnostico", // Referencia al modelo de Diagnóstico
          required: true,
        },
        fecha: { type: Date, default: Date.now },
      },
    ],
    evoluciones: [
      {
        type: Types.ObjectId,
        ref: "Evolucion", // Referencia al modelo de Evolución
      },
    ],
    pedidosLaboratorio: [
      {
        pedido: { type: String, required: true },
        fecha: { type: Date, default: Date.now },
      },
    ],
    recetas: [
      {
        receta: { type: String, required: true },
        fecha: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("HistoriaClinica", historiaClinicaSchema);
