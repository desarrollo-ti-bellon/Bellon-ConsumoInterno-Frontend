import { useContext } from "react"
import { NotasContexto } from "./NotasProveedor"

export const useNotas = () => {

    const contexto = useContext(NotasContexto)

    if (!contexto) {
        throw new Error("El componente debe estar dentro del Proveedor de Notas")
    }

    return contexto;

} 