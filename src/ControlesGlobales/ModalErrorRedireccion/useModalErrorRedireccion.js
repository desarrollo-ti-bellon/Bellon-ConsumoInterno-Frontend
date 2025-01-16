import { useContext } from "react"
import { ModalErrorRedireccionContexto } from "./ModalErrorRedireccionProveedor";

export const useModalErrorRedireccion = () => {
    
    const context = useContext(ModalErrorRedireccionContexto)

    if (!context) {
        throw new Error("El componente debe estar dentro del Modal Error Redireccion Proveedor")
    }

    return context;
}