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
  },
});
module.exports = model("Paciente", pacienteSchema); // Usa el nombre correcto del esquema
