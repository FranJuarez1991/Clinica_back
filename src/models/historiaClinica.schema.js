const { Schema, model, Types } = require("mongoose"); // Importa Types para usar ObjectId

const historiaClinicaSchema = new Schema(
  {
    diagnosticos: [
      {
        diagnostico: { type: String, required: true },
        fecha: { type: Date, default: Date.now },
      },
    ],
    evoluciones: [
      {
        type: Types.ObjectId, // Usa Types.ObjectId en lugar de mongoose.Schema.Types.ObjectId
        ref: "Evolucion",
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

module.exports = model("HistoriaClinica", historiaClinicaSchema); // Usa el nombre correcto del esquema
