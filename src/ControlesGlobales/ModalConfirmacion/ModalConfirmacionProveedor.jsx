import { createContext, useEffect, useReducer } from "react";
import { modalConfirmacionReducer } from "./ModalConfirmacionReducer";
import { EstadoInicialModalConfirmacion } from "./ModalConfirmacionModelo";

export const ModalConfirmacionContexto = createContext(null)

export const ModalConfirmacionProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(modalConfirmacionReducer, EstadoInicialModalConfirmacion);

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: "limpiarModalConfirmacion" });
        })
    }, [state.confirmar]);

    const confirmarModalFuncion = (confirmacion) => {
        if (confirmacion) {
           state.funcionEjecutar()
        }
        dispatch({ type: "limpiarModalConfirmacion" });
    }

    return (
        <ModalConfirmacionContexto.Provider value={{ state, dispatch, confirmarModalFuncion }}>
            {children}
        </ModalConfirmacionContexto.Provider>
    )
}