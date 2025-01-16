import { EstadoInicialModalAlerta } from "./ModalAlertaModelo";

export const modalAlertaReducer = (state = EstadoInicialModalAlerta, action) => {

    if (action.type === "mostrarModalAlerta") {
        return { ...state, mostrar: true, mensaje: action.payload.mensaje, tamano: action.payload.tamano }
    }

    if (action.type === "cerrarModalAlerta") {
        return { ...state, mostrar: false, mensaje: '', tamano: 'sm' }
    }

    if (action.type === "limpiarModalAlerta") {
        return { state: EstadoInicialModalAlerta }
    }

    return state;
} 