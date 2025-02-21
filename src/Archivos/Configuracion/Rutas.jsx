import * as Icon from "react-bootstrap-icons"
import ClasificacionesPrincipal from "../../Modulos/Clasificaciones/ClasificacionesPrincipal"
import SolicitudesPrincipal from "../../Modulos/Solicitudes/SolicitudesPrincipal"
import UsuariosPrincipal from "../../Modulos/Usuarios/UsuariosPrincipal"

export const rutas = [

    // PANTALLAS DE CONSULTAS SEGUN EL PERFIL DEL USUARIO LOGUEADO
    {
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES,
        componente: <SolicitudesPrincipal />,
        nombre: 'Solicitudes Cons. Internos.',
        icono: <Icon.Circle />,
        grupo: 'Módulos'
    },
    {
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONSUMOS_INTERNOS,
        componente: <SolicitudesPrincipal />,
        nombre: 'Consumos Internos',
        icono: <Icon.Circle />,
        grupo: 'Históricos'
    },
    {
        ruta: import.meta.env.VITE_APP_BELLON_HISTORIAL_MOVIMIENTOS_SOLICITUDES,
        componente: <SolicitudesPrincipal />,
        nombre: 'Historial Mov. Solicitudes',
        icono: <Icon.Circle />,
        grupo: 'Históricos'
    },

    // MANTENIMIENTOS DE USUARIOS APARECEN SEGUN EL PERFIL DEL USUARIO 
    {
        ruta: import.meta.env.VITE_APP_BELLON_MANTENIMIENTO_CLASIFICACIONES,
        componente: <ClasificacionesPrincipal />,
        nombre: 'Clasificaciones',
        icono: <Icon.Nut />,
        grupo: 'Configuraciones'
    },
    {
        ruta: import.meta.env.VITE_APP_BELLON_MANTENIMIENTO_USUARIOS,
        componente: <UsuariosPrincipal />,
        nombre: 'Usuarios',
        icono: <Icon.Nut />,
        grupo: 'Configuraciones'
    }

]
