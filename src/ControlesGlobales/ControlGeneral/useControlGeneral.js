import { useContext } from "react"
import { ControlGeneralContexto } from "./ControlGeneralProveedor";

export const useControlGeneral = () => {

    const contexto = useContext(ControlGeneralContexto);

    if (!contexto) {
        throw new Error("Debe de usar este hook dentro del contexto ControlGeneralContexto")
    }
    
    return contexto;
}