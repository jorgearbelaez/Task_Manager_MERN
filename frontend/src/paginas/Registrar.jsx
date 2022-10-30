import {Link} from "react-router-dom"

const registrar = () => {
  return (
    <>
        <h1 className="text-white font-black text-6xl capitalize">Crea tu cuenta y administra tus {''}<span className="text-yellow-300">Proyectos</span></h1>

        <form  className="my-10 bg-white shadow rounded-lg p-10">
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="email
                ">Nombre</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Ingresa tu Nombre"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200" />

            </div>
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="email
                ">Email</label>
                <input 
                    id="email"
                    type="email"
                    placeholder="Ingresa tu Email"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200" />

            </div>
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="email
                ">Password</label>
                <input 
                    id="password"
                    type="password"
                    placeholder="Ingresa tu Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200" />

            </div>
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="password2
                ">Confirma tu Password</label>
                <input 
                    id="password2"
                    type="password"
                    placeholder="Repetir Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200" />

            </div>
            <input 
            type="submit" 
            value="Crear Cuenta"
            className="bg-gray-800 mb-5 w-full py-3 text-white uppercase font-bold rounded text-xl hover:cursor-pointer hover:bg-gray-600 transition-colors"/>
        </form>
        <nav className="lg:flex lg:justify-between">
                <Link
                className="block text-center my-5 text-white uppercase text-sm"
                    to="/"
                >¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link
                className="block text-center my-5 text-white uppercase text-sm"
                    to="/olvide-password"
                >Olvide mi password</Link>

        </nav>
   
            
    
    </>
  )
}

export default registrar