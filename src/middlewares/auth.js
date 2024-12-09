const jwt = require("jsonwebtoken");
const Evolucion = require("../models/evolucion.schema");

module.exports = (rolRuta) => async (req, res, next) => {
  try {
    // Verificar si existe el token
    const token =
      req.headers.authorization?.split(" ")[1] || req.header("auth");
    if (!token) {
      return res.status(401).json({ msg: "Token no proporcionado" });
    }

    // Verificar el token
    const verificarToken = jwt.verify(token, process.env.JWT_SECRET);

    // Validar el rol
    if (rolRuta && verificarToken.rol !== rolRuta) {
      return res
        .status(403)
        .json({ msg: "No estás autorizado para esta acción" });
    }

    // Adjuntar información del usuario al request
    req.idUsuario = verificarToken.idUsuario;
    req.user = verificarToken;

    // Verificar acceso a una evolución específica (si aplica)
    if (req.params.id && verificarToken.rol !== "medico") {
      const evolucion = await Evolucion.findById(req.params.id);
      if (
        !evolucion ||
        evolucion.medico.toString() !== verificarToken.idUsuario
      ) {
        return res
          .status(403)
          .json({ msg: "No tienes permiso para editar esta evolución" });
      }
    }

    // Si todo es válido, continúa al siguiente middleware
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

