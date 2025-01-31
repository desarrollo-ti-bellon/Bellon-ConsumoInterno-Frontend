import { createContext, useEffect, useReducer, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useCargandoInformacion } from "../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion"
import { EstadoInicialUsuarioFormulario } from "../Modelos/EstadoInicialUsuarioFormulario"
import { formularioUsuarioReducer } from "./formularioUsuarioReducer"
import { useAlerta } from "../../../ControlesGlobales/Alertas/useAlerta"
import { enviarDatos, obtenerDatos } from "../../../FuncionesGlobales"
import { useModalAlerta } from "../../../ControlesGlobales/ModalAlerta/useModalAlerta"

export const FormularioUsuarioContexto = createContext(null)

export const FormularioUsuarioProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(formularioUsuarioReducer, EstadoInicialUsuarioFormulario);

    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();
    const tiempoFuera = useRef();
    const formData = useLocation();

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

    const cargarPosicion = async () => {
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
            // console.log('cargarUsuariosCI', json);
            dispatch({ type: 'llenarLineas', payload: { lineas: json } });
        } catch (err) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: `Error, cargando las Posiciones`, tipo: 'warning' } });
        }
    }

    const cargarDatosIniciales = async () => {
        dispatchCargandoInformacion({ action: 'mostrarCargandoInformacion' })
        await cargarDepartamentos();
        await cargarUsuarios();
        await cargarSucursales();
        await cargarPosicion();
        await cargarUsuariosCI();
        dispatchCargandoInformacion({ action: 'limpiarCargandoInformacion' })
    }

    const guardar = () => {
        console.log('guardar', state.formulario)

        if (state.formulario.id_usuario_ci === null) {
            const existeUsuario = state.lineas.find(linea => linea.id_usuario === state.formulario.id_usuario)
            console.log('existeUsuario =>', existeUsuario);
            if (existeUsuario) {
                dispatchModalAlerta({ type: 'mostrarModalAlerta', payload: { mensaje: 'No se puede agregar este usuario porque ha sido agregada con esta posicion.<hr/> <ul>' + existeUsuario.id_usuario_ci + '</ul>', tamano: 'md' } })
                return;
            }
        }

        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        enviarDatos('UsuariosCI', state.formulario)
            .then((res) => {
                let json = res.data;
                cargarUsuariosCI();
                dispatch({ type: 'llenarFormulario', payload: { formulario: json } })
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
            type: 'inactivarCampos',
            payload: {
                campos: {
                    ...state.inactivarCampos,
                    campo_id_usuario_ci: true,
                    campo_id_usuario: false,
                    campo_nombre_usuario: false,
                    campo_correo: false,
                    campo_codigo_sucursal: false,
                    campo_id_sucursal: false,
                    campo_codigo_departamento: false,
                    campo_id_departamento: false,
                    campo_limite: false,
                    campo_posicion_id: false,
                    campo_estado: false,
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
        <FormularioUsuarioContexto.Provider value={{ state, dispatch, guardar }}>
            {children}
        </FormularioUsuarioContexto.Provider>
    )
} 