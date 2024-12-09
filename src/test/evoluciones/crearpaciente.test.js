const { crearPacientes } = require("../../controllers/paciente.controllers");
const Paciente = require("../../models/paciente.schema");
const HistoriaClinica = require("../../models/historiaClinica.schema");

jest.mock("../../models/paciente.schema");
jest.mock("../../models/historiaClinica.schema");

describe("Controlador: crearPacientes", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: [
        {
          paciente: {
            nombre: "Jose",
            apellido: "Vides",
            dni: "35548576",
            fechaNacimiento: new Date("1990-05-15"),
            edad: 35,
          },
          obraSocial: "Obra Social del Personal de Seguridad",
          nroafiliado: 254620,
        },
      ],
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  test("debe devolver un error si un paciente ya existe", async () => {
    // Mock de un paciente ya existente
    Paciente.findOne.mockResolvedValue({ paciente: { dni: "35548576" } });

    await crearPacientes(mockRequest, mockResponse);

    // Verificaciones
    expect(Paciente.findOne).toHaveBeenCalledWith({
      "paciente.dni": "35548576",
    });
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Error al crear los pacientes",
      error: "El DNI 35548576 ya está registrado.",
    });
  });
});
