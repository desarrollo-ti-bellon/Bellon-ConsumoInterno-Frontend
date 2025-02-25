import { createContext, useEffect, useReducer, useState } from "react";
import { rutas as rutasModulos } from "../../Archivos/Configuracion/Rutas";
import { useControlGeneral } from "../ControlGeneral/useControlGeneral";
import { estadoInicialMenuVertical } from "./menuVerticalModel";
import { menuVerticalReducer } from "./menuVerticalReducer";

export const menuVerticalContexto = createContext(null);

export default function MenuVerticalProveedor({ children }) {

    const [state, dispatch] = useReducer(menuVerticalReducer, estadoInicialMenuVertical)
    const { state: stateControlGeneral, dispatch: dispatchControlGeneral } = useControlGeneral();
    const [rutas, setRutas] = useState([]);

    const regularRutasDelPerfilUsuarioLogueado = () => {

        if (!stateControlGeneral.perfilUsuario) {
            return;
        }

        const { posicion_id } = stateControlGeneral.perfilUsuario;
        let urls = [];
        console.log('regularRutasDelPerfilUsuarioLogueado =>', posicion_id);

        switch (posicion_id) {
            case 1: // 'Administrador':
                urls = rutasModulos.filter(r => [
                    import.meta.env.VITE_APP_BELLON_SOLICITUDES,
                    import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONSUMOS_INTERNOS,
                    import.meta.env.VITE_APP_BELLON_MANTENIMIENTO_USUARIOS,
                    import.meta.env.VITE_APP_BELLON_MANTENIMIENTO_CLASIFICACIONES,
                    import.meta.env.VITE_APP_BELLON_HISTORIAL_MOVIMIENTOS_SOLICITUDES
                ].includes(r.ruta));
                break;
            case 2: // 'Director'
                urls = rutasModulos.filter(r => [
                    import.meta.env.VITE_APP_BELLON_SOLICITUDES,
                    import.meta.env.VITE_APP_BELLON_MANTENIMIENTO_CLASIFICACIONES,
                ].includes(r.ruta));
                break;
            case 3: // 'Gerente Area'
                urls = rutasModulos.filter(r => [
                    import.meta.env.VITE_APP_BELLON_SOLICITUDES,
                    import.meta.env.VITE_APP_BELLON_MANTENIMIENTO_CLASIFICACIONES,
                ].includes(r.ruta));
                break;
            case 4: // 'Despacho'
                urls = rutasModulos.filter(r => [
                    import.meta.env.VITE_APP_BELLON_SOLICITUDES,
                ].includes(r.ruta));
                break;
            case 5: // 'Solicitante'
                urls = rutasModulos.filter(r => [
                    import.meta.env.VITE_APP_BELLON_SOLICITUDES,
                    import.meta.env.VITE_APP_BELLON_HISTORIAL_MOVIMIENTOS_SOLICITUDES
                ].includes(r.ruta));
                break;
            default:
                urls = [];
                break;
        }

        setRutas(urls);
    }

    const cargarDatos = () => {
        regularRutasDelPerfilUsuarioLogueado();
    }

    useEffect(() => {
        regularRutasDelPerfilUsuarioLogueado();
        console.log('abri/cerro el side menu');
    }, [state.mostrar])

    useEffect(() => {
        cargarDatos();
        console.log('cargo el perfil de usuario');
    }, [stateControlGeneral.perfilUsuario])

    return (
        <menuVerticalContexto.Provider value={{ state, dispatch, rutas }}>
            {/* <menuVerticalContexto.Provider value={{ state, dispatch, rutas: rutasModulos }}> */}
            {children}
        </menuVerticalContexto.Provider>
    )

}