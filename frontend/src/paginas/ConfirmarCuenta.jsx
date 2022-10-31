
import { useState, useEffect } from "react"
import {useParams, Link} from "react-router-dom"
import axios from "axios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

  const [alerta, setAlerta]= useState({})
  const [cuentaConfirmada ,setCuentaConfirmada] = useState(false)

  const params = useParams()
  const { id }= params

  useEffect(()=>{
    const confirmarCuenta = async ()=>{
      try {
        const url = `http://localhost:4000/api/usuarios/confirmar/${id}`

        const { data } =await axios.get(url)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error:true
        })
      }
    }
    confirmarCuenta()
  },[])

  const{ msg } = alerta


  return (
    <>
        <h1 className="text-white font-black text-6xl capitalize">Confirma tu cuenta y comienza a crear tus {''}<span className="text-yellow-300">Proyectos</span></h1>
        <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-gray-600">
          { msg && <Alerta alerta={alerta} />}

          {cuentaConfirmada && (
           <Link
           className="block text-center my-5 text-yellow-300 uppercase text-xl"
               to="/"
           >Inicia Sesión</Link>
          )}
          
        </div>
        
   
    </>
  )
}

export default ConfirmarCuenta