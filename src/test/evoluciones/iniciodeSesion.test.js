const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/usuarios.schema");
const serviciosUsuarios = require("../../services/usuarios.services");

jest.mock("../../models/usuarios.schema");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Feature: Inicio de sesión de usuario", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar mocks antes de cada test
  });

  // Escenario 1: Usuario válido se loguea correctamente
  it("Escenario 1: Dado un usuario válido, debería devolver un token y un mensaje de éxito", async () => {
    const mockUsuario = {
      _id: "123",
      nombreUsuario: "usuarioPrueba",
      contrasenia: "hashedPassword",
      rol: "medico",
    };

    UserModel.findOne.mockResolvedValue(mockUsuario);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockToken");

    const body = {
      nombreUsuario: "usuarioPrueba",
      contrasenia: "12345678",
    };

    const result = await serviciosUsuarios.iniciarSesion(body);

    expect(UserModel.findOne).toHaveBeenCalledWith({
      nombreUsuario: body.nombreUsuario,
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      body.contrasenia,
      mockUsuario.contrasenia
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { idUsuario: mockUsuario._id, rol: mockUsuario.rol },
      process.env.JWT_SECRET
    );

    expect(result).toEqual({
      msg: "Usuario Logueado",
      token: "mockToken",
      statusCode: 200,
    });
  });

  // Escenario 2: Usuario no existe
  it("Escenario 2: Dado un usuario inexistente, debería devolver un mensaje de error", async () => {
    UserModel.findOne.mockResolvedValue(null);

    const body = {
      nombreUsuario: "usuarioInexistente",
      contrasenia: "12345678",
    };

    const result = await serviciosUsuarios.iniciarSesion(body);

    expect(UserModel.findOne).toHaveBeenCalledWith({
      nombreUsuario: body.nombreUsuario,
    });
    expect(result).toEqual({
      msg: "Usuario y/o contaseña incorrecta",
      statusCode: 400,
    });
  });

  // Escenario 3: Contraseña incorrecta
  it("Escenario 3: Dado un usuario válido con contraseña incorrecta, debería devolver un mensaje de error", async () => {
    const mockUsuario = {
      _id: "123",
      nombreUsuario: "usuarioPrueba",
      contrasenia: "hashedPassword",
      rol: "medico",
    };

    UserModel.findOne.mockResolvedValue(mockUsuario);
    bcrypt.compare.mockResolvedValue(false);

    const body = {
      nombreUsuario: "usuarioPrueba",
      contrasenia: "contraseñaIncorrecta",
    };

    const result = await serviciosUsuarios.iniciarSesion(body);

    expect(UserModel.findOne).toHaveBeenCalledWith({
      nombreUsuario: body.nombreUsuario,
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      body.contrasenia,
      mockUsuario.contrasenia
    );
    expect(result).toEqual({
      msg: "Usuario y/o contaseña incorrecta",
      statusCode: 400,
    });
  });
});
