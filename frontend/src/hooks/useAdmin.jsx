import useAuth from "./useAuth";
import useProyectos from "./useProyectos";

const useAdmin = () => {
    const {proyecto} =useProyectos()
    const { auth } =useAuth()

    return (proyecto.creador === auth.id)
}
export default useAdmin