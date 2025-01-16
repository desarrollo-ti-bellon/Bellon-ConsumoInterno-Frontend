import { useContext } from "react"
import { cargandoInformacionContexto } from "./cargandoInformacionProveedor"

export const useCargandoInformacion = () => {
    
    const context = useContext(cargandoInformacionContexto)

    if (!context) {
        throw new Error("El componente debe estar dentro del Proveedor de Cargando Información")
    }

    return context;
}