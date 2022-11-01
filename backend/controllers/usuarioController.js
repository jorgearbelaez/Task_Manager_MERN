import Usuario from "../modelos/Usuario.js";
import generarId from "../helpers/generar-id.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js";

const registrar = async (req, res) => {
  const { email } = req.body;

  const existeUsuario = await Usuario.findOne({ email });

  //prevenir usuarios duplicados
  if (existeUsuario) {
    const error = new Error(`El correo ${email} ya esta registrado`);

    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const usuario = new Usuario(req.body);

    usuario.token = generarId();

    await usuario.save();

    //enviar email confirmacion
    const { nombre, email, token } = usuario;

    emailRegistro({ email, nombre, token });

    res.json({
      msg: "Usuario creado correctamente, Revisa tu email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //usuario?
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");

    return res.status(404).json({
      msg: error.message,
    });
  }

  //usuario confirmado?
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");

    return res.status(403).json({
      msg: error.message,
    });
  }

  //password valido?

  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({
      msg: error.message,
    });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Usuario.findOne({ token });

  //si el usuario no existe

  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(403).json({
      msg: error.message,
    });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";

    await usuarioConfirmar.save();

    res.json({
      msg: "Usuario Confirmado Correctamente",
    });

    console.log(usuarioConfirmar);
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  //usuario?
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");

    return res.status(404).json({
      msg: error.message,
    });
  }

  try {
    usuario.token = generarId();
    await usuario.save();

    //enviar el email con instrucciones

    const { nombre, email, token } = usuario;

    emailOlvidePassword({ email, nombre, token });

    res.json({
      msg: `Hemos enviado un email a ${email} con las instrucciones`,
    });

    console.log(usuario);
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Usuario.findOne({ token });

  if (!tokenValido) {
    const error = new Error("Token no valido");
    return res.status(403).json({
      msg: error.message,
    });
  }

  res.json({
    msg: "token valido",
  });
};

const nuevoPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const usuario = await Usuario.findOne({ token });

  if (!usuario) {
    const error = new Error("Token no válido");
    return res.status(403).json({
      msg: error.message,
    });
  }

  usuario.password = password;
  usuario.token = "";

  try {
    await usuario.save();

    res.json({
      msg: "Password modificado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;
  res.json(usuario);
};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
