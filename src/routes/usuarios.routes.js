const { Router } = require("express");
const {
  obtenerUnUsuario,
  crearUnUsuario,
  actualizarUnUsuario,
  eliminarUnUsuario,
  obtenerTodosLosUsuarios,
  inicioDeSesionUsuario,
} = require("../controllers/usuarios.controllers");
const { check } = require("express-validator");
const router = Router();

// Definir rutas
router.get("/", obtenerTodosLosUsuarios);
router.get("/:idUsuario", obtenerUnUsuario);

router.post(
  "/",
  [
    check("nombreUsuario", "Campo NOMBREUSUARIO esta vacio").not().isEmpty(),
    check("contrasenia", "Campo CONTRASEÑA esta vacio").not().isEmpty(),
    check("contrasenia", "Min: 8 caracteres y Max: 30 caracteres").isLength({
      min: 8,
      max: 30,
    }),
  ],
  crearUnUsuario
);
router.post("/iniciarSesion", inicioDeSesionUsuario);


router.put("/:idUsuario", actualizarUnUsuario);

router.delete("/:idUsuario", eliminarUnUsuario);

module.exports = router;
