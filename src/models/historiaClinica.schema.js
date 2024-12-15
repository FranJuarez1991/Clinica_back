const mongoose = require("mongoose");

const HistoriaClinicaSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true,
  },
  evoluciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evolucion",
    },
  ],
});

module.exports = mongoose.model("HistoriaClinica", HistoriaClinicaSchema);
