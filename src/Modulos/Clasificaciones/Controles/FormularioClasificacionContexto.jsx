import { createContext, useEffect, useReducer, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useAlerta } from "../../../ControlesGlobales/Alertas/useAlerta"
import { useCargandoInformacion } from "../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion"
import { useModalAlerta } from "../../../ControlesGlobales/ModalAlerta/useModalAlerta"
import { eliminarDatosConId, enviarDatos, obtenerDatos } from "../../../FuncionesGlobales"
import { EstadoInicialClasificacionFormulario } from "../Modelos/EstadoInicialClasificacionFormulario"
import { formularioClasificacionReducer } from "./formularioClasificacionReducer"

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
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        await cargarClasificacionesERP();
        await cargarClasificaciones();
        dispatch({ type: 'validarFormulario', payload: { validadoFormulario: false } })
        dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
    }

    const guardar = () => {

        if (!state.validadoFormulario) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Debes llenar los campos requeridos.', tipo: 'warning' } })
            return;
        }

        console.log('guardar', state.formulario)
        if (state.formulario.id_clasificacion === null) {
            const existeClasificacion = state.lineas.find(linea => linea.codigo_clasificacion === state.formulario.codigo_clasificacion)
            console.log('existeClasificacion=>', existeClasificacion);
            if (existeClasificacion) {
                dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: 'No se puede agregar esta clasificación porque ha sido agregada con esta decripción.<hr/> <ul>' + existeClasificacion.descripcion + '</ul>', tamano: 'md', mostrar: true } })
                return;
            }
        }
        
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        enviarDatos('Clasificacion', state.formulario)
            .then((res) => {
                let json = res.data;
                cargarClasificaciones();
                dispatch({ type: 'limpiarFormulario' })
                dispatch({ type: 'validarFormulario', payload: { validadoFormulario: false } })
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se realizó correctamente', tipo: 'success' } })
            })
            .catch((err) => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + err.response.data.mensaje, tipo: 'warning' } })
            })
            .finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
            })
    }

    const eliminaLinea = (id) => {
        dispatch({ type: 'limpiarFormulario' })
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        eliminarDatosConId('Clasificacion', id)
            .then((res) => {
                // let json = res.data;
                cargarClasificaciones();
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se realizó correctamente', tipo: 'success' } })
            })
            .catch((err) => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + err.response.data.mensaje, tipo: 'warning' } })
            })
            .finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
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
        // if (state.validadoFormulario) {
        //     tiempoFuera.current = setTimeout(() => {
        //         guardar();
        //     }, 2000)
        //     return () => {
        //         clearTimeout(tiempoFuera.current);
        //     }
        // }
    }, [state.formulario, state.validadoFormulario])

    return (
        <FormularioClasificacionContexto.Provider value={{ state, dispatch, guardar, eliminaLinea }}>
            {children}
        </FormularioClasificacionContexto.Provider>
    )
} 