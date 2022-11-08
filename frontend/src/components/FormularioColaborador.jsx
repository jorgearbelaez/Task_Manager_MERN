import { useState } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"

const FormularioColaborador = () => {

    const [ email, setEmail]= useState("")

    const {mostrarAlerta, alerta, submitColaborador}=useProyectos()

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(email=== ""){
            mostrarAlerta({
                msg: "El email es obligatorio",
                error: true
            })
            return
        }

        submitColaborador(email)

    }
    const { msg } = alerta

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
        >

            {msg && <Alerta alerta={alerta} />}

            <div className="mb-5">
                <label 
                    htmlFor="email"
                    className="text-gray-700 uppercase font-bold text-sm"
                                                                
                >Email Colaborador</label>
                <input 
                type="emal" 
                id="email"
                placeholder="Email del usuario"
                className="border-2 w-full p-2 mt-2 placehoder-gray-400 rounded-md"
                value={email}
                onChange={ e => setEmail(e.target.value)}
                                                                
                />
                                    
            </div>  
            <input 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 w-full p-3 text-white uppercase font-bold cursor-pointer rounded-md transition-colors text-sm"
                value="Buscar Colaborador"

            />                                         
        </form>
  ) 
}

export default FormularioColaborador