const UserModel = require("../models/usuarios.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const obtenerUsuarios = async () => {
  //const usuarios = await UserModel.find({}, "-contrasenia");
  const usuarios = await UserModel.find();

  return {
    usuarios,
    statusCode: 200,
  };
};
const obtenerUsuario = async (idUsuario) => {
  const usuario = await UserModel.findOne({ _id: idUsuario });
  /* const usuario = usuarios.find((user) => user.id === Number(idUsuario));*/
  return {
    usuario,
    statusCode: 200,
  };
};

const crearUsuario = async (body) => {
  const usuarioExiste = await UserModel.findOne({
    nombreUsuario: body.nombreUsuario,
  });

  if (usuarioExiste) {
    return {
      msg: "usuario No Disponible",
      StatusCode: 400,
    };
  }

  if (
    (body?.rol && body?.rol !== "medico") ||
    (body?.rol && body?.rol !== "recepcionista")
  ) {
    return {
      msg: "Rol Incorrecto. Solo se Puede elegir recepcionista/medico",
      StatusCode: 400,
    };
  }
  const usuario = new UserModel(body);

  /*Generar el hasheo de contraseña */
  const salt = await bcrypt.genSalt(10);
  usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, salt);

  await usuario.save();

  return {
    msg: "Usuario Creado con Éxito",
    statusCode: 201,
  };
};
const actualizarUsuario = async (idUsuario, body) => {
  await UserModel.findByIdAndUpdate({ _id: idUsuario }, body);

  return {
    msg: "Usuario Actualizado con Éxito",
    statusCode: 200,
  };
};
const eliminarUsuario = async (idUsuario) => {
  await UserModel.findByIdAndDelete({ _id: idUsuario });
  return {
    msg: "Usuario Eliminado con Éxito",
    statusCode: 200,
  };
};

const iniciarSesion = async (body) => {
  const usuarioExiste = await UserModel.findOne({
    nombreUsuario: body.nombreUsuario,
  });

  if (!usuarioExiste) {
    return {
      msg: "Usuario y/o contaseña incorrecta",
      statusCode: 400,
    };
  }
  const compararContrasenias = await bcrypt.compare(
    body.contrasenia,
    usuarioExiste.contrasenia
  );

  if (compararContrasenias) {
    const payload = {
      idUsuario: usuarioExiste._id,
      rol: usuarioExiste.rol,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return {
      msg: "usuario logueado con Éxito",
      token,
      statusCode: 200,
    };
  }
  return {
    msg: "Usuario y/o contraseña incorrecta",
    statusCode: 400,
  };
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  iniciarSesion,
};
