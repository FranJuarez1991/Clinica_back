const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const obraSocialSchema = new Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true, // Para evitar duplicados de códigos
      trim: true,
    },
    denominacion: {
      type: String,
      required: true,
      trim: true,
    },
    sigla: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
  }
);

module.exports = model("ObraSocial", obraSocialSchema);
