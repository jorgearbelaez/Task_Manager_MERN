import {Link} from "react-router-dom"

const OlvidePassword = () => {
  return (
    <>
        <h1 className="text-white font-black text-6xl capitalize">Recupera tu acceso a  {''}<span className="text-yellow-300">TaskManager</span></h1>

        <form  className="my-10 bg-white shadow rounded-lg p-10">
            
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
            
            <input 
            type="submit" 
            value="Enviar "
            className="bg-gray-800 mb-5 w-full py-3 text-white uppercase font-bold rounded text-xl hover:cursor-pointer hover:bg-gray-600 transition-colors"/>
        </form>
        <nav className="lg:flex lg:justify-between">
                <Link
                className="block text-center my-5 text-white uppercase text-sm"
                    to="/"
                >¿Ya tienes una cuenta? Inicia Sesión</Link>
               <Link
                className="block text-center my-5 text-white uppercase text-sm"
                    to="/registrar"
                >¿No tienes una cuenta? Registrate</Link>

        </nav>
    </>
  )
}

export default OlvidePassword