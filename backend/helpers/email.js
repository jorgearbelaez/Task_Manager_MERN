import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // infromacion para el email

  const info = await transport.sendMail({
    from: '"TaskManager - Administrador de Proyectos" <cuentas@taskmanager.com>',
    to: email,
    subject: "TaskManager  - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en TaskManager",
    html: `<p> Hola ${nombre} comprueba tu cuenta en TaskManager<p>
    <p> Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta </a>

    <p> Si usted no creo esta cuenta, por favor ignorar este mensaje</p>
                
    `,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // infromacion para el email

  const info = await transport.sendMail({
    from: '"TaskManager - Administrador de Proyectos" <cuentas@taskmanager.com>',
    to: email,
    subject: "TaskManager  - Restablecer tu Password",
    text: "Restablece tu Password",
    html: `<p> Hola ${nombre} has solicitado Restablecer tu Password en TaskManager<p>
    <p> Sigue el siguiente enlace para reestablecer tu password:

    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Password </a>

    <p> Si usted no hizo esta solicitud, por favor ignorar este mensaje</p>
                
    `,
  });
};
