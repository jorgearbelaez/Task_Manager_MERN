import Usuario from "../modelos/Usuario.js";
import generarId from "../helpers/generar-id.js";

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

    const usuarioAlmacenado = await usuario.save();

    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

export { registrar };
