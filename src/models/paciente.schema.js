const { Schema, model } = require("mongoose");

const pacienteSchema = new Schema({
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
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    edad: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  historiaClinicaId: {
    type: Schema.Types.ObjectId,
    ref: "HistoriaClinica",
    //required: false, // Lo hacemos opcional
  },
  obraSocial: {
    type: String,
    required: true,
  },
  nroafiliado: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = model("Paciente", pacienteSchema);
