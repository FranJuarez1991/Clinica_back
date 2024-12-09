const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9_]+$/, // Solo permite letras, números y guiones bajos
    minlength: 4,
    maxlength: 30,
  },
  emailUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  contrasenia: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  rol: {
    type: String,
    default: "medico",
    enum: ["recepcionista", "medico"],
  },
  medico: {
    // Aquí se relaciona el modelo Medico con el Usuario
    type: Schema.Types.ObjectId,
    ref: "Medico", // Refiriéndose al modelo Medico
    required: function () {
      return this.rol === "medico";
    },
  },
});

UsersSchema.methods.toJSON = function () {
  const { contrasenia, ...usuario } = this.toObject();
  return usuario;
};

const UserModel = model("usuario", UsersSchema);
module.exports = UserModel;
