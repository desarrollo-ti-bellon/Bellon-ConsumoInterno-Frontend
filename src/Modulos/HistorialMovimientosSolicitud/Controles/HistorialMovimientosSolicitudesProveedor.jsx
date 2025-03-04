import { createContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { useAlerta } from "../../../ControlesGlobales/Alertas/useAlerta";
import { useCargandoInformacion } from "../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion";
import { useModalAlerta } from "../../../ControlesGlobales/ModalAlerta/useModalAlerta";
import { obtenerDatos, obtenerDatosConId } from "../../../FuncionesGlobales";
import { EstadoInicialMovimientosSolicitudes } from "../Modelos/EstadoInicialHistorialMovimientosSolicitudes";
import { historialMovimientosSolicitudesReducer } from "./historialMovimientosSolicitudesReducer";

export const HistorialMovimientosSolicitudesContexto = createContext(null)

export const HistorialMovimientosSolicitudesProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(historialMovimientosSolicitudesReducer, EstadoInicialMovimientosSolicitudes);
    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();
    const formData = useLocation();

    const cargarEstadosSolicitudes = async () => {
        try {
            const res = await obtenerDatos(`EstadoSolicitud`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarDatos', payload: { propiedad: 'estadosSolicitudes', valor: json } });
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

    const cargarHistorialMovimientosSolicitudes = async () => {
        console.log('cargarHistorialMovimientosSolicitudes =>', formData.state);
        if (!formData.state) {
            return;
        }
        try {
            const res = await obtenerDatosConId('HistorialMovimientoSolicitudesCI/Historial', formData.state.no_documento);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarLineaTiempo', payload: { historialMovimientosSolicitudes: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + err.response.data.mensaje, tipo: 'warning' } });
        }
    }

    const cargarDatos = async () => {
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' });
        await cargarEstadosSolicitudes();
        await cargarDepartamentos();
        await cargarClasificaciones();
        await cargarSucursales();
        await cargarHistorialMovimientosSolicitudes();
        dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' });
    }

    useEffect(() => {
        cargarDatos();
    }, [])

    return (
        <HistorialMovimientosSolicitudesContexto.Provider value={{ state, dispatch }}>
            {children}
        </HistorialMovimientosSolicitudesContexto.Provider>
    )
} 