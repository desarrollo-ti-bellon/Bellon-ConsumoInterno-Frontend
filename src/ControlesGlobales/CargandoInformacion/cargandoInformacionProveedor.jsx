import { createContext, useReducer } from "react";
import { cargandoInformacionReducer } from "./cargandoInformacionReducer";
import { estadoInicialCargandoInformacion } from "./cargandoInformacionModelo";

export const cargandoInformacionContexto = createContext(null)

export function CargandoInformacionProveedor({ children }) {
    const [state, dispatch] = useReducer(cargandoInformacionReducer, estadoInicialCargandoInformacion);
    return (
        <cargandoInformacionContexto.Provider value={{ state, dispatch }}>
            {children}
        </cargandoInformacionContexto.Provider>
    )
}
