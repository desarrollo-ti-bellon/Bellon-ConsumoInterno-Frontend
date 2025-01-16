import { useContext } from "react";
import { SolicitudesContexto } from "./SolicitudesContexto";

export const useSolicitudes = () => {

    const contexto = useContext(SolicitudesContexto)

    if (!contexto) {
        throw new Error("Debe de usarse dentro del solicitudes contexto")
    }

    return contexto
}