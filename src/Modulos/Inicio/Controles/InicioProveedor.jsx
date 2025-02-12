import { createContext, useEffect, useReducer } from "react";
import { useAlerta } from "../../../ControlesGlobales/Alertas/useAlerta";
import { useCargandoInformacion } from "../../../ControlesGlobales/CargandoInformacion/useCargandoInformacion";
import { useNotas } from "../../../ControlesGlobales/Notas/useNotas";
import { obtenerDatos, obtenerDatosDelLocalStorage } from "../../../FuncionesGlobales";
import { EstadoInicialInicio } from "../Modelos/InicioModel";
import { inicioReducer } from "./inicioReducer";

export const inicioContexto = createContext(null)

export function InicioProveedor({ children }) {

    // TODOS LOS HOOKS NECESARIOS PARA PODER UTILIZAR LOS COMPONENTES GLOBALES
    const { dispatch: dispatchAlerta } = useAlerta();
    const { dispatch: dispatchCargandoInformacion } = useCargandoInformacion();
    const { state: stateNotas, dispatch: dispatchNotas } = useNotas();

    const [state, dispatch] = useReducer(inicioReducer, EstadoInicialInicio);

    const cargarCartasPorEstado = () => {

        const datosUsuarioLogueado = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE_PERFIL_USUARIO);
        const usuarioLogueado = datosUsuarioLogueado !== null;

        let estados = [];
        if (usuarioLogueado) {
            switch (datosUsuarioLogueado.posicion_id) {
                case 1: // 'Administrador':
                    estados = [
                        'Nueva',
                        'Pendiente',
                        'Aprobada',
                        'Rechazada',
                        'Entregada',
                        'Confirmada',
                        'Terminada',
                    ]
                    break;
                case 2: // 'Director'
                    estados = [
                        'Pendiente',
                    ]
                    break;
                case 3: // 'Gerente Tienda'
                    estados = [
                        'Pendiente',
                        'Rechazada',
                        'Aprobada',
                    ]
                    break;
                case 4: // 'Gerente Area'
                    estados = [
                        'Pendiente',
                        'Rechazada',
                        'Aprobada',
                    ]
                    break;
                case 5: // 'Solicitante'
                    estados = [
                        'Nueva',
                        'Pendiente',
                        'Aprobada',
                        'Rechazada',
                    ]
                    break;
                case 6: // 'Asistente Con. Inventario'
                    estados = [
                        'Confirmada',
                    ]
                    break;
                case 7: // 'Asistente Contabilidad'
                    estados = [
                        'Terminada',
                    ]
                    break;
                case 8: // 'Despachador'
                    estados = [
                        'Aprobada',
                        'Confirmada',
                    ]
                    break;
                default:
                    estados = [];
                    break;
            }
        }

        return estados;
    }

    const cargarActividades = async () => {

        dispatch({ type: 'limpiarContadoresActividades' })
        dispatchCargandoInformacion({ type: 'mostrarCargandoInformacion' })
        const { account } = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE)
        const usuarioDestino = account.username;
        const cartasActividad = cargarCartasPorEstado() ?? [];
        dispatch({ type: 'obtenerNombreUsuario', payload: { nombre: account.name } })

        let arrEstadosSolicitudes = [];
        await obtenerDatos('EstadoSolicitud', null)
            .then((res) => {
                arrEstadosSolicitudes = res.data.filter(el => cartasActividad.includes(el.descripcion)) ?? [];
            }).catch(() => {
                dispatchAlerta({ type: 'mostrarAlerta', payload: { mostrar: true, mensaje: 'Error, al intentar cargar Estados de solicitudes.', tipo: 'warning' } });
            });

        console.log('arrEstadosSolicitudes =>', arrEstadosSolicitudes)

        for (const estadoSolicitud of arrEstadosSolicitudes) {
            let baseRuta = import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS;
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