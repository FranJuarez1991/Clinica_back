const evolucionService = require("../services/evolucion.services");

const crearEvolucion = async (req, res) => {
  try {
    const evolucion = await evolucionService.crearEvolucion(req.body);
    res.status(201).json(evolucion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editarEvolucion = async (req, res) => {
  try {
    const evolucion = await evolucionService.editarEvolucion(
      req.params.id,
      req.body,
      req.user.id
    );
    res.status(200).json(evolucion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crearEvolucion, editarEvolucion };
