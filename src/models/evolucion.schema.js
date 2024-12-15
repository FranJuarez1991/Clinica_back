const mongoose = require("mongoose");

const evolucionSchema = new mongoose.Schema(
  {
    diagnostico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diagnostico",
      required: [true, "El diagnóstico es obligatorio."],
    },
    texto: {
      type: String,
      required: [true, "El texto de la evolución es obligatorio."],
      minlength: [
        10,
        "El texto de la evolución debe tener al menos 10 caracteres.",
      ],
      trim: true, // Elimina espacios en blanco al inicio y al final
    },
    medico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medico", // Asegúrate de que la colección se llame "Medico"
      required: [true, "El ID del médico es obligatorio."],
    },
    historiaClinica: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HistoriaClinica",
      required: [true, "El ID de la historia clínica es obligatorio."],
    },
    fecha: {
      type: Date,
      default: Date.now,
      immutable: true, // No permite modificaciones después de su creación
    },
    tipoEstudio: {
      type: String,
      default: "N/A",
      enum: ["N/A", "Laboratorio", "Imagen", "Consulta", "Otro"], // Opciones válidas
    },
  },
  {
    timestamps: true, // Crea automáticamente `createdAt` y `updatedAt`
  }
);

// Índices para mejorar consultas
evolucionSchema.index({ medico: 1 });
evolucionSchema.index({ historiaClinica: 1, fecha: -1 });

module.exports = mongoose.model("Evolucion", evolucionSchema);
