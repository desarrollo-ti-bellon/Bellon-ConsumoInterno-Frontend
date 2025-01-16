import { EstadoInicialInicio } from "../Modelos/InicioModel"

export const inicioReducer = (state = EstadoInicialInicio, action) => {

    if (action.type === 'obtenerNombreUsuario') {
        return { ...state, nombreUsuario: action.payload.nombre }
    }

    if (action.type === 'limpiarContadoresActividades') {
        return { ...state, actividades: [] }
    }

    if (action.type === 'llenarContadoresActividades') {
        return { ...state, actividades: [...state.actividades, { titulo: action.payload.titulo, cantidad: action.payload.cantidad, ruta: action.payload.ruta, funcion: action.payload.funcion }] }
    }

    if (action.type === 'llenarNotas') {
        return { ...state, notas: action.payload.notas }
    }
}