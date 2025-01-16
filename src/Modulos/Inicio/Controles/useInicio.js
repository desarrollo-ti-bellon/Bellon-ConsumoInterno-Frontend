import { useContext, useState } from "react"
import { EstadoInicialInicio } from "../Modelos/InicioModel"
import { inicioContexto } from "./InicioProveedor"

export const useInicio = () => {

    const contexto = useContext(inicioContexto)

    if (!contexto) {
        throw new Error("El componente debe estar dentro del Proveedor de Inicio")
    }

    return contexto
}