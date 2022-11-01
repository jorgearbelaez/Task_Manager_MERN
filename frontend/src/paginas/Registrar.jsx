import {useState} from "react"

import {Link} from "react-router-dom"

import Alerta from "../components/Alerta"

import clienteAxios from "../config/clienteAxios"



const registrar = () => {

    const[nombre,setNombre]= useState("")
    const[email,setEmail]= useState("")
    const[password,setPassword]= useState("")
    const[repetirPassword,setRepetirPassword]= useState("")

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        if(password !== repetirPassword){
            setAlerta({
                msg: 'Los passwords no son iguales',
                error: true
            })
            return
        }

        if(password.length < 8){
            setAlerta({
                msg: 'El password debe tener al menos 8 caracteres',
                error: true
            })
            return
        }
        if(password.length < 8){
            setAlerta({
                msg: 'El password debe tener al menos 8 caracteres',
                error: true
            })
            return
        }

        setAlerta({})

        //crear el usuario en la api
       try {
        const {data} = await clienteAxios.post(`/usuarios`, {
            nombre,
            email,
            password
        })
        
        
        setAlerta({
            msg: data.msg,
            error: false
        })

        //resetear el formulario
        setNombre('')
        setEmail('')
        setPassword('')
        setRepetirPassword('')

       } catch (error) {
            setAlerta({
            msg:error.response.data.msg,
            error:true
            })
        }
    }
    const{ msg } = alerta

  return (
    <>
        <h1 className="text-white font-black text-6xl capitalize">Crea tu cuenta y administra tus {''}<span className="text-yellow-300">Proyectos</span>
        </h1>

        { msg && <Alerta alerta={alerta} />}

        <form  
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
            >
            
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="email
                ">Nombre</label>
                <input 
                    id="nombre"
                    type="text"
                    placeholder="Ingresa tu Nombre"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200" 
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />

            </div>
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
                    onChange={e => setEmail(e.target.value)}
                    /> 

            </div>
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="email
                ">Password</label>
                <input 
                    id="password"
                    type="password"
                    placeholder="Ingresa tu Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                     />

            </div>
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="password2
                ">Confirma tu Password</label>
                <input 
                    id="password2"
                    type="password"
                    placeholder="Repetir Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                     />

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