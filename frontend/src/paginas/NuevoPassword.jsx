import { useState, useEffect } from "react"
import {Link, useParams} from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [alerta, setAlerta]= useState({})
  const [tokenValido ,setTokenValido] = useState(false)
  const [passwordModificado ,setPasswordmodificado] = useState(false)

  const params = useParams()
  const { token }= params  
  useEffect(()=>{
    const comprobarToken = async ()=>{
      try {
        const url = `/usuarios/olvide-password/${token}`

        await clienteAxios.get(url)

        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error:true
        })
      }
    }
    comprobarToken()
  },[])

  const handleSubmit =async e => {
    e.preventDefault()

    if(password.length < 8 ){

      setAlerta({
        msg: "El password debe ser de al menos 6 caracteres",
        error:true
      })
      return
    }

    try {
      const url= `/usuarios/olvide-password/${token}`

      const {data} = await clienteAxios.post(url, { password })


      setAlerta({
        msg: data.msg,
        error:false
      })

      setPasswordmodificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const{msg} = alerta

  return (
    <>
        <h1 className="text-white font-black text-6xl capitalize">Restablece tu password y accede a tus {''}<span className="text-yellow-300">Proyectos</span></h1>

        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
           
           <form  
              className="my-10 bg-white shadow rounded-lg p-10"
              onSubmit={handleSubmit}
            >
              
            <div className="my-5">
                <label className="uppercase text-gray-900 block  text-xl font-bold"
                htmlFor="email
                ">Nuevo Password</label>
                <input 
                    id="password"
                    type="password"
                    placeholder="Ingresa tu Nueva Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-200"
                    value ={password}
                    onChange={e=> setPassword(e.target.value)} />

            </div>
            
            <input 
              type="submit" 
              value="Guardar Nuevo Password"
              className="bg-gray-800 mb-5 w-full py-3 text-white uppercase font-bold rounded text-xl hover:cursor-pointer hover:bg-gray-600 transition-colors"
              
            />
        </form>
        )}

        {passwordModificado && (
           <Link
           className="block text-center my-5 text-yellow-300 uppercase text-xl"
               to="/"
           >Iniciar Sesión</Link>
          )}
        
   
    </>
  )
}

export default NuevoPassword