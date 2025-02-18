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

    const cargarEstadosSolicitud = async () => {
        try {
            const res = await obtenerDatos('EstadoSolicitud',null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarEstadosSolicitudes', payload: { estadosSolicitud: json } });
        } catch (error) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + error, tipo: 'warning' } });
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
        } catch (error) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + error, tipo: 'warning' } });
        }
    }

    const cargarDatos = async () => {
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' });
        await cargarEstadosSolicitud();
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