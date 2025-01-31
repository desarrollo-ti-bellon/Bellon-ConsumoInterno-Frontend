import { createContext, useEffect, useReducer } from "react";
import { useAlerta } from "../../../ControlesGlobales/Alertas/useAlerta";
import { useCargandoInformacion } from "../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion";
import { obtenerDatos, obtenerDatosConId, obtenerDatosDelLocalStorage } from "../../../FuncionesGlobales";
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

        let arrEstadosSolicitudes = [];
        await obtenerDatos('EstadoSolicitud', null)
            .then((res) => {
                arrEstadosSolicitudes = res.data ?? [];
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar Estados de solicitudes.', tipo: 'warning' } });
            });

        for (const estadoSolicitud of arrEstadosSolicitudes) {
            let baseRuta = import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS
            try {
                const res = await obtenerDatos('Solicitud/Cantidad?estadoSolicitudId=' + estadoSolicitud.id_estado_solicitud, null);
                dispatch({
                    type: 'llenarContadoresActividades',
                    payload: { titulo: `${estadoSolicitud.descripcion}s`, cantidad: res.data, ruta: baseRuta.replace('nuevas', `${estadoSolicitud.descripcion.toLowerCase()}s`), funcion: () => { return null; } }
                });
            } catch (error) {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar VITE_APP_BELLON_SOLICITUDES_NUEVAS.', tipo: 'warning' } });
            }
        }

        await obtenerDatos(`Notas?usuarioDestino=${usuarioDestino}`, null)
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