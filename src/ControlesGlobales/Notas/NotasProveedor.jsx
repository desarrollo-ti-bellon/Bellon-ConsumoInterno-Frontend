import { createContext, useEffect, useReducer } from "react";
import BotonFlotante from "../../ComponentesGlobales/BotonFlotante";
import { Notas } from "../../ComponentesGlobales/Notas";
import { eliminarDatosConId, enviarDatos, obtenerDatos, obtenerFechaActual, obtenerNombreUsuarioLoggeado, obtenerRutaUrlActual, tipoDocumento } from "../../FuncionesGlobales";
import { useAlerta } from "../Alertas/useAlerta";
import { useCargandoInformacion } from "../CargandoInformacion/useCargandoInformacion";
import { EstadoInicialNotasModelo } from "./notasModelo";
import { notasReducer } from "./notasReducer";

export const NotasContexto = createContext(null)

export function NotasProveedor({ children }) {

    const [state, dispatch] = useReducer(notasReducer, EstadoInicialNotasModelo);
    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();

    async function cargarUsuarios() {
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        await obtenerDatos('Usuarios', null)
            .then((res) => {
                let json = res.data;
                if (res.status === 204) {
                    json = []
                }
                dispatch({ type: 'llenarComboUsuarios', payload: { usuarios: json } })
            }).catch(() => {

            }).finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
            })
    }

    async function cargarNotas() {
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })

        const usuarioDestino = obtenerNombreUsuarioLoggeado();
        const tipo = tipoDocumento(obtenerRutaUrlActual());

        console.log('tipo=>', tipo);
        let Api = 'Notas';
        const parametros = [];

        if (usuarioDestino) {
            parametros.push(`usuarioDestino=${encodeURIComponent(usuarioDestino)}`);
        }

        if (tipo) {
            parametros.push(`tipoDocumento=${encodeURIComponent(tipo)}`);
        }

        if (parametros.length > 0) {
            Api += '?' + parametros.join('&');
        }

        await obtenerDatos(Api, null)
            .then((res) => {
                let json = res.data;
                if (res.status === 204) {
                    json = []
                }
                dispatch({ type: 'llenarNotas', payload: { notas: json } });
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar las notas', tipo: 'warning' } });
            }).finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' });
            })
    }

    const guardar = (nota) => {

        if (nota.descripcion.length < 20) {
            dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'La cantidad de cararteres debe de ser mayor a 20', tipo: 'warning' } });
            return;
        }

        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        enviarDatos('Notas', nota)
            .then((res) => {
                let json = [];
                if (json.status !== 204) {
                    json = res.data;
                }
                dispatch({ type: 'limpiarFormulario' });
                dispatch({ type: 'mostrarFormularioNotas', payload: { mostrarFormulario: false } });
                dispatch({ type: 'llenarNotas', payload: { notas: json } });
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'se guardó correctamente la nota', tipo: 'success' } });
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al [guardar/actualizar] nota', tipo: 'warning' } });
            }).finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' });
            })
    }

    const eliminar = (id) => {
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        eliminarDatosConId('Notas', id)
            .then((res) => {
                let json = [];
                if (json.status !== 204) {
                    json = res.data;
                }
                dispatch({ type: 'limpiarFormulario' })
                dispatch({ type: 'llenarNotas', payload: { notas: json } })
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar [eliminar] nota', tipo: 'warning' } })
            }).finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
            })
    }

    const cargarDatosIniciales = () => {
        const tipo_documento = tipoDocumento(obtenerRutaUrlActual());
        dispatch({ type: 'actualizarFormulario', payload: { id: 'creado_por', value: state.formulario.creado_por !== '' ? state.formulario.creado_por : obtenerNombreUsuarioLoggeado() } })
        dispatch({ type: 'actualizarFormulario', payload: { id: 'tipo_documento', value: (tipo_documento !== '' ? tipo_documento : state.formulario.tipo_documento) } })
        dispatch({ type: 'actualizarFormulario', payload: { id: 'fecha_creado', value: obtenerFechaActual() } })
    }

    useEffect(() => {
        cargarUsuarios();
    }, [])

    useEffect(() => {
        if (state.mostrar) {
            if (state.formulario.id_documento) {
                cargarDatosIniciales();
            } else {
                dispatch({ type: 'mostrarFormularioNotas', payload: { mostrarFormulario: false } })
            }
            cargarNotas();
        } else {
            dispatch({ type: 'limpiarFormulario' })
        }
    }, [state.mostrar])

    return (
        <NotasContexto.Provider value={{ state, dispatch, guardar, eliminar }}>
            {children}
            <BotonFlotante />
            <Notas />
        </NotasContexto.Provider>
    )
}