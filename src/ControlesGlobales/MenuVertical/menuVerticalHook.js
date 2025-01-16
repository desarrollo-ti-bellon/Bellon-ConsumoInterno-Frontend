import { useContext } from "react";
import { menuVerticalContexto } from "./menuVerticalProvedor";

export const useMenuVertical = () => {

    const context = useContext(menuVerticalContexto);

    if (!context) {
        throw new Error('useMenuVertical debe estar dentro de un menuVertical Proveedor');
    }
    
    return context;
}