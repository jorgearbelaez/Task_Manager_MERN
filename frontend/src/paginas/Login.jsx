import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from '../hooks/useAuth'

const Login = () => {

    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [alerta, setAlerta]= useState({})

    const {setAuth} = useAuth()

    const navigate= useNavigate()

   

const handleSubmit = async e =>{
    e.preventDefault()

    if([email, password].includes('')){
        setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
        })
    return

    }
    
    try {
       const { data }= await clienteAxios.post('/usuarios/login', {
            email,
            password
        })
        setAlerta({})

        localStorage.setItem('token', data.token)
        setAuth(data)
        navigate("/proyectos")

    } catch (error) {

        console.log(error)

        setAlerta({
            msg: error.response.data.msg,
            error: true
        })
    }
}
const { msg } = alerta
  return (
    <>
        <h1 className="text-white font-black text-6xl capitalize">Inicia sesión y administra tus {''}<span className="text-yellow-300">Proyectos</span>
        </h1>

        {msg && <Alerta alerta={alerta} />}

        <form  
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
        >

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
                    onChange= {e=>setEmail(e.target.value)} />

            </div>
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="password
                ">Password</label>
                <input 
                    id="password"
                    type="password"
                    placeholder="Ingresa tu Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                    value={password}
                    onChange= {e=>setPassword(e.target.value)} />

            </div>
            <input 
            type="submit" 
            value="Iniciar Sesión"
            className="bg-gray-800 mb-5 w-full py-3 text-white uppercase font-bold rounded text-xl hover:cursor-pointer hover:bg-gray-600 transition-colors"/>
        </form>
        <nav className="lg:flex lg:justify-between">
                <Link
                className="block text-center my-5 text-white uppercase text-sm"
                    to="/registrar"
                >¿No tienes una cuenta? Registrate</Link>
                <Link
                className="block text-center my-5 text-white uppercase text-sm"
                    to="/olvide-password"
                >Olvide mi password</Link>

        </nav>
   
            
    
    </>
  )
}

export default Login