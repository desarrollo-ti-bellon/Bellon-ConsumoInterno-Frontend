import { useContext } from "react"
import { AccesoContexto } from "./AccesoProveedor";

export const useAcceso = () => {

    const context = useContext(AccesoContexto);

    if (!context) {
        throw new Error("El componente debe estar dentro del acceso Proveedor")
    }

    return context;
}