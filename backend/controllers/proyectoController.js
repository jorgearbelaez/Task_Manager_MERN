import Proyecto from "../modelos/Proyecto.js";
import Usuario from "../modelos/Usuario.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find({
    $or: [
      { colaboradores: { $in: req.usuario } },
      { creador: { $in: req.usuario } },
    ],
  }).select("-tareas");

  res.json(proyectos);
};
const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);

  proyecto.creador = req.usuario._id;

  try {
    const proyectoAlmacenado = await proyecto.save();
    res.json(proyectoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};
const obtenerProyecto = async (req, res) => {
  const { id } = req.params;
  const proyecto = await Proyecto.findById(id)
    .populate({
      path: "tareas",
      populate: { path: "completado", select: "nombre" },
    })
    .populate("colaboradores", "nombre email");

  if (!proyecto) {
    const error = new Error("No Encontrado");
    return res.status(401).json({ msg: error.message });
  }

  if (
    proyecto.creador.toString() !== req.usuario._id.toString() &&
    !proyecto.colaboradores.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("Accion no válida");
    return res.status(401).json({ msg: error.message });
  }

  res.json(proyecto);
};
const editarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("No Encontrado");
    return res.status(401).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no válida");
    return res.status(401).json({ msg: error.message });
  }

  proyecto.nombre = req.body.nombre || proyecto.nombre;
  proyecto.cliente = req.body.cliente || proyecto.cliente;
  proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
  proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
  try {
    const proyectoActualizado = await proyecto.save();
    res.json(proyectoActualizado);
  } catch (error) {
    console.log(error);
  }
};
const eliminarProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("No Encontrado");
    return res.status(401).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no válida");
    return res.status(401).json({ msg: error.message });
  }
  try {
    await Proyecto.deleteOne();

    res.json({ msg: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};
const buscarColaborador = async (req, res) => {
  const { email } = req.body;

  const usuario = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -token -updatedAt -password -__v"
  );
  if (!usuario) {
    const error = new Error("usuario no encontrado");
    return res.status(404).json({
      msg: error.message,
    });
  }

  res.json(usuario);
};

const agregarColaborador = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no válida");
    return res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;

  const usuario = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -token -updatedAt -password -__v"
  );
  if (!usuario) {
    const error = new Error("usuario no encontrado");
    return res.status(404).json({
      msg: error.message,
    });
  }

  //El colaborador no es el Admin del proyecto

  if (proyecto.creador.toString() === usuario._id.toString()) {
    const error = new Error("El creador del proyecto no puede ser colaborador");
    return res.status(404).json({
      msg: error.message,
    });
  }
  // revisar que no este agregado al proyecto

  if (proyecto.colaboradores.includes(usuario._id)) {
    const error = new Error("El usuario ya esta agregado al proyecto");
    return res.status(404).json({
      msg: error.message,
    });
  }

  // agregar al usuario
  proyecto.colaboradores.push(usuario._id);
  await proyecto.save();
  res.json({ msg: "Colaborador agregado correctamente" });
};

const eliminarColaborador = async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error("Proyecto no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no válida");
    return res.status(404).json({ msg: error.message });
  }

  // Eliminar al colaborador
  proyecto.colaboradores.pull(req.body.id);
  await proyecto.save();

  res.json({ msg: "Colaborador Eliminado correctamente" });
};
// const obtenerTareas = async (req, res) => {
//   const { id } = req.params;

//   const existeProyecto = await Proyecto.findById(id);

//   if (!existeProyecto) {
//     const error = new Error("No encontrado");
//     res.status(404).json({ msg: error.message });
//   }

//   const tareas = await Tarea.find().where("proyecto").equals(id);

//   res.json(tareas);
// };

export {
  obtenerProyectos,
  obtenerProyecto,
  // obtenerTareas,
  nuevoProyecto,
  editarProyecto,
  agregarColaborador,
  buscarColaborador,
  eliminarColaborador,
  eliminarProyecto,
};
