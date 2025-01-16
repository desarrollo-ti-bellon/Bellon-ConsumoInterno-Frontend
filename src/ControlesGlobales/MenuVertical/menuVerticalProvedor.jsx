import { createContext, useReducer } from "react";
import { menuVerticalReducer } from "./menuVerticalReducer";
import { estadoInicialMenuVertical } from "./menuVerticalModel";
import { rutas } from "../../Archivos/Configuracion/Rutas";

export const menuVerticalContexto = createContext(null);

export default function MenuVerticalProveedor({ children }) {
    const [state, dispatch] = useReducer(menuVerticalReducer, estadoInicialMenuVertical)

    return (
        <menuVerticalContexto.Provider value={{ state, dispatch, rutas }}>
            {children}
        </menuVerticalContexto.Provider>
    )
}