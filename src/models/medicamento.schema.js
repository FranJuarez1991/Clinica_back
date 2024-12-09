const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const medicamentoSchema = new Schema({
  codigo: { type: Number, required: true },
  descripcion: { type: String, required: true },
  formato: { type: String, required: true },
});

module.exports = model("Medicamento", medicamentoSchema);
