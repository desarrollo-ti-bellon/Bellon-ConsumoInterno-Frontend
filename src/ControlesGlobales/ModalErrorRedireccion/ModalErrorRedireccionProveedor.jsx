import { createContext, useEffect, useReducer } from "react";
import { modalErrorRedireccionReducer } from "./ModalErrorRedireccionReducer";
import { EstadoInicialModalErrorRedireccion } from "./ModalErrorRedireccionModelo";
import ModalErrorRedireccion from "../../ComponentesGlobales/ModalErrorRedireccion";

export const ModalErrorRedireccionContexto = createContext(null)

export const ModalErrorRedireccionProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(modalErrorRedireccionReducer, EstadoInicialModalErrorRedireccion);

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: "limpiarModalErrorRedireccion" });
        })
    }, [state.confirmar]);

    const confirmarModalFuncion = (confirmacion) => {
        if (confirmacion) {
            state.funcionEjecutar()
        }
        dispatch({ type: "limpiarModalErrorRedireccion" });
    }

    return (
        <ModalErrorRedireccionContexto.Provider value={{ state, dispatch, confirmarModalFuncion }}>
            {children}
            <ModalErrorRedireccion />
        </ModalErrorRedireccionContexto.Provider>
    )
}