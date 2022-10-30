

const NuevoPassword = () => {
  return (
    <>
        <h1 className="text-white font-black text-6xl capitalize">Restablece tu password y accede a tus {''}<span className="text-yellow-300">Proyectos</span></h1>

        <form  className="my-10 bg-white shadow rounded-lg p-10">
            
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="email
                ">Nuevo Password</label>
                <input 
                    id="password"
                    type="password"
                    placeholder="Ingresa tu Nueva Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200" />

            </div>
            
            <input 
            type="submit" 
            value="Guardar Nuevo Password"
            className="bg-gray-800 mb-5 w-full py-3 text-white uppercase font-bold rounded text-xl hover:cursor-pointer hover:bg-gray-600 transition-colors"/>
        </form>
        
   
    </>
  )
}

export default NuevoPassword