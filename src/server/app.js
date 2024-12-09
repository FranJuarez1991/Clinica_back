require('dotenv').config();
require('../DB/config');
const express = require("express"); /*conmojs */
const path = require("path");
const morgan = require("morgan")
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = 3001;
    this.middlewares();
    this.rutas();
  }

  middlewares() {
    /*middlewares */
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname + "/public")));
  }

  rutas() {
    this.app.use("/usuarios", require("../routes/usuarios.routes"));
    this.app.use(
      "/historias-Clinicas",
      require("../routes/historiasClinicas.routes")
    );

    this.app.use("/evoluciones", require("../routes/evoluciones.routes"));
    this.app.use("/recetas", require("../routes/recetas.routes"));
    this.app.use("/pacientes", require("../routes/pacientes.routes"));
    this.app.use("/diagnosticos", require("../routes/diagnostico.routes"));
    this.app.use("/medicamentos", require("../routes/medicamento.routes"));
    this.app.use("/obrasocial", require("../routes/obrasocial.routes"));
    this.app.use("/medico", require("../routes/medico.routes"));
    this.app.use(
      "/historiasClinicas",
      require("../routes/historiasClinicas.routes")
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor levantado", this.port);
    });
  }
}
module.exports = Server;
