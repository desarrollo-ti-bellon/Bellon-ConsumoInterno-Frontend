import { EstadoInicialAlerta } from './AlertaModelo'

export const alertaReducer = (state = EstadoInicialAlerta, action) => {
    // console.log('alertaReducer', action)
    if (action.type === "mostrarAlerta") {
        return {
            ...state,
            mostrar: action.payload.mostrar,
            mensaje: action.payload.mensaje,
            tipo: action.payload.tipo
        }
    }

    if (action.type === "limpiarAlerta") {
        return {
            ...state,
            mostrar: '',
            mensaje: '',
            tipo: false
        }
    }

    return state;
}
