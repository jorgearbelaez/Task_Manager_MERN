import Proyecto from "../modelos/Proyecto.js";
import Tarea from "../modelos/Tarea.js";

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find().where("creador").equals(req.usuario);

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
  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error("No Encontrado");
    return res.status(401).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
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
  proyecto.desdripcion = req.body.descripcion || proyecto.descripcion;
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

    res.json("proyectoEliminado");
  } catch (error) {
    console.log(error);
  }
};
const agregarColaborador = async (req, res) => {
  res.json({ msg: "desde colaborar proyecto" });
};
const eliminarColaborador = async (req, res) => {
  res.json({ msg: "desde colaborar proyecto" });
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
  eliminarColaborador,
  eliminarProyecto,
};
