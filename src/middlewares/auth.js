const jwt = require("jsonwebtoken");

module.exports = (rolRuta) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("Token no encontrado");
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: "Autenticación fallida" });
  }
  try {
    const token = req.header("auth"); // Obtiene el token del encabezado "auth"

    if (!token) {
      return res.status(401).json({ msg: "Token no proporcionado" });
    }

    const verificarToken = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token

    if (rolRuta === verificarToken.rol) {
      req.idUsuario = verificarToken.idUsuario;
      next();
    } else {
      res.status(403).json({ msg: "No estás autorizado" });
    }

    //Para el caso de evolucion
    // Si es un controlador de evolución, verificar acceso a esa evolución específica
    if (req.params.id && req.user.rol !== "medico") {
      // Verifica si el usuario tiene acceso a la evolución
      const evolucion = await Evolucion.findById(req.params.id);
      if (!evolucion || evolucion.medico.id !== req.user.id) {
        return res
          .status(403)
          .json({ msg: "No tienes permiso para editar esta evolución" });
      }
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ msg: "Token inválido o expirado" });
  }
};
