import { createContext, useEffect, useReducer } from "react";
import { useAlerta } from "../../../ControlesGlobales/Alertas/useAlerta";
import { useCargandoInformacion } from "../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion";
import { obtenerDatos, obtenerDatosDelLocalStorage } from "../../../FuncionesGlobales";
import { EstadoInicialInicio } from "../Modelos/InicioModel";
import { inicioReducer } from "./inicioReducer";
import { useNotas } from "../../../ControlesGlobales/Notas/useNotas";

export const inicioContexto = createContext(null)

export function InicioProveedor({ children }) {

    // TODOS LOS HOOKS NECESARIOS PARA PODER UTILIZAR LOS COMPONENTES GLOBALES
    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();
    const { state: stateNotas, dispatch: dispatchNotas } = useNotas();

    const [state, dispatch] = useReducer(inicioReducer, EstadoInicialInicio);

    const cargarActividades = async () => {

        dispatch({ type: 'limpiarContadoresActividades' })
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        const { account } = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE)
        const usuarioDestino = account.username;

        dispatch({ type: 'obtenerNombreUsuario', payload: { nombre: account.name } })

        await obtenerDatos('Llegadas/Cantidad', '')
            .then((res) => {
                dispatch({ type: 'llenarContadoresActividades', payload: { titulo: 'solicitudes activas', cantidad: res.data, ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_ACTIVAS, funcion: () => { return null } } })
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar VITE_APP_BELLON_SOLICITUDES_ACTIVAS.', tipo: 'warning' } })
            })

        await obtenerDatos('Transitos/Cantidad', '')
            .then((res) => {
                dispatch({ type: 'llenarContadoresActividades', payload: { titulo: 'solicitudes rechazadas', cantidad: res.data, ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS, funcion: () => { return null } } })
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar VITE_APP_BELLON_SOLICITUDES_RECHAZADAS.', tipo: 'warning' } })
            })

        await obtenerDatos('Liquidaciones/Cantidad', '')
            .then((res) => {
                dispatch({ type: 'llenarContadoresActividades', payload: { titulo: 'solicitudes aprobadas', cantidad: res.data, ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS, funcion: () => { return null } } })
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar VITE_APP_BELLON_SOLICITUDES_APROBADAS.', tipo: 'warning' } })
            })

        await obtenerDatos('Liquidaciones/Cantidad', '')
            .then((res) => {
                dispatch({ type: 'llenarContadoresActividades', payload: { titulo: 'solicitudes entregadas', cantidad: res.data, ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS, funcion: () => { return null } } })
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar VITE_APP_BELLON_SOLICITUDES_ENTREGADAS.', tipo: 'warning' } })
            })

        await obtenerDatos('Liquidaciones/Cantidad', '')
            .then((res) => {
                dispatch({ type: 'llenarContadoresActividades', payload: { titulo: 'solicitudes registradas', cantidad: res.data, ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_REGISTRADAS, funcion: () => { return null } } })
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar SOLICITUDES_REGISTRADAS.', tipo: 'warning' } })
            })

        await obtenerDatos(`Notas/Cantidad?usuarioDestino=${usuarioDestino}`, '')
            .then((res) => {
                dispatch({ type: 'llenarContadoresActividades', payload: { titulo: 'Notas Actuales', cantidad: res.data, ruta: '', funcion: () => dispatchNotas({ type: 'mostrarNotas', payload: { mostrar: true } }) } })
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar la cantidad de notas.', tipo: 'warning' } })
            })

        await obtenerDatos(`Notas?usuarioDestino=${usuarioDestino}`, '')
            .then((res) => {
                let json = []
                if (res.status === 200) {
                    json = res.data
                }
                dispatch({ type: 'llenarNotas', payload: { notas: json } })
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar notas.', tipo: 'warning' } })
            }).finally(() => {
                dispatchCargandoInformacion({ type: 'limpiarCargandoInformacion' })
            })

    }

    useEffect(() => {
        cargarActividades();
    }, [])

    useEffect(() => {
        const validarCargaNotas = state.actividades.find(actividad => actividad.titulo === 'Notas Actuales');
        if (validarCargaNotas) {
            if (stateNotas.notas.length !== validarCargaNotas.cantidad) {
                console.log('entro aqui')
                cargarActividades();
            }
        }
    }, [stateNotas.notas])

    return (
        <inicioContexto.Provider value={{ state, dispatch }}>
            {children}
        </inicioContexto.Provider>
    )

}