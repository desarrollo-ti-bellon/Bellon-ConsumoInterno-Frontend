import { useContext } from "react";
import { HistorialMovimientosSolicitudesContexto } from "./HistorialMovimientosSolicitudesProveedor";

export const useHistorialMovmientosSolicitudes = () => {

    const contexto = useContext(HistorialMovimientosSolicitudesContexto);

    if (!contexto) {
        throw new Error("Debe de usar este hook dentro del contexto HistorialMovimientosSolicitudesContexto")
    }
    
    return contexto;
}