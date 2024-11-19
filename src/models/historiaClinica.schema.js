const { Schema, model, Types } = require("mongoose"); // Importa Types para usar ObjectId

const historiaClinicaSchema = new Schema(
  {
    paciente: {
      nombre: { type: String, required: true },
      apellido: { type: String, required: true },
      dni: {
        type: String,
        required: true,
        unique: true,
        minlength: 7,
        maxlength: 10,
      },
    },
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
