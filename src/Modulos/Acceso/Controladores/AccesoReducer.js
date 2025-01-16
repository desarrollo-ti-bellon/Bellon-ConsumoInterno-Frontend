import { estadoInicialAcceso } from "../Modelos/accesoModelo";

export const accesoReducer = (state = estadoInicialAcceso, action) => {
    if (action.type === "ponerValores") {
        return { ...state, token: action.payload.token, nombre: action.payload.nombre, nombreUsuario: action.payload.nombreUsuario }
    }
    return state;
}