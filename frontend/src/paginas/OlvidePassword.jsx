import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const OlvidePassword = () => {

    const [email, setEmail]= useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(email==='' || email.length < 6){
            setAlerta({
                msg:'El email es Obligatorio',
                error:true
            })
            return
        }
        try {
            const {data}= await clienteAxios.post(`/usuarios/olvide-password`, {email })

            setAlerta({
                msg: data.msg,
                error:false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })
        }
    }

    const {msg} =alerta
  return (
    <>
        <h1 className="text-white font-black text-6xl capitalize">Recupera tu acceso a  {''}<span className="text-yellow-300">TaskManager</span></h1>
        {msg && <Alerta alerta={alerta} />}

        <form  
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}>
            
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="email
                ">Email</label>
                <input 
                    id="email"
                    type="email"
                    placeholder="Ingresa tu Email"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                    value={email}
                    onChange ={e=> setEmail(e.target.value)} />

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