import { createContext, useEffect, useReducer, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useAlerta } from "../../../ControlesGlobales/Alertas/useAlerta"
import { useCargandoInformacion } from "../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion"
import { EstadoInicialClasificacionFormulario } from "../Modelos/EstadoInicialClasificacionFormulario"
import { formularioClasificacionReducer } from "./formularioClasificacionReducer"
import { enviarDatos, obtenerDatos } from "../../../FuncionesGlobales"
import { useModalAlerta } from "../../../ControlesGlobales/ModalAlerta/useModalAlerta"

export const FormularioClasificacionContexto = createContext(null)

export const FormularioClasificacionProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(formularioClasificacionReducer, EstadoInicialClasificacionFormulario)

    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();

    const formData = useLocation();
    const tiempoFuera = useRef(null)

    const cargarClasificacionesERP = async () => {
        try {
            const res = await obtenerDatos(`Clasificacion/ERP`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarClasificaciones', payload: { clasificaciones: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las clasificaciones`, tipo: 'warning' } });
        }
    }

    const cargarClasificaciones = async () => {
        try {
            const res = await obtenerDatos(`Clasificacion`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarLineas', payload: { lineas: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las clasificaciones`, tipo: 'warning' } });
        }
    }

    const cargarDatosIniciales = async () => {
        dispatchCargandoInformacion({ action: 'mostrarCargandoInformacion' })
        await cargarClasificacionesERP();
        await cargarClasificaciones();
        dispatchCargandoInformacion({ action: 'limpiarCargandoInformacion' })
    }

    const guardar = () => {
        console.log('guardar', state.formulario)

        if (state.formulario.id_clasificacion === null) {
            const existeClasificacion = state.lineas.find(linea => linea.id_grupo_cont_producto_general === state.formulario.id_grupo_cont_producto_general)
            console.log('existeClasificacion=>', existeClasificacion);
            if (existeClasificacion) {
                dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: 'No se puede agregar esta clasificación porque ha sido agregada con esta decripción.<hr/> <ul>' + existeClasificacion.descripcion + '</ul>', tamano: 'md' } })
                return;
            }
        }

        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        enviarDatos('Clasificacion', state.formulario)
            .then((res) => {
                let json = res.data;
                cargarClasificaciones();
                dispatch({ type: 'limpiarFormulario' })
                dispatch({ type: 'actualizarUltimaActualizacionDeRegistro', payload: { ultimaActualizacionDeRegistro: obtenerFechaYHoraActual() } })
                dispatchAlerta({ action: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se realizó correctamente', tipo: 'success' } })
            })
            .catch((err) => {
                dispatchAlerta({ action: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + err, tipo: 'warning' } })
            })
            .finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
                dispatch({ type: 'validarFormulario', payload: { validadoFormulario: false } })
            })
    }

    useEffect(() => {
        cargarDatosIniciales();
        dispatch({
            type: 'inactivarCampos', payload: {
                campos: {
                    ...state.inactivarCampos,
                    campo_id_clasificacion: true,
                    campo_id_grupo_cont_producto_general: true,
                    campo_codigo_clasificacion: false,
                    campo_descripcion: false,
                    campo_estado: false
                }
            }
        })
    }, [])

    useEffect(() => {
        if (state.validadoFormulario) {
            tiempoFuera.current = setTimeout(() => {
                guardar();
            }, 2000)
            return () => {
                clearTimeout(tiempoFuera.current);
            }
        }
    }, [state.formulario, state.validadoFormulario])

    return (
        <FormularioClasificacionContexto.Provider value={{ state, dispatch, guardar }}>
            {children}
        </FormularioClasificacionContexto.Provider>
    )
} 