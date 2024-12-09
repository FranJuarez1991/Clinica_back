const {
  obtenerMedicamentos,
  obtenerMedicamentosPorDescripcion,
  obtenerMedicamentoPorCodigo,
} = require("../../controllers/medicamento.controllers");
const medicamentoService = require("../../services/medicamento.services");

jest.mock("../../services/medicamento.services");

describe("Controlador: Medicamentos", () => {
  let mockRequest, mockResponse;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("obtenerMedicamentos", () => {
    test("debe obtener medicamentos correctamente", async () => {
      // Mock del servicio
      medicamentoService.obtenerMedicamentosPaginados.mockResolvedValue({
        medicamentos: [{ id: 1, nombre: "Paracetamol" }],
        total: 1,
      });

      mockRequest.query = { pagina: 1, limite: 20 };

      await obtenerMedicamentos(mockRequest, mockResponse);

      expect(
        medicamentoService.obtenerMedicamentosPaginados
      ).toHaveBeenCalledWith(1, 20);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Medicamentos obtenidos correctamente",
        data: [{ id: 1, nombre: "Paracetamol" }],
        total: 1,
      });
    });
  });

  describe("obtenerMedicamentosPorDescripcion", () => {
    test("debe devolver un error si la descripción tiene menos de 3 caracteres", async () => {
      mockRequest.query = { descripcion: "ab" };

      await obtenerMedicamentosPorDescripcion(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "La descripción debe tener al menos 3 caracteres",
      });
    });

    test("debe devolver medicamentos si la descripción es válida", async () => {
      medicamentoService.obtenerMedicamentosPorDescripcion.mockResolvedValue([
        { id: 1, nombre: "Ibuprofeno" },
      ]);

      mockRequest.query = { descripcion: "ibu", pagina: 1, limite: 10 };

      await obtenerMedicamentosPorDescripcion(mockRequest, mockResponse);

      expect(
        medicamentoService.obtenerMedicamentosPorDescripcion
      ).toHaveBeenCalledWith("ibu", 1, 10);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Medicamentos encontrados",
        data: [{ id: 1, nombre: "Ibuprofeno" }],
      });
    });
  });

  describe("obtenerMedicamentoPorCodigo", () => {
    test("debe devolver el medicamento si el código es válido", async () => {
      medicamentoService.obtenerMedicamentoPorCodigo.mockResolvedValue({
        id: 1,
        nombre: "Amoxicilina",
      });

      mockRequest.params = { codigo: "12345" };

      await obtenerMedicamentoPorCodigo(mockRequest, mockResponse);

      expect(
        medicamentoService.obtenerMedicamentoPorCodigo
      ).toHaveBeenCalledWith("12345");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Medicamento obtenido correctamente",
        data: { id: 1, nombre: "Amoxicilina" },
      });
    });

    test("debe devolver un error si el medicamento no existe", async () => {
      medicamentoService.obtenerMedicamentoPorCodigo.mockResolvedValue(null);

      mockRequest.params = { codigo: "12345" };

      await obtenerMedicamentoPorCodigo(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Medicamento con código 12345 no encontrado",
      });
    });

    test("debe manejar errores internos al buscar por código", async () => {
      medicamentoService.obtenerMedicamentoPorCodigo.mockRejectedValue(
        new Error("Error interno")
      );

      mockRequest.params = { codigo: "12345" };

      await obtenerMedicamentoPorCodigo(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Error al obtener el medicamento por código",
        error: "Error interno",
      });
    });
  });
});
