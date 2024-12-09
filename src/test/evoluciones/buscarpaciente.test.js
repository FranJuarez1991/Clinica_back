const { buscarPaciente } = require("../../controllers/paciente.controllers");
const pacienteService = require("../../services/paciente.services");

// Mockear el servicio de pacientes
jest.mock("../../services/paciente.services");

describe("buscarPaciente", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {
      params: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });
  /*Primer caso de exito cuando se encuentra un paciente correctamente */
  it("debería retornar un paciente cuando se encuentra en la base de datos", async () => {
    // Configurar mock del servicio
    const pacienteMock = {
      paciente: {
        nombre: "Jose",
        apellido: "Vides",
        dni: "35548576",
      },
      obraSocial: "Obra Social del Personal de Seguridad",
      nroafiliado: 254620,
    };

    pacienteService.buscarPacientePorDNI.mockResolvedValue(pacienteMock);

    // Mock de la solicitud
    mockRequest.params.dni = "35548576";

    // Ejecutar función
    await buscarPaciente(mockRequest, mockResponse);

    // Validar respuesta
    expect(pacienteService.buscarPacientePorDNI).toHaveBeenCalledWith(
      "35548576"
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Paciente encontrado",
      data: pacienteMock,
    });
  });

  /*2do  caso cuando no se encuentra un paciente  - caso de error*/
  it("debería retornar un error 404 si el paciente no se encuentra", async () => {
    // Configurar mock del servicio
    pacienteService.buscarPacientePorDNI.mockResolvedValue(null);

    // Mock de la solicitud
    mockRequest.params.dni = "99999999";

    // Ejecutar función
    await buscarPaciente(mockRequest, mockResponse);

    // Validar respuesta
    expect(pacienteService.buscarPacientePorDNI).toHaveBeenCalledWith(
      "99999999"
    );
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "No se encontró un paciente con el DNI 99999999",
    });
  });

  /*3er  caso hay un error de conexion de BD  - caso de error*/
  it("debería retornar un error 500 si ocurre un error inesperado", async () => {
    // Configurar mock del servicio para lanzar un error
    const errorMock = new Error("Error de conexión con la base de datos");
    pacienteService.buscarPacientePorDNI.mockRejectedValue(errorMock);

    // Mock de la solicitud
    mockRequest.params.dni = "35548576";

    // Ejecutar función
    await buscarPaciente(mockRequest, mockResponse);

    // Validar respuesta
    expect(pacienteService.buscarPacientePorDNI).toHaveBeenCalledWith(
      "35548576"
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Error al buscar paciente",
      error: "Error de conexión con la base de datos",
    });
  });
});
