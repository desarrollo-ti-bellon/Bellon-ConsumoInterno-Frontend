import { createContext, useReducer } from "react";
import { modalAlertaReducer } from "./modalAlertaReducer";
import { EstadoInicialModalAlerta } from "./ModalAlertaModelo";

export const ModalAlertaContexto = createContext(null)

export const ModalAlertaProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(modalAlertaReducer, EstadoInicialModalAlerta);

    return (
        <ModalAlertaContexto.Provider value={{ state, dispatch }}>
            {children}
        </ModalAlertaContexto.Provider>
    )

} 