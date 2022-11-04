import { useState, useEffect, createContext } from 'react'
import {useNavigate} from "react-router-dom"
import clienteAxios from '../config/clienteAxios';

const ProyectosContext = createContext();

const ProyectosProvider = ({children})=> {

    const [proyectos, setProyectos] = useState([])
    const [proyecto, setProyecto] = useState({})
    const [alerta, setAlerta] = useState({})
    const [cargando, setCargando] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        const obtenerProyectos = async ()=>{

            try {
                const token = localStorage.getItem("token")

            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

                const {data} = await clienteAxios("/proyectos", config)

                setProyectos(data)
                
            } catch (error) {
                console.log(error)
            }

        }
        obtenerProyectos()
    },[])

    const mostrarAlerta = (alerta)=>{
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto= async (proyecto)=> {

        if(proyecto.id){
            await editarProyecto(proyecto)
        }else{
            await nuevoProyecto(proyecto)
        }

    }
    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem("token")

            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto, config)

           //sincronizar el state

           const proyectosActualizados = proyectos.map(proyectoState=>
            proyectoState._id === data._id ? data : proyectoState)

            setProyectos(proyectosActualizados)
            setAlerta({
                msg: "El proyecto se Actualizo correctamente",
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000);
            
           
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto=>{
        try {
            const token = localStorage.getItem("token")

            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }


            const {data} = await clienteAxios.post('/proyectos', proyecto, config)

            setProyectos([...proyectos, data])

            setAlerta({
                msg: "el proyecto se creo satisfactoriamente",
                error: false

               
            })
            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000);
            
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async (id) =>{

        setCargando(true)
        
        try {
            const token = localStorage.getItem("token")

            if(!token) return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/proyectos/${id}`, config)

            setProyecto(data)

        } catch (error) {
            console.log(error)
        }

        setCargando(false)
    }


    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando
            }}

            >
                {children}
            </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext