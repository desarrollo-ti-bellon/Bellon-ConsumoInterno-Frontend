import { createContext, useReducer } from "react"
import { formularioReducer } from "./formularioReducer"
import { EstadoInicialFormulario } from "../Modelos/EstadoInicialFormulario"

export const FormularioContexto = createContext(null)

export const FormularioProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(formularioReducer, EstadoInicialFormulario)

    return (
        <FormularioContexto.Provider value={{ state, dispatch }}>
            {children}
        </FormularioContexto.Provider>
    )
} 