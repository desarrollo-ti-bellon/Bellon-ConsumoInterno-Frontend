import { useContext } from "react"
import { ModalAlertaContexto } from "./ModalAlertaProveedor"

export const useModalAlerta = () => {

    const contexto = useContext(ModalAlertaContexto)

    if (!contexto) {
        throw new Error("El componente debe estar dentro del Proveedor de ModalAlerta")
    }

    return contexto;
}