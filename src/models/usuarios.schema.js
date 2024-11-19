const {Schema, model} = require("mongoose");

const UsersSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9_]+$/, // Solo permite letras, números y guiones bajos
    minlength: 4, // Longitud mínima de 4 caracteres
    maxlength: 30, // Longitud máxima de 30 caracteres
  },
  emailUsuario: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Validar formato de email
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
});
/*sacar el dato contraseña del esquema */
UsersSchema.methods.toJSON = function () {
  const { contrasenia, ...usuario } = this.toObject();

  return usuario;
};

const UserModel = model("medico", UsersSchema);
module.exports = UserModel;