const Paciente = require("../models/paciente.schema");
const pacienteService = require("../services/paciente.services");
const HistoriaClinica = require("../models/historiaClinica.schema");
const ObraSocial = require("../models/obrasocial.schema");

const crearPacientes = async (req, res) => {
  try {
    // Crear pacientes con el nombre de la obra social directamente
    const pacientes = [
      {
        paciente: {
          nombre: "Jose",
          apellido: "Vides",
          dni: "35548576",
          fechaNacimiento: new Date("1990-05-15"), // Debes convertir la fecha a un objeto Date
          edad: 35,
        },
        obraSocial: "Obra Social del Personal de Seguridad",
        nroafiliado: 254620,
      },
      {
        paciente: {
          nombre: "Fernando",
          apellido: "González",
          dni: "36524125",
          fechaNacimiento: new Date("1990-07-10"), // Convertir la fecha correctamente
          edad: 33,
        },
        obraSocial: "Obra Social de la Salud",
        nroafiliado: 254630,
      },
    ];

    // Validación de que el paciente no exista previamente por DNI
    for (const paciente of pacientes) {
      if (!paciente.paciente.dni) {
        throw new Error(
          `El DNI del paciente ${paciente.paciente.nombre} es nulo.`
        );
      }

      const existe = await Paciente.findOne({
        "paciente.dni": paciente.paciente.dni,
      });
      if (existe) {
        throw new Error(`El DNI ${paciente.paciente.dni} ya está registrado.`);
      }
    }

    // Crear pacientes
    const pacientesCreados = await Paciente.insertMany(pacientes);

    // Crear historias clínicas para cada paciente creado
    const historiasClinicas = await Promise.all(
      pacientesCreados.map((paciente) =>
        HistoriaClinica.create({
          paciente: paciente._id, // Asignar el _id del paciente creado
        })
      )
    );

    // Asignar las historias clínicas a los pacientes creados
    const pacientesConHistorias = pacientesCreados.map((paciente, index) => ({
      ...paciente.toObject(),
      historiaClinicaId: historiasClinicas[index]._id, // Asocia la historia clínica creada al paciente
    }));

    // Actualizar los pacientes con el campo historiaClinicaId
    await Paciente.bulkWrite(
      pacientesConHistorias.map((paciente) => ({
        updateOne: {
          filter: { _id: paciente._id },
          update: { historiaClinicaId: paciente.historiaClinicaId },
        },
      }))
    );

    return res.status(201).json({
      message: "Pacientes creados correctamente",
      data: pacientesConHistorias,
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
