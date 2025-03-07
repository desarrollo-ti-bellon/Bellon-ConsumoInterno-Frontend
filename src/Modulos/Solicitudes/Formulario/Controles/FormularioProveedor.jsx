import { createContext, useEffect, useReducer, useRef, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useAlerta } from "../../../../ControlesGlobales/Alertas/useAlerta"
import { useCargandoInformacion } from "../../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion"
import { useModalAlerta } from "../../../../ControlesGlobales/ModalAlerta/useModalAlerta"
import { eliminarDatosConId, enviarDatos, obtenerDatos, obtenerDatosConId, obtenerDatosDelLocalStorage, obtenerFechaActual, obtenerFechaYHoraActual, obtenerNombreUsuarioLoggeado, obtenerRutaUrlActual, quitarFormularioDeLaUrl } from "../../../../FuncionesGlobales"
import { EstadoInicialFormulario } from "../Modelos/EstadoInicialFormulario"
import { formularioReducer } from "./formularioReducer"

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

    const cargarSolicitudPorId = async () => {

        if (!formData.state) {
            return;
        }

        console.log('FormData =>', formData);
        let entidad = formData.state.hasOwnProperty("id_cabecera_solicitud") ? 'Solicitud' : 'ConsumoInterno';
        let id = entidad === 'Solicitud' ? formData.state.id_cabecera_solicitud : formData.state.id_cabecera_consumo_interno

        // SI ES VISTA, CARGAR DATOS DE LA SOLICITUD GENERAL
        if (locacion.get('modo') === 'vista') {
            await obtenerDatosConId('Solicitud/SolicitudGeneral', id)
                .then((res) => {

                    let json = {};
                    let detalle = [];

                    if (res.status !== 204) {
                        json = res.data;
                        detalle = json.lineas;
                    }

                    dispatch({ type: 'llenarFormulario', payload: { formulario: json } });
                    dispatch({ type: 'llenarLineas', payload: { lineas: detalle } });

                }).catch((err) => {
                    dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando la solicitud #${formData.state.id_cabecera_solicitud}`, tipo: 'warning' } });
                })
            return;
        }

        // CARGA LOS DATOS NORMAL 
        await obtenerDatosConId(entidad, id)
            .then((res) => {

                let json = {};
                let detalle = [];

                if (res.status !== 204) {
                    json = res.data;
                    detalle = json.lineas;
                }

                dispatch({ type: 'llenarFormulario', payload: { formulario: json } });
                dispatch({ type: 'llenarLineas', payload: { lineas: detalle } });

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
    }

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
    }

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
            actualizarFormulario('id_departamento', json.id_departamento)
            actualizarFormulario('id_sucursal', json.id_sucursal)
            cargarUsuariosAprobadoresPorDepartamentos(json.id_departamento);
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las Posiciones`, tipo: 'warning' } });
        }
    }

    const cargarClasificaciones = async () => {
        try {
            const res = await obtenerDatos(`Clasificacion/Activas`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarComboClasificaciones', payload: { comboClasificaciones: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las Posiciones`, tipo: 'warning' } });
        }
    }

    const cargarUnidadesMedida = async () => {
        try {
            const res = await obtenerDatos(`UnidadesDeMedida`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarComboUnidadesMedida', payload: { comboUnidadesMedida: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las Unidades De Medida`, tipo: 'warning' } });
        }
    }

    const cargarComboAlmacenes = async () => {
        try {
            const res = await obtenerDatos(`Almacenes`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            dispatch({ type: 'llenarComboAlmacenes', payload: { comboAlmacenes: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando los Almacenes`, tipo: 'warning' } });
        }
    }

    const cargarUsuariosAprobadoresPorDepartamentos = async (departamentoId = '') => {
        try {
            const res = await obtenerDatos(`UsuariosCI/Departamento?departamentoId=${departamentoId}`, null);
            let json = [];
            if (res.status !== 204) {
                json = res.data;
            }
            setContador(0);
            dispatch({ type: 'llenarComboUsuariosAprobadores', payload: { comboUsuariosAprobadores: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las UsuariosCI/Departamento`, tipo: 'warning' } });
        }
    }

    const cambiarEstadoSolicitud = (estado) => {
        dispatch({ type: 'cambiarEstadoGeneral', payload: { id: 'estadoCambiado', value: estado } })
    }

    const cambioEstadoSolicitud = () => {
        if (state.estadoCambiado) {
            dispatchModalAlerta({
                type: 'mostrarModalAlerta', payload: {
                    mensaje: `<div style="font-size: 20px; font-weight: 600; text-align: left;">Todo listo. Regresando a la pantalla anterior…</div></br>`,
                    mostrar: true,
                    tamano: 'md'
                }
            })
            cambiarEstadoSolicitud(false)
            setTimeout(() => {
                dispatchModalAlerta({ type: 'cerrarModalAlerta' })
                navegar(quitarFormularioDeLaUrl(formData.pathname))
            }, 2000);
        }
    }

    const guardar = async () => {

        if (formData.state) {
            if (state.formulario.id_cabecera_solicitud !== null) {
                if (state.lineas.length > 0) {
                    if (state.formulario.id_estado_solicitud !== import.meta.env.VITE_APP_ESTADO_SOLICITUD_NUEVA) {

                        const productosConCantidadCero = state.lineas.filter(linea => linea.cantidad <= 0)  // Filtra las líneas con cantidad <= 0
                        if (productosConCantidadCero.length > 0) {
                            let contenido = `<ul>`;
                            productosConCantidadCero.forEach((linea, index) => {
                                contenido += `<li>`;
                                contenido += ` <p>Producto: [${linea.no_producto}] ${linea.descripcion} </p>`;
                                contenido += ` <p>Cantidad: ${linea.cantidad}</p>`;
                                contenido += `</li>`;
                            })
                            contenido = `</ul>`;
                            dispatchModalAlerta({
                                type: 'mostrarModalAlerta', payload: {
                                    mensaje: `<div style="font-size: 20px; font-weight: 600; text-align: left;">No se puede realizar esta acción, se encontraron productos con cantidad 0 por favor verifique e intente de nuevo</div></br>${contenido}`,
                                    mostrar: true,
                                    tamano: 'md'
                                }
                            })
                            cargarSolicitudPorId();
                            noValidarFormulario();
                            return;
                        }

                    }
                }
            }
        }

        if (state.cambiarEstadoSolicitud) {
            if (state.lineas.length > 0) {
                let totalCreditado = !isNaN(state.limiteAprobacion) ? parseFloat(state.limiteAprobacion) : 0;
                if (state.formulario.total > totalCreditado) {
                    dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: '<div style="font-size: 20px; font-weight: 600; text-align: left;">El total de la solicitud supera el límite de aprobación, por favor delega la solicitud a otra persona.</b>', mostrar: true, tamano: 'md' } })
                    cargarSolicitudPorId();
                    noValidarFormulario();
                    return;
                }
            }
        }
        // console.log('guardar', state.formulario)
        // dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        enviarDatos('Solicitud/Cabecera', state.formulario)
            .then((res) => {
                let json = {};
                let lineas = [];
                if (res.status !== 204) {
                    json = res.data;
                    lineas = json.lineas;
                }
                dispatch({ type: 'llenarFormulario', payload: { formulario: json } })
                dispatch({ type: 'llenarLineas', payload: { lineas: lineas } })
                dispatch({ type: 'actualizarUltimaActualizacionDeRegistro', payload: { ultimaActualizacionDeRegistro: obtenerFechaYHoraActual() } })
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se realizó correctamente', tipo: 'success' } })
                cambioEstadoSolicitud();
            })
            .catch((err) => {
                if (err.response.data.mensaje.includes('<li> Producto:')) {
                    dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: `<div style="font-size: 20px; font-weight: 600; text-align: left;">Hubo un error al realizar el ajustes de inventarios en el LS Central: </br> <ul>${err.response.data.mensaje} </ul> </div>`, mostrar: true, tamano: 'lg' } })
                    cargarSolicitudPorId();
                    cambiarEstadoSolicitud(false);
                    return;
                }
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + err.response.data.mensaje, tipo: 'warning' } })
                cargarSolicitudPorId();
            })
            .finally(() => {
                // dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
            })
        noValidarFormulario();
    }

    const guardarLineas = async (parametros) => {
        console.log('guardar Lineas', state.productosSeleccionados)
        // dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        enviarDatos('Solicitud/Linea', parametros)
            .then((res) => {
                const json = res.data;
                dispatch({ type: 'llenarFormulario', payload: { formulario: json } })
                dispatch({ type: 'llenarLineas', payload: { lineas: json.lineas } })
                dispatch({ type: 'actualizarUltimaActualizacionDeRegistro', payload: { ultimaActualizacionDeRegistro: obtenerFechaYHoraActual() } })
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se realizó correctamente', tipo: 'success' } })
                dispatch({ type: 'limpiarProductosSeleccionados' })
                dispatch({ type: 'mostrarModalAgregarProductos', payload: { mostrar: false } })
            })
            .catch((err) => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + err.response.data.mensaje, tipo: 'warning' } })
            })
            .finally(() => {
                // dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
            })
    }

    const eliminaLinea = async (parametros) => {
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        eliminarDatosConId('Solicitud/Linea', parametros)
            .then((res) => {
                const json = res.data;
                dispatch({ type: 'llenarFormulario', payload: { formulario: json } })
                dispatch({ type: 'llenarLineas', payload: { lineas: json.lineas } })
                dispatch({ type: 'actualizarUltimaActualizacionDeRegistro', payload: { ultimaActualizacionDeRegistro: obtenerFechaYHoraActual() } })
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se realizó correctamente', tipo: 'success' } })
            })
            .catch((err) => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'hubo un error =>' + err.response.data.mensaje, tipo: 'warning' } })
            })
            .finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
            })
    }

    const pasarLineasDelModalAlDetalle = () => {

        if (state.productosSeleccionados.length == 0) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Debe seleccionar al menos un producto', tipo: 'warning' } });
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
                nota: "",
                costo_unitario: producto.costo_unitario,
            }
        })

        guardarLineas(lineas);
    }

    const cargarDatosIniciales = async () => {
        await cargarEstadosSolicitudes();
        await cargarDepartamentos();
        await cargarUsuarios();
        await cargarSucursales();
        await cargarPosiciones();
        await cargarUsuariosCI();
        await cargarClasificaciones();
        await cargarUsuariosCIConCorreo();
        await cargarUnidadesMedida();
        await cargarComboAlmacenes();
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

    const enviar = () => {
        document.getElementById('enviarFormulario').click()
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
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
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
                            campo_id_departamento: true,
                            campo_id_estado_solicitud: true,
                            campo_id_clasificacion: false,
                            campo_id_sucursal: true,
                            campo_fecha_modificado: true,
                            campo_modificado_por: true,
                            campo_total: true,
                            campo_id_usuario_responsable: true,
                            campo_id_usuario_despacho: true,
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
                        }
                    }
                });
            }

        }

        // MODO NUEVO
        if (!formData.state) {

            // LLENAR FORMULARIO
            actualizarFormulario('fecha_creado', obtenerFechaActual());
            actualizarFormulario('creado_por', obtenerNombreUsuarioLoggeado());
            actualizarFormulario('id_estado_solicitud', 1);

            const usuarioDatos = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE_PERFIL_USUARIO);
            actualizarFormulario('nombre_creado_por', usuarioDatos?.nombre_usuario ?? '');

            dispatch({
                type: 'inactivarCampos',
                payload: {
                    campos: {
                        ...state.inactivarCampos,
                        campo_id_cabecera_solicitud: true,
                        campo_no_documento: true,
                        campo_fecha_creado: true,
                        campo_id_departamento: true,
                        campo_id_estado_solicitud: true,
                        campo_id_clasificacion: false,
                        campo_id_sucursal: true,
                        campo_fecha_modificado: true,
                        campo_modificado_por: true,
                        campo_total: true,
                        campo_comentario: false,
                        campo_creado_por: true,
                        campo_usuario_responsable: true,
                        campo_usuario_despacho: true,
                        campo_id_usuario_responsable: false,
                        campo_id_usuario_despacho: true,
                        campo_nombre_creado_por: true,
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
                    requerido_id_estado_solicitud: false,
                    requerido_id_clasificacion: true,
                    requerido_id_sucursal: false,
                    requerido_fecha_modificado: false,
                    requerido_modificado_por: false,
                    requerido_total: false,
                    requerido_comentario: true,
                    requerido_creado_por: false,
                    requerido_usuario_responsable: false,
                    requerido_id_usuario_responsable: false,
                    requerido_id_usuario_despacho: false,
                    requerido_nombre_creado_por: false,
                }
            }
        });

        // ACTUALIZAR ULTIMA ACTUALIZACION DE REGISTRO
        dispatch({ type: 'actualizarUltimaActualizacionDeRegistro', payload: { ultimaActualizacionDeRegistro: 'ninguna' } })
        dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
    }

    useEffect(() => {
        if (locacion.get('modo') === 'vista') {
            cargarDatos();
        }
    }, [formData.state])

    useEffect(() => {
        // NUEVA LOGICA PARA VOLVER A RENDERIZAR CUANDO ES UNA VENTANA POR AFUERA
        const parametro1 = locacion.get('accion');
        const parametro2 = locacion.get('clave');
        const parametro3 = locacion.get('documento');
        const parametro4 = locacion.get('modo');
        const parametro5 = locacion.get('tipo_documento');

        if (parametro1 && parametro2 && parametro3 && parametro4 && parametro5) {
            console.log('parametros =>', parametro1, parametro2, parametro3, parametro4)
            navegar(`?accion=${parametro1}&modo=${parametro4}`, { state: { [parametro2]: parametro3, id_estado_solicitud: parametro5 } });
            return;
        }
        /* ---------------------------------------------------------------------- */
        if (!locacion.get('modo')) {
            cargarDatos();
        }
    }, [])

    useEffect(() => {
        const cargarListadoProductos = async () => {
            if (state.modalAgregarProductos && state.listadoProductos.length === 0) {
                dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
                await cargarProductos();
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
            }
        }
        cargarListadoProductos();
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

    useEffect(() => {
        if (!formData.state && state.comboUsuariosAprobadores) {
            const usuarioAprobador = state.comboUsuariosAprobadores[0] ?? [];
            console.log('es nuevo ==> ', usuarioAprobador.id_usuario_ci, usuarioAprobador.nombre_usuario, usuarioAprobador.limite)
            actualizarFormulario('id_usuario_responsable', usuarioAprobador.id_usuario_ci ?? '');
            actualizarFormulario('usuario_responsable', usuarioAprobador.nombre_usuario ?? '');
            dispatch({ type: 'cambiarEstadoGeneral', payload: { id: 'limiteAprobacion', value: usuarioAprobador.limite ?? 0 } })
        }
    }, [state.comboUsuariosAprobadores])

    useEffect(() => {
        //ACTUALIZANDO EL LIMITE DEL  COMBO DE USUARIOS APROBADORES
        const usuarioAprobador = state.comboUsuariosAprobadores.find(usuario => usuario.id_usuario_ci === state.formulario.id_usuario_responsable) ?? [];
        if (usuarioAprobador) {
            definirLimiteAprobacion(usuarioAprobador.limite);
        } else {
            console.log('Usuario aprobador no encontrado');
            definirLimiteAprobacion(0);
        }
    }, [state.formulario])

    return (
        <FormularioContexto.Provider value={{ state, dispatch, guardar, guardarLineas, eliminaLinea, cambiarEstadoSolicitud, pasarLineasDelModalAlDetalle, delegarResponsable, actualizarFormulario, validarFormulario, noValidarFormulario, limpiarFormulario, enviar }}>
            {children}
        </FormularioContexto.Provider>
    )
} 