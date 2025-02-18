import { createContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { useAlerta } from "../../../ControlesGlobales/Alertas/useAlerta";
import { useCargandoInformacion } from "../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion";
import { useModalConfirmacion } from "../../../ControlesGlobales/ModalConfirmacion/useModalConfirmacion";
import { obtenerDatos, obtenerDatosConId, obtenerRutaUrlActual } from "../../../FuncionesGlobales";
import { EstadoInicialSolicitudes } from "../Modelos/EstadoInicialSolicitudes";
import { solicitudesReducer } from "./solicitudesReducer";

export const SolicitudesContexto = createContext(null)

export const SolicitudesProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(solicitudesReducer, EstadoInicialSolicitudes)
    const location = useLocation(); // Obtiene la ubicación actual

    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchModalConfirmacion } = useModalConfirmacion();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();

    const obtenerIdEstadoSolicitudPorModulo = () => {
        const url = obtenerRutaUrlActual();
        switch (url) {
            case import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS:
                return 1;
            case import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES:
                return 2;
            case import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS:
                return 3;
            case import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS:
                return 4;
            case import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS:
                return 5;
            case import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS:
                return 6;
            case import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS:
                return 7;
            default:
                return null;
        }
    }

    const cargarSolicitudes = async () => {

        if (obtenerRutaUrlActual() === import.meta.env.VITE_APP_BELLON_HISTORIAL_MOVIMIENTOS_SOLICITUDES) {
            try {
                const res = await obtenerDatos(`HistorialMovimientoSolicitudesCI/Agrupado`, null);
                let json = [];
                if (res.status !== 204) {
                    json = res.data;
                }
                dispatch({ type: 'llenarSolicitudes', payload: { solicitudes: json } });
                dispatch({ type: 'combinarEstadosSolicitudes' });
            } catch (err) {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, cargando solicitudes', tipo: 'warning' } });
            }
            return;
        }

        const idEstadoSolicitud = obtenerIdEstadoSolicitudPorModulo();
        if (idEstadoSolicitud === null) return;
        try {
            const res = await obtenerDatos(`Solicitud/EstadoSolicitud?estadoSolicitudId=${idEstadoSolicitud}`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarSolicitudes', payload: { solicitudes: json } });
            dispatch({ type: 'combinarEstadosSolicitudes' });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, cargando solicitudes', tipo: 'warning' } });
        }
    }

    const cargarEstadosSolicitudes = async () => {
        try {
            const res = await obtenerDatos(`EstadoSolicitud`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarEstadosSolicitudes', payload: { estadosSolicitudes: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, cargando los estados de las solicitudes', tipo: 'warning' } });
        }
    }

    const cargarDepartamentos = async () => {
        try {
            const res = await obtenerDatos(`Departamento`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarDatos', payload: { propiedad: 'departamentos', valor: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, cargando los departamentos', tipo: 'warning' } });
        }
    }

    const cargarClasificaciones = async () => {
        try {
            const res = await obtenerDatos(`Clasificacion`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarDatos', payload: { propiedad: 'clasificaciones', valor: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, cargando las clasificaciones', tipo: 'warning' } });
        }
    }

    const cargarSucursales = async () => {
        try {
            const res = await obtenerDatos(`Sucursal`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarDatos', payload: { propiedad: 'sucursales', valor: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, cargando las sucursales', tipo: 'warning' } });
        }
    }

    const cargarDatosIniciales = async () => {
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' });
        await cargarEstadosSolicitudes();
        await cargarDepartamentos();
        await cargarClasificaciones();
        await cargarSucursales();
        await cargarSolicitudes();
        dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' });
    }

    const rechazar = (id) => {
        obtenerDatosConId('',)
    }

    const recuperar = (id) => {
        // dispatchModalConfirmacion({ type: 'mostrarModalConfirmacion', payload: { mensaje: 'Esta seguro que quiere recuperar este consumo interno?', funcionEjecutar: action.payload.funcionEjecutar } })
        obtenerDatosConId('',)
    }

    const eliminarSolicitud = async (id) => {
        dispatchModalConfirmacion({ type: 'mostrarModalConfirmacion', payload: { mensaje: 'Realmente desea rechazar la operación?', funcionEjecutar: rechazar(id) } })
    }

    const recuperarSolicitudes = async (id) => {
        dispatchModalConfirmacion({ type: 'mostrarModalConfirmacion', payload: { mensaje: 'Realmente desea reabrir la solicitud?', funcionEjecutar: recuperar(id) } })
    }

    useEffect(() => {
        dispatch({ type: 'llenarSolicitudes', payload: { solicitudes: [] } });
        cargarDatosIniciales();
    }, [location]);

    return (
        <SolicitudesContexto.Provider value={{ state, dispatch, eliminarSolicitud, recuperarSolicitudes }}>
            {children}
        </SolicitudesContexto.Provider>
    )
} 