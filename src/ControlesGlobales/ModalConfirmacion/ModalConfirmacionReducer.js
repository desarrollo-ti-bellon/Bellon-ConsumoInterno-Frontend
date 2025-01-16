import { EstadoInicialModalConfirmacion } from "./ModalConfirmacionModelo"

export const modalConfirmacionReducer = (state = EstadoInicialModalConfirmacion, action) => {

    if (action.type === "mostrarModalConfirmacion") {
        return { ...state, mostrar: true, mensaje: action.payload.mensaje, funcionEjecutar: action.payload.funcionEjecutar }
    }

    if (action.type === "limpiarModalConfirmacion") {
        return { ...EstadoInicialModalConfirmacion }
    }

    return state
}