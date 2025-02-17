import { createContext, useEffect, useReducer } from "react";
import { rutas as rutasModulos } from "../../Archivos/Configuracion/Rutas";
import { guardarDatosEnLocalStorage, obtenerDatos, obtenerDatosDelLocalStorage, obtenerNombreUsuarioLoggeado } from "../../FuncionesGlobales";
import { estadoInicialMenuVertical } from "./menuVerticalModel";
import { menuVerticalReducer } from "./menuVerticalReducer";
import { useModalAlerta } from "../ModalAlerta/useModalAlerta";
import { useControlGeneral } from "../ControlGeneral/useControlGeneral";

export const menuVerticalContexto = createContext(null);

export default function MenuVerticalProveedor({ children }) {

    const [state, dispatch] = useReducer(menuVerticalReducer, estadoInicialMenuVertical)
    const { state: stateControlGeneral, dispatch: dispatchControlGeneral } = useControlGeneral();

    const regularRutasDelPerfilUsuarioLogueado = () => {

        const datosUsuarioLogueado = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE_PERFIL_USUARIO);
        const usuarioLogueado = datosUsuarioLogueado !== null;

        let urls = []
        if (usuarioLogueado) {
            switch (datosUsuarioLogueado.posicion_id) {
                case 1: // 'Administrador':
                    urls = rutasModulos.filter(r => [
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS,
                        import.meta.env.VITE_APP_BELLON_MANTENIMIENTO_CLASIFICACIONES,
                        import.meta.env.VITE_APP_BELLON_MANTENIMIENTO_USUARIOS
                    ].includes(r.ruta));
                    break;
                case 2: // 'Director'
                    urls = rutasModulos.filter(r => [
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES,
                    ].includes(r.ruta));
                    break;
                case 3: // 'Gerente Area'
                    urls = rutasModulos.filter(r => [
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS
                    ].includes(r.ruta));
                    break;
                case 4: // 'Despacho'
                    urls = rutasModulos.filter(r => [
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS,
                    ].includes(r.ruta));
                    break;
                case 5: // 'Solicitante'
                    urls = rutasModulos.filter(r => [
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS,
                        import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS
                    ].includes(r.ruta));
                    break;
                default:
                    urls = [];
                    break;
            }
        }

        return urls;
    }

    const cargarDatos = async () => {
        regularRutasDelPerfilUsuarioLogueado(rutasModulos);
    }

    useEffect(() => {
        cargarDatos();
    }, [stateControlGeneral.perfilUsuario])

    return (
        <menuVerticalContexto.Provider value={{ state, dispatch, rutas: regularRutasDelPerfilUsuarioLogueado() }}>
            {children}
        </menuVerticalContexto.Provider>
    )

}