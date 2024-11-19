const { validationResult } = require("express-validator");
const serviciosUsuarios = require("../services/usuarios.services");

const obtenerTodosLosUsuarios = async (req, res) => {
  const result = await serviciosUsuarios.obtenerUsuarios();
  if (result.statusCode === 200) {
    res.status(200).json(result.usuarios);
  } else {
    res.status(500).json({ msg: "Error al traer los usuarios" });
  }
};

const obtenerUnUsuario = async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const result = await serviciosUsuarios.obtenerUsuario(req.params.idUsuario);
  if (result.statusCode === 200) {
    res.status(200).json(result.usuario);
  } else {
    res.status(500).json({ msg: "Error al traer el usuario" });
  }
};

const crearUnUsuario = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.array() });
  }

  const result = await serviciosUsuarios.crearUsuario(req.body);
  if (result.statusCode === 201) {
    res.status(201).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al crear el usuario: " + result.msg });
  }
};

const actualizarUnUsuario = async (req, res) => {
  const result = await serviciosUsuarios.actualizarUsuario(
    req.params.idUsuario,
    req.body
  );

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al actualizar el usuario" });
  }
};

const eliminarUnUsuario = async (req, res) => {
  const result = await serviciosUsuarios.eliminarUsuario(req.params.idUsuario);
  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al eliminar el usuario" });
  }
};

const inicioDeSesionUsuario = async (req, res) => {
  const result = await serviciosUsuarios.iniciarSesion(req.body);

  if (result.statusCode === 200) {
    res.status(200).json({ msg: result.msg, token: result.token });
  } else if (result.statusCode === 400) {
    res.status(400).json({ msg: result.msg });
  } else {
    res.status(500).json({ msg: "Error al iniciar sesion del usuario" });
  }
};


module.exports = {
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  crearUnUsuario,
  actualizarUnUsuario,
  eliminarUnUsuario,
  inicioDeSesionUsuario,
};
