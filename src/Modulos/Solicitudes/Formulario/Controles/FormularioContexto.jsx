import { createContext, useEffect, useReducer, useRef, useState } from "react"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useAlerta } from "../../../../ControlesGlobales/Alertas/useAlerta"
import { useCargandoInformacion } from "../../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion"
import { enviarDatos, guardarDatosEnLocalStorage, obtenerDatos, obtenerDatosConId, obtenerFechaActual, obtenerFechaYHoraActual, obtenerNombreUsuarioLoggeado, obtenerRutaUrlActual } from "../../../../FuncionesGlobales"
import { EstadoInicialFormulario } from "../Modelos/EstadoInicialFormulario"
import { formularioReducer } from "./formularioReducer"
import { useModalAlerta } from "../../../../ControlesGlobales/ModalAlerta/useModalAlerta"

export const FormularioContexto = createContext(null)

export const FormularioProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(formularioReducer, EstadoInicialFormulario)

    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();
    const formData = useLocation();
    const navegar = useNavigate();
    const [locacion] = useSearchParams();
    const tiempoFuera = useRef(null)
    const [contador, setContador] = useState(0);

    const obtenerIdEstadoSolicitudPorModulo = () => {
        const url = obtenerRutaUrlActual();
        const estadoMap = {
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS_FORMULARIO]: 'nueva',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES_FORMULARIO]: 'pendiente',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS_FORMULARIO]: 'aprobada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS_FORMULARIO]: 'rechazada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS_FORMULARIO]: 'entregada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS_FORMULARIO]: 'confirmada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS_FORMULARIO]: 'terminada',
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
                // Buscar el usuario aprobador
                const usuarioAprobador = state.comboUsuariosAprobadores?.find(usuario => usuario.id_usuario_ci == json.id_usuario_responsable);

                // Si se encuentra el usuario, definimos el limite
                if (usuarioAprobador) {
                    definirLimiteAprobacion(usuarioAprobador.limite);  // Usamos el operador de coalescencia nula (??) para evitar undefined
                } else {
                    console.log('Usuario aprobador no encontrado');
                    definirLimiteAprobacion(0);  // Definimos un valor predeterminado de 0 si el usuario no es encontrado
                }
            }).catch((err) => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando la solicitud #${formData.state.id_cabecera_solicitud}`, tipo: 'warning' } });
            })
    }

    const cargarEstadosSolicitudes = async () => {
        try {
            const res = await obtenerDatos(`EstadoSolicitud`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarComboEstadosSolicitudes', payload: { estadosSolicitudes: json } });
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

    const cargarDepartamentos = async () => {
        try {
            const res = await obtenerDatos(`Departamento`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarComboDepartamentos', payload: { comboDepartamentos: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando los Departamentos`, tipo: 'warning' } });
        }
    }

    const cargarUsuarios = async () => {
        try {
            const res = await obtenerDatos(`Usuarios`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarComboUsuarios', payload: { comboUsuarios: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando los Usuarios`, tipo: 'warning' } });
        }
    }

    const cargarSucursales = async () => {
        try {
            const res = await obtenerDatos(`Sucursal`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarComboSucursales', payload: { comboSucursales: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las Sucursales`, tipo: 'warning' } });
        }
    }

    const cargarPosiciones = async () => {
        try {
            const res = await obtenerDatos(`Posiciones`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarComboPosiciones', payload: { comboPosiciones: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las Posiciones`, tipo: 'warning' } });
        }
    }

    const cargarUsuariosCI = async () => {
        try {
            const res = await obtenerDatos(`UsuariosCI`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarComboUsuariosCI', payload: { comboUsuariosCI: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las Posiciones`, tipo: 'warning' } });
        }
    }

    const cargarUsuariosCIConCorreo = async () => {
        try {
            const res = await obtenerDatos(`UsuariosCI/Correo?correo=` + obtenerNombreUsuarioLoggeado(), null);
            let json = {};
            if (res.status !== 204) {
                json = res.data;
            }
            // dispatch({ type: 'llenarFormulario', payload: { formulario: json } })
            // dispatch({ type: 'llenarComboUsuariosCI', payload: { comboUsuariosCI: json } });
            dispatch({ type: 'actualizarFormulario', payload: { id: 'id_departamento', value: json.id_departamento } })
            dispatch({ type: 'actualizarFormulario', payload: { id: 'id_sucursal', value: json.id_sucursal } })
            cargarUsuariosAprobadoresPorDepartamentos(json.id_departamento);
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las Posiciones`, tipo: 'warning' } });
        }
    }

    const cargarClasificaciones = async () => {
        try {
            const res = await obtenerDatos(`Clasificacion`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarComboClasificaciones', payload: { comboClasificaciones: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las Posiciones`, tipo: 'warning' } });
        }
    }

    const cargarUsuariosAprobadoresPorDepartamentos = async (departamentoId) => {
        try {
            const res = await obtenerDatos(`UsuariosCI/Departamento?departamentoId=${departamentoId}`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            setContador(0);
            dispatch({ type: 'llenarComboUsuariosAprobadores', payload: { comboUsuariosAprobadores: json } });
            actualizarFormulario('id_usuario_responsable', json[0].id_usuario_ci)
            actualizarFormulario('usuario_responsable', json[0].nombre_usuario)
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las UsuariosCI/Departamento`, tipo: 'warning' } });
        }
    }

    const guardar = async () => {
        console.log('guardar', state.formulario)
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        enviarDatos('Solicitud/Cabecera', state.formulario)
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
        noValidarFormulario();
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

        if (state.productosSeleccionados.length == 0) {
            dispatchAlerta({ action: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Debe seleccionar al menos un producto', tipo: 'warning' } });
            return;
        }

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

    const cargarPerfilUsuarioLogueado = async () => {
        try {
            return await obtenerDatos(`UsuariosCI/Correo?correo=${obtenerNombreUsuarioLoggeado()}`, null)
                .then((res) => {
                    let json = null;
                    if (res.status != 204) {
                        json = res.data;
                        guardarDatosEnLocalStorage('perfilUsuarioLogueado', JSON.stringify(json))
                    } else {
                        dispatchModalAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'No se ha encontrado el perfil del usuario logueado!', tipo: 'warning' } });
                        setTimeout(() => {
                            navegar('/403')
                        }, 3000);
                    }
                })
        } catch (error) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las Posiciones`, tipo: 'warning' } });
        }
    }

    const cargarDatosIniciales = async () => {
        await cargarPerfilUsuarioLogueado();
        await cargarEstadosSolicitudes();
        await cargarDepartamentos();
        await cargarUsuarios();
        await cargarSucursales();
        await cargarPosiciones();
        await cargarUsuariosCI();
        await cargarClasificaciones();
        await cargarUsuariosCIConCorreo();
    }

    const validarFormulario = () => {
        dispatch({ type: 'validarFormulario', payload: { validadoFormulario: true } })
    }

    const noValidarFormulario = () => {
        dispatch({ type: 'validarFormulario', payload: { validadoFormulario: false } })
    }

    const limpiarFormulario = () => {
        dispatch({ type: 'limpiarFormulario' })
    }

    const actualizarFormulario = (id, value) => {
        dispatch({ type: 'actualizarFormulario', payload: { id, value } })
    }

    const delegarResponsable = () => {
        if (!state.comboUsuariosAprobadores) {
            return;
        }
        setContador(contador + 1);
    }

    const definirLimiteAprobacion = (limite) => {
        dispatch({ type: 'difinirLimite', payload: { limiteAprobacion: limite ?? 0 } });
    }

    /* CONTROLANDO LA DELEGACION DEL LIMITE */
    useEffect(() => {
        if (contador >= state.comboUsuariosAprobadores.length) {
            setContador(0);
        }
        actualizarFormulario('id_usuario_responsable', state.comboUsuariosAprobadores[contador]?.id_usuario_ci ?? 0);
        actualizarFormulario('usuario_responsable', state.comboUsuariosAprobadores[contador]?.nombre_usuario ?? '');
        definirLimiteAprobacion(state.comboUsuariosAprobadores[contador]?.limite ?? 0);
    }, [contador])

    const cargarDatos = async () => {
        dispatchCargandoInformacion({ action: 'mostrarCargandoInformacion' })
        await cargarDatosIniciales();

        // MODO ESCRITURA O MODO VER
        if (formData.state) {
            await cargarSolicitudPorId();
            const accion = locacion.get('accion');

            if (accion === 'editar') {
                dispatch({
                    type: 'inactivarCampos',
                    payload: {
                        campos: {
                            ...state.inactivarCampos,
                            campo_id_cabecera_solicitud: true,
                            campo_no_documento: true,
                            campo_fecha_creado: true,
                            campo_comentario: false,
                            campo_creado_por: true,
                            campo_usuario_responsable: true,
                            campo_usuario_despacho: true,
                            campo_usuario_asistente_control: true,
                            campo_usuario_asistente_contabilidad: true,
                            campo_id_departamento: false,
                            campo_id_estado_solicitud: false,
                            campo_id_clasificacion: false,
                            campo_id_sucursal: false,
                            campo_fecha_modificado: true,
                            campo_modificado_por: true,
                            campo_total: true,
                            campo_id_usuario_responsable: true,
                            campo_id_usuario_despacho: true,
                            campo_id_usuario_asistente_inventario: true,
                            campo_id_usuario_asistente_contabilidad: true,
                        }
                    }
                });
            }

            if (accion === 'ver') {
                dispatch({
                    type: 'inactivarCampos',
                    payload: {
                        campos: {
                            ...state.inactivarCampos,
                            campo_id_cabecera_solicitud: true,
                            campo_no_documento: true,
                            campo_fecha_creado: true,
                            campo_id_departamento: true,
                            campo_usuario_despacho: true,
                            campo_usuario_asistente_control: true,
                            campo_usuario_asistente_contabilidad: true,
                            campo_id_estado_solicitud: true,
                            campo_id_clasificacion: true,
                            campo_id_sucursal: true,
                            campo_fecha_modificado: true,
                            campo_modificado_por: true,
                            campo_total: true,
                            campo_comentario: true,
                            campo_creado_por: true,
                            campo_usuario_responsable: true,
                            campo_usuario_despacho: true,
                            campo_id_usuario_responsable: true,
                            campo_id_usuario_despacho: true,
                            campo_id_usuario_asistente_inventario: true,
                            campo_id_usuario_asistente_contabilidad: true
                        }
                    }
                });
            }

        }

        // MODO LECTURA O MODO NUEVO
        if (!formData.state) {
            const habilitarCampos = (obtenerIdEstadoSolicitudPorModulo() === 'nueva');
            if (habilitarCampos) {
                // LLENAR FORMULARIO
                dispatch({ type: 'actualizarFormulario', payload: { id: 'fecha_creado', value: obtenerFechaActual() } })
                dispatch({ type: 'actualizarFormulario', payload: { id: 'creado_por', value: obtenerNombreUsuarioLoggeado() } })
                dispatch({ type: 'actualizarFormulario', payload: { id: 'id_estado_solicitud', value: 1 } })
            }

            dispatch({
                type: 'inactivarCampos',
                payload: {
                    campos: {
                        ...state.inactivarCampos,
                        campo_id_cabecera_solicitud: true,
                        campo_no_documento: true,
                        campo_fecha_creado: true,
                        campo_id_departamento: false,
                        campo_usuario_despacho: false,
                        campo_usuario_asistente_control: false,
                        campo_usuario_asistente_contabilidad: false,
                        campo_id_estado_solicitud: false,
                        campo_id_clasificacion: false,
                        campo_id_sucursal: false,
                        campo_fecha_modificado: true,
                        campo_modificado_por: true,
                        campo_total: true,
                        campo_comentario: false,
                        campo_creado_por: true,
                        campo_usuario_responsable: true,
                        campo_usuario_despacho: true,
                        campo_id_usuario_responsable: false,
                        campo_id_usuario_despacho: true,
                        campo_id_usuario_asistente_inventario: true,
                        campo_id_usuario_asistente_contabilidad: true
                    }
                }
            });
        }

        //CAMPOS REQUERIDOS
        dispatch({
            type: 'camposRequeridos',
            payload: {
                campos: {
                    ...state.camposRequeridos,
                    requerido_id_cabecera_solicitud: false,
                    requerido_no_documento: false,
                    requerido_fecha_creado: false,
                    requerido_id_departamento: false,
                    requerido_usuario_despacho: false,
                    requerido_usuario_asistente_control: false,
                    requerido_usuario_asistente_contabilidad: false,
                    requerido_id_estado_solicitud: false,
                    requerido_id_clasificacion: true,
                    requerido_id_sucursal: false,
                    requerido_fecha_modificado: false,
                    requerido_modificado_por: false,
                    requerido_total: false,
                    requerido_comentario: false,
                    requerido_creado_por: false,
                    requerido_usuario_responsable: false,
                    requerido_usuario_despacho: false,
                    requerido_id_usuario_responsable: false,
                    requerido_id_usuario_despacho: false,
                    requerido_id_usuario_asistente_inventario: false,
                    requerido_id_usuario_asistente_contabilidad: false
                }
            }
        });

        // ACTUALIZAR ULTIMA ACTUALIZACION DE REGISTRO
        dispatch({ type: 'actualizarUltimaActualizacionDeRegistro', payload: { ultimaActualizacionDeRegistro: 'ninguna' } })
        dispatchCargandoInformacion({ action: 'limpiarCargandoInformacion' })
    }

    useEffect(() => {
        cargarDatos();
    }, [])

    useEffect(() => {
        if (state.modalAgregarProductos && state.listadoProductos.length === 0) {
            cargarProductos();
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
            tiempoFuera.current = setTimeout(() => {
                guardar();
            }, 2000)
            return () => {
                clearTimeout(tiempoFuera.current);
            }
        }
    }, [state.formulario, state.validadoFormulario])

    return (
        <FormularioContexto.Provider value={{ state, dispatch, guardar, guardarLineas, pasarLineasDelModalAlDetalle, obtenerIdEstadoSolicitudPorModulo, delegarResponsable, actualizarFormulario, validarFormulario, noValidarFormulario, limpiarFormulario }}>
            {children}
        </FormularioContexto.Provider>
    )
} 