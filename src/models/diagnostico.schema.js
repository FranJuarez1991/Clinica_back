const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diagnosticoSchema = new Schema({
  codigo: { type: String, required: true, unique: true },
  descripcion: { type: String, required: true },
});

module.exports = mongoose.model("Diagnostico", diagnosticoSchema);
