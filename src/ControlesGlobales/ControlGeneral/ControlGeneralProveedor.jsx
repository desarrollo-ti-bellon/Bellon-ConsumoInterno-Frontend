import { createContext, Suspense, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { eliminarDatosDelLocalStorage, guardarDatosEnLocalStorage, obtenerDatos, obtenerDatosDelLocalStorage, obtenerNombreUsuarioLoggeado } from "../../FuncionesGlobales";
import ControlGeneralModal from "./ControlGeneralModal";
import { EstadoInicialControlGeneral } from "./EstadoInicialControlGeneral";
import { controlGeneralReducer } from "./controlGeneralReducer";

export const ControlGeneralContexto = createContext(null)

export const ControlGeneralProveedor = ({ children }) => {

    const [state, dispatch] = useReducer(controlGeneralReducer, EstadoInicialControlGeneral)
    const navegar = useNavigate();

    const cargarPerfilUsuarioLogueado = async (accion = '') => {
        console.log("cargarPerfilUsuarioLogueado");
        eliminarDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE_PERFIL_USUARIO);
        return await obtenerDatos(`UsuariosCI/Correo?correo=${obtenerNombreUsuarioLoggeado()}`, null)
            .then((res) => {
                console.log('res =>', res);
                let json = null;
                if (res.status !== 204) {
                    json = res.data;
                    guardarDatosEnLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE_PERFIL_USUARIO, JSON.stringify(json))
                    dispatch({ type: 'llenarPerfilUsuario', payload: { perfilUsuario: json } })  
                }
                if (accion == 'recargar') {
                    location.reload();
                }
            }).catch((err) => {
                console.log('Error ', err)
            }).finally(() => {
                console.log('carga de datos finalizada')
            })
    }

    const redireccionar = () => {
        navegar('/403');
    }

    const verficarExistenciaPerfilUsuario = () => {
        console.log("verficarExistenciaPerfilUsuario");
        const perfilUsuario = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE_PERFIL_USUARIO);
        if (!perfilUsuario) {
            console.log("No hay un perfil de datos de usuario en el local storage", perfilUsuario);
            mostrarModal();
        }
    }

    const mostrarModal = () => {
        dispatch({ type: 'mostrarModal', payload: { mostrar: true } })
    }

    const cerrarModal = () => {
        dispatch({ type: 'mostrarModal', payload: { mostrar: false } })
    }

    const cargarDatos = async () => {
        await cargarPerfilUsuarioLogueado();
        verficarExistenciaPerfilUsuario();
    }

    useEffect(() => {
        cargarDatos();
    }, [])

    return (
        <ControlGeneralContexto.Provider value={{ state, dispatch, mostrarModal, cerrarModal, redireccionar, cargarPerfilUsuarioLogueado }}>
            {children}
            <ControlGeneralModal />
        </ControlGeneralContexto.Provider>
    )
}