import { useContext } from "react"
import { AlertaContexto } from "./AlertaProveedor"

export const useAlerta = () => {
    const context = useContext(AlertaContexto)
    
    if (!context) {
        throw new Error("El componente debe estar dentro del Alerta Proveedor")
    }

    return context;
}