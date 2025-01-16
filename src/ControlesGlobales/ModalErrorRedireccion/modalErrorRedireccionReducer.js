import { EstadoInicialModalErrorRedireccion } from "./ModalErrorRedireccionModelo"

export const modalErrorRedireccionReducer = (state = EstadoInicialModalErrorRedireccion, action) => {

    if (action.type === "mostrarModalErrorRedireccion") {
        return { ...state, mostrar: true, mensaje: action.payload.mensaje, funcionEjecutar: action.payload.funcionEjecutar }
    }

    if (action.type === "limpiarModalErrorRedireccion") {
        return { ...EstadoInicialModalErrorRedireccion }
    }

    return state
}