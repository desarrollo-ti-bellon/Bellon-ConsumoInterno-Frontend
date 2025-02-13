import { EstadoInicialControlGeneral } from "./EstadoInicialControlGeneral";

export const controlGeneralReducer = (state = EstadoInicialControlGeneral, action) => {

    if (action.type === "llenarPerfilUsuario") {
        return { ...state, perfilUsuario: action.payload.perfilUsuario }
    }

    if (action.type === "limpiarPerfilUsuario") {
        return { ...state, perfilUsuario: null }
    }

    if (action.type === "mostrarModal") {
        return {...state, mostrar: action.payload.mostrar }
    }

    return state;
}