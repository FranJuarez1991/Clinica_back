const Paciente = require("../models/paciente.schema");
const pacienteService = require("../services/paciente.services");

// Función para crear pacientes
const crearPacientes = async (req, res) => {
  try {
    const pacientes = [
      {
        paciente: {
          nombre: "Jose",
          apellido: "Vides",
          dni: "35548576",
        },
      },
      {
        paciente: {
          nombre: "Ana",
          apellido: "González",
          dni: "98765432",
        },
      },
    ];

    const resultado = await Paciente.insertMany(pacientes);

    return res.status(201).json({
      message: "Pacientes creados correctamente",
      data: resultado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear los pacientes",
      error: error.message,
    });
  }
};

// Función para buscar un paciente por DNI
const buscarPaciente = async (req, res) => {
  const { dni } = req.params; // Obtenemos el DNI desde los parámetros de la URL

  try {
    const paciente = await pacienteService.buscarPacientePorDNI(dni);

    if (!paciente) {
      return res.status(404).json({
        message: `No se encontró un paciente con el DNI ${dni}`,
      });
    }

    return res.status(200).json({
      message: "Paciente encontrado",
      data: paciente,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al buscar paciente",
      error: error.message,
    });
  }
};

module.exports = {
  crearPacientes,
  buscarPaciente,
};
