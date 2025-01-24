import { useContext } from "react";
import { FormularioClasificacionContexto } from "./FormularioClasificacionContexto";

export const useClasificacionFormulario = () => {

    const contexto = useContext(FormularioClasificacionContexto)

    if (!contexto) {
        throw new Error("Debe de usarse dentro del formulario contexto")
    }

    return contexto
}