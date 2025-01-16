import { estadoInicialCargandoInformacion } from "./cargandoInformacionModelo";

export const cargandoInformacionReducer = (state = estadoInicialCargandoInformacion, action) => {

    if (action.type === 'mostrarCargandoInformacion') {
        return { ...state, mostrar: true }
    }

    if (action.type === 'limpiarCargandoInformacion') {
        return { ...state, mostrar: false }
    }

    return state;
}