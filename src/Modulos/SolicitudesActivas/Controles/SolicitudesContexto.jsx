import { createContext, useReducer } from "react"
import { EstadoInicialSolicitudes } from "../Modelos/EstadoInicialSolicitudes"
import { solicitudesReducer } from "./solicitudesReducer"

export const SolicitudesContexto = createContext(null)

export const SolicitudesProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(solicitudesReducer, EstadoInicialSolicitudes)

    return (
        <SolicitudesContexto.Provider value={{ state, dispatch }}>
            {children}
        </SolicitudesContexto.Provider>
    )
} 