export const formatearFecha = fecha=>{

    const nuevaFecha = new Date(fecha.split('T')[0].split('-'))
console.log(fecha)
    const opciones = {
        weekday: "long",
        year:"numeric",
        month: "long",
        day: "numeric"
    }

    return nuevaFecha.toLocaleDateString("es-ES", opciones)
}


