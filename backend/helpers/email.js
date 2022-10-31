import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "252b67806dcd40",
      pass: "de972e49c43101",
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
