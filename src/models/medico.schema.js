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
    codigoBarra: { type: String, required: true }, // Código de barra del recetario
    diagnostico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diagnostico", // Referencia al diagnóstico del paciente
      required: true,
    },
    firmaElectronica: { type: String }, // Firma electrónica del médico (podría ser un enlace a una imagen o archivo)
    medico: {
      nombreYapellido: { type: String, required: true },
      matricula: { type: String, required: true },
      especialidad: {
        type: String,
        enum: [
          "Cardiología",
          "Pediatría",
          "Dermatología",
          "Cirugía",
          "Clínico",
        ],
        required: true,
      },
    },
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

const Medico = mongoose.model("Medico", medicoSchema); // Registro del modelo

module.exports = Medico;
