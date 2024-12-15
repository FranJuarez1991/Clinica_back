const { crearEvolucion } = require("../../controllers/evolucion.controllers");
const Evolucion = require("../../models/evolucion.schema");
const HistoriaClinica = require("../../models/historiaClinica.schema");
const { validarDiagnostico } = require("../../services/evolucion.services");

jest.mock("../../models/evolucion.schema", () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({
        _id: "evolucion123",
      }),
    };
  });
});

jest.mock("../../models/historiaClinica.schema", () => {
  return {
    findById: jest.fn().mockResolvedValue({
      _id: "12345",
      evoluciones: [],
      save: jest.fn(),
    }),
  };
});

jest.mock("../../services/evolucion.services");

describe("Controlador: crearEvolucion", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        diagnosticoCodigo: "D1234",
        textoLibre: "Texto de ejemplo para la evolución",
        historiaClinicaId: "12345",
        tipoEstudio: "Radiografía",
      },
      user: {
        rol: "medico",
        idUsuario: "medico123",
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  test("debe devolver error si faltan datos obligatorios", async () => {
    mockRequest.body.diagnosticoCodigo = ""; // Falta el código de diagnóstico

    await crearEvolucion(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "El código del diagnóstico es obligatorio.",
    });
  });

  test("debe devolver error si no se encuentra la historia clínica", async () => {
    HistoriaClinica.findById.mockResolvedValue(null); // No se encuentra la historia clínica

    await crearEvolucion(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Historia clínica no encontrada.",
    });
  });

  test("debe devolver error si el rol del usuario no es médico", async () => {
    mockRequest.user.rol = "admin"; // Rol no válido

    await crearEvolucion(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Solo los médicos pueden crear evoluciones.",
    });
  });
});
