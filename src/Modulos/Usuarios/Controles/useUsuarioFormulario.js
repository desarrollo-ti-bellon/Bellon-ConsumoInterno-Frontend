import { useContext } from "react";
import { FormularioUsuarioContexto } from "./FormularioUsuarioProveedor";

export const useUsuarioFormulario = () => {

    const contexto = useContext(FormularioUsuarioContexto)

    if (!contexto) {
        throw new Error("Debe de usarse dentro del formulario contexto")
    }

    return contexto
}