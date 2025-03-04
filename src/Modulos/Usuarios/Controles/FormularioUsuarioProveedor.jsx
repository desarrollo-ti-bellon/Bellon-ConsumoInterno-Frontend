import { createContext, useEffect, useReducer } from "react"
import { useAlerta } from "../../../ControlesGlobales/Alertas/useAlerta"
import { useCargandoInformacion } from "../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion"
import { useModalAlerta } from "../../../ControlesGlobales/ModalAlerta/useModalAlerta"
import { eliminarDatosConId, enviarDatos, obtenerDatos } from "../../../FuncionesGlobales"
import { EstadoInicialUsuarioFormulario } from "../Modelos/EstadoInicialUsuarioFormulario"
import { formularioUsuarioReducer } from "./formularioUsuarioReducer"

export const FormularioUsuarioContexto = createContext(null)

export const FormularioUsuarioProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(formularioUsuarioReducer, EstadoInicialUsuarioFormulario);

    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();
    const { dispatch: dispatchModalAlerta } = useModalAlerta();

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

    const cargarDatosIniciales = async () => {
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        await cargarDepartamentos();
        await cargarUsuarios();
        await cargarSucursales();
        await cargarPosicion();
        await cargarUsuariosCI();
        await cargarComboAlmacenes();
        dispatch({ type: 'validarFormulario', payload: { validadoFormulario: false } })
        dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
    }

    const guardar = () => {

        if (validarCampoDependiendoPosicion() && !state.formulario.id_almacen) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Debes llenar los campos requeridos.', tipo: 'warning' } })
            return;
        }

        if (validarCampoDependiendoPosicionLimite() && state.formulario.limite <= 0) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Debes llenar los campos requeridos.', tipo: 'warning' } })
            return;
        }

        if (!state.validadoFormulario) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Debes llenar los campos requeridos.', tipo: 'warning' } })
            return;
        }

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
        eliminarDatosConId('UsuariosCI', id)
            .then((res) => {
                // let json = res.data;
                cargarUsuariosCI();
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
                    campo_almacen_id: false,
                    campo_codigo_almacen: false
                }
            }
        })
    }, [])

    useEffect(() => {
        validarCampoDependiendoPosicion();
        validarCampoDependiendoPosicionLimite();
    }, [state.formulario.posicion_id])

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

    const validarCampoDependiendoPosicion = () => {
        const posicionInf = state.comboPosiciones?.find(posicion => posicion.posicion_id == state.formulario.posicion_id) ?? null;
        return posicionInf ? ['solicitante', 'administrador'].includes(posicionInf.descripcion.toLowerCase()) : false;
    }

    const validarCampoDependiendoPosicionLimite = () => {
        const posicionInf = state.comboPosiciones?.find(posicion => posicion.posicion_id == state.formulario.posicion_id) ?? null;
        return posicionInf ? ['director', 'gerente area'].includes(posicionInf.descripcion.toLowerCase()) : false;
    }

    return (
        <FormularioUsuarioContexto.Provider value={{ state, dispatch, guardar, eliminaLinea, validarCampoDependiendoPosicion, validarCampoDependiendoPosicionLimite }}>
            {children}
        </FormularioUsuarioContexto.Provider>
    )
} 