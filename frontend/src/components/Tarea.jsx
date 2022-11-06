import { formatearFecha } from "../helpers/formatearFecha"

const Tarea = ({tarea}) => {

    const {nombre, descripcion, prioridad, fechaEntrega, estado, _id } = tarea

  return (
    <div className="border-b p-5 flex justify-between items-center">

        <div>
            <p className="mb-1 text-xl">{nombre}</p>
            <p className="mb-1 text-sm text-gray-500">{descripcion}</p>
            <p className="mb-1 text-xl">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-xl text-gray-600">Prioridad: {prioridad}</p>
        </div>
        <div className="flex gap-2">
            <button
                className="bg-indigo-600 px-4 py-3 text-white font-bold text-sm rounded-lg uppercase"
            >Editar</button>

            {estado ? (
                <button
                className="bg-sky-600 px-4 py-3 text-white font-bold text-sm rounded-lg uppercase"
                >Completa </button> 
            ): (
                <button
                className="bg-gray-600 px-4 py-3 text-white font-bold text-sm rounded-lg uppercase"
                >Imcompleta </button> 
            )}
            
            <button
                className="bg-red-600 px-4 py-3 text-white font-bold text-sm rounded-lg uppercase"
            >Eliminar</button>

           
        </div>


    </div>
  )
}

export default Tarea