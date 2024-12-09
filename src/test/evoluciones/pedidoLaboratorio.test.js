const request = require("supertest");
const HistoriaClinica = require("../../models/historiaClinica.schema");
const historiaClinicaController = require("../../controllers/historiaClinica.controllers");

// Mocks para las funciones que vamos a usar
jest.mock("../../models/historiaClinica.schema");

describe("POST /historiasClinicas/agregarPedidoLaboratorio", () => {
  beforeAll(() => {
    // Aquí puedes iniciar tu servidor si es necesario antes de ejecutar los tests
    // Si tienes un servidor Express, también puedes asegurarte de que esté corriendo antes de cada test.
  });

  it("debe devolver 400 si no se proporciona historiaClinicaId o tipoEstudio", async () => {
    const response = await request("http://localhost:3000")
      .post("/historiasClinicas/agregarPedidoLaboratorio")
      .send({
        historiaClinicaId: "", // Falta el tipoEstudio
      });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe(
      "ID de historia clínica y tipo de estudio son obligatorios"
    );
  });

  it("debe devolver 404 si la historia clínica no existe", async () => {
    // Simula que no se encuentra la historia clínica
    HistoriaClinica.findByIdAndUpdate.mockResolvedValue(null);

    const response = await request("http://localhost:3000")
      .post("/historiasClinicas/agregarPedidoLaboratorio")
      .send({
        historiaClinicaId: "fakeId",
        tipoEstudio: "Estudio de sangre",
      });

    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Historia clínica no encontrada");
  });

  it("debe agregar un pedido de laboratorio correctamente", async () => {
    const historiaClinicaId = "validHistoriaClinicaId";

    // Mock de la respuesta cuando se encuentra la historia clínica
    HistoriaClinica.findByIdAndUpdate.mockResolvedValue({
      _id: historiaClinicaId,
      pedidosLaboratorio: [],
      save: jest.fn().mockResolvedValue(true),
    });

    const response = await request("http://localhost:3000")
      .post("/historiasClinicas/agregarPedidoLaboratorio")
      .send({
        historiaClinicaId: historiaClinicaId,
        tipoEstudio: "Estudio de sangre",
        observaciones: "Observación de prueba",
        fecha: "2024-12-05",
      });

    expect(response.status).toBe(201);
    expect(response.body.msg).toBe(
      "Pedido de laboratorio agregado correctamente"
    );
    expect(response.body.data.pedidosLaboratorio.length).toBe(1);
    expect(response.body.data.pedidosLaboratorio[0].pedido).toBe(
      "Estudio de sangre"
    );
  });

  it("debe devolver 500 en caso de error en el servidor", async () => {
    // Simulamos un error en el modelo
    HistoriaClinica.findByIdAndUpdate.mockRejectedValue(
      new Error("Error interno")
    );

    const response = await request("http://localhost:3000")
      .post("/historiasClinicas/agregarPedidoLaboratorio")
      .send({
        historiaClinicaId: "validHistoriaClinicaId",
        tipoEstudio: "Estudio de sangre",
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Error interno");
  });

  afterAll(() => {
    // Aquí puedes detener el servidor si es necesario después de ejecutar los tests
  });
});
