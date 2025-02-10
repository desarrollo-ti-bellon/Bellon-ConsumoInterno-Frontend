import { useContext } from "react";
import { FormularioContexto } from "./FormularioContexto";

export const useFormulario = () => {

    const contexto = useContext(FormularioContexto)

    if (!contexto) {
        throw new Error("Debe de usarse dentro del formulario contexto")
    }

    return contexto
}