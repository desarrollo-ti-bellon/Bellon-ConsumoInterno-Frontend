import { createContext, useEffect, useReducer } from "react"
import { useLocation } from "react-router-dom"
import { useAlerta } from "../../../../ControlesGlobales/Alertas/useAlerta"
import { useCargandoInformacion } from "../../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion"
import { enviarDatos, obtenerDatos, obtenerDatosConId, obtenerFechaYHoraActual, obtenerNombreUsuarioLoggeado, obtenerRutaUrlActual } from "../../../../FuncionesGlobales"
import { EstadoInicialFormulario } from "../Modelos/EstadoInicialFormulario"
import { formularioReducer } from "./formularioReducer"

export const FormularioContexto = createContext(null)

export const FormularioProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(formularioReducer, EstadoInicialFormulario)

    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();
    const formData = useLocation();

    const obtenerIdEstadoSolicitudPorModulo = () => {
        const url = obtenerRutaUrlActual();
        const estadoMap = {
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS]: 'nueva',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES]: 'pendiente',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS]: 'aprobada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS]: 'rechazada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS]: 'entregada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS]: 'confirmada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS]: 'terminada',
        };
        return estadoMap[url] || null;
    }

    const cargarSolicitudPorId = async () => {

        if (!formData.state) {
            return;
        }

        await obtenerDatosConId('Solicitud', formData.state.id_cabecera_solicitud)
            .then((res) => {
                const json = res.data;
                dispatch({ type: 'llenarFormulario', payload: { formulario: json } })
                dispatch({ type: 'llenarLineas', payload: { lineas: json.lineas } })
            }).catch((err) => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando la solicitud #${2}`, tipo: 'warning' } });
            })
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
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando los estados de las solicitudes`, tipo: 'warning' } });
        }
    };

    const cargarProductos = async () => {
        try {
            const res = await obtenerDatos(`Productos`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarProductos', payload: { productos: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando los Productos`, tipo: 'warning' } });
        }
    };

    const cargarDatosIniciales = async () => {
        dispatchCargandoInformacion({ action: 'mostrarCargandoInformacion' })
        await cargarEstadosSolicitudes()
        await cargarSolicitudPorId()
        await cargarProductos();
        dispatchCargandoInformacion({ action: 'limpiarCargandoInformacion' })
    }

    const guardar = async () => {
        console.log('guardar', state.formulario)
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        enviarDatos('Solicitud', state.formulario)
            .then((res) => {
                let json = res.data;
                dispatch({ type: 'llenarFormulario', payload: { formulario: json } })
                dispatch({ type: 'llenarLineas', payload: { lineas: json.lineas } })
                dispatch({ type: 'actualizarUltimaActualizacionDeRegistro', payload: { ultimaActualizacionDeRegistro: obtenerFechaYHoraActual() } })
                dispatchAlerta({ action: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se realizó correctamente', tipo: 'success' } })
            })
            .catch((err) => {
                dispatchAlerta({ action: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + err, tipo: 'warning' } })
            })
            .finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
            })
    }

    const guardarLineas = async (parametros) => {
        console.log('guardar Lineas', state.productosSeleccionados)
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        enviarDatos('Solicitud/Linea', parametros)
            .then((res) => {
                const json = res.data;
                dispatch({ type: 'llenarFormulario', payload: { formulario: json } })
                dispatch({ type: 'llenarLineas', payload: { lineas: json.lineas } })
                dispatch({ type: 'actualizarUltimaActualizacionDeRegistro', payload: { ultimaActualizacionDeRegistro: obtenerFechaYHoraActual() } })
                dispatchAlerta({ action: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se realizó correctamente', tipo: 'success' } })
                dispatch({ type: 'limpiarProductosSeleccionados' })
            })
            .catch((err) => {
                dispatchAlerta({ action: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + err, tipo: 'warning' } })
            })
            .finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
            })
    }

    const pasarLineasDelModalAlDetalle = () => {
        const lineas = state.productosSeleccionados.map(producto => {
            return {
                id_linea_solicitud: producto.id_linea_solicitud ?? null,
                cabecera_solicitud_id: state.formulario.id_cabecera_solicitud,
                id_producto: producto.id_producto,
                no_producto: producto.no,
                descripcion: producto.descripcion,
                precio_unitario: producto.precio_unitario,
                cantidad: 0,
                id_unidad_medida: "",
                codigo_unidad_medida: producto.codigo_unidad_medida,
                almacen_id: "",
                almacen_codigo: "",
                nota: ""
            }
        })
        guardarLineas(lineas);
    }

    useEffect(() => {
        cargarDatosIniciales();
        if (formData.state) {
            dispatch({
                type: 'inactivarCampos',
                payload: {
                    campos: {
                        ...state.inactivarCampos,
                        campo_id_cabecera_solicitud: true,
                        campo_fecha_creado: true,
                        campo_comentario: true,
                        campo_creado_por: true,
                        campo_id_departamento: true,
                        campo_usuario_responsable: true,
                        campo_usuario_despacho: true,
                        campo_usuario_asistente_control: false,
                        campo_usuario_asistente_contabilidad: false,
                        campo_id_estado_solicitud: true,
                        campo_id_clasificacion: false,
                        campo_id_sucursal: false,
                        campo_total: true
                    }
                }
            });
        } else {
            const habilitarCampos = (obtenerIdEstadoSolicitudPorModulo() === 'nueva');
            if (habilitarCampos) {
                dispatch({ type: 'actualizarUltimaActualizacionDeRegistro', payload: { ultimaActualizacionDeRegistro: 'ninguna' } })
                dispatch({ type: 'actualizarFormulario', payload: { id: 'fecha_creado', value: new Date().toISOString().split('T')[0] } })
                dispatch({ type: 'actualizarFormulario', payload: { id: 'creado_por', value: obtenerNombreUsuarioLoggeado() } })
                dispatch({ type: 'actualizarFormulario', payload: { id: 'id_estado_solicitud', value: 1 } })
                dispatch({
                    type: 'inactivarCampos',
                    payload: {
                        campos: {
                            // ...state.inactivarCampos,
                            // campo_id_cabecera_solicitud: true,
                            // campo_fecha_creado: true,
                            // campo_comentario: true,
                            // campo_creado_por: true,
                            // campo_id_departamento: false,
                            // campo_usuario_responsable: true,
                            // campo_usuario_despacho: true,
                            // campo_usuario_asistente_control: true,
                            // campo_usuario_asistente_contabilidad: true,
                            // campo_id_estado_solicitud: true,
                            // campo_id_clasificacion: false,
                            // campo_id_sucursal: false,
                            // campo_fecha_modificado: false,
                            // campo_modificado_por: false,
                            // campo_total: true
                            
                            ...state.inactivarCampos,
                            campo_id_cabecera_solicitud: false,
                            campo_fecha_creado: false,
                            campo_comentario: false,
                            campo_creado_por: false,
                            campo_id_departamento: false,
                            campo_usuario_responsable: false,
                            campo_usuario_despacho: false,
                            campo_usuario_asistente_control: false,
                            campo_usuario_asistente_contabilidad: false,
                            campo_id_estado_solicitud: false,
                            campo_id_clasificacion: false,
                            campo_id_sucursal: false,
                            campo_total: false
                        }
                    }
                });
            }
        }
    }, [])

    useEffect(() => {
        if (state.modalAgregarProductos && state.listadoProductos.length === 0) {
            dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        }
    }, [state.modalAgregarProductos])

    useEffect(() => {
        if (state.listadoProductos.length > 0) {
            dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
        }
    }, [state.listadoProductos])

    useEffect(() => {
        if (state.validadoFormulario) {
            guardar();
        }
    }, [state.validadoFormulario])

    return (
        <FormularioContexto.Provider value={{ state, dispatch, guardar, guardarLineas, pasarLineasDelModalAlDetalle, obtenerIdEstadoSolicitudPorModulo }}>
            {children}
        </FormularioContexto.Provider>
    )
} 