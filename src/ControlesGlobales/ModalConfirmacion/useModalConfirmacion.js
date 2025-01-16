import { useContext } from "react"
import { ModalConfirmacionContexto } from "./ModalConfirmacionProveedor"

export const useModalConfirmacion = () => {
    
    const context = useContext(ModalConfirmacionContexto)

    if (!context) {
        throw new Error("El componente debe estar dentro del ModalConfirmacion Proveedor")
    }

    return context;
}