import * as Icon from "react-bootstrap-icons"
import ClasificacionesPrincipal from "../../Modulos/Clasificaciones/ClasificacionesPrincipal"
import SolicitudesPrincipal from "../../Modulos/Solicitudes/SolicitudesPrincipal"
import UsuariosPrincipal from "../../Modulos/Usuarios/UsuariosPrincipal"
import FormularioSolicitudesPrincipal from "../../Modulos/Solicitudes/Formulario/FormularioSolicitudesPrincipal"

export const rutas = [
    // PANTALLAS DE CONSULTAS SEGUN EL PERFIL DEL USUARIO LOGUEADO
    {
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS,
        componente: <SolicitudesPrincipal />,
        nombre: 'Solicitudes Nuevas',
        icono: <Icon.Circle />,
        grupo: 'Módulos'
    },
    {
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES,
        componente: <SolicitudesPrincipal />,
        nombre: 'Solicitudes Pendientes',
        icono: <Icon.Circle />,
        grupo: 'Módulos'
    },
    {
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS,
        componente: <SolicitudesPrincipal />,
        nombre: 'Solicitudes Rechazadas',
        icono: <Icon.Circle />,
        grupo: 'Módulos'
    },
    {
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS,
        componente: <SolicitudesPrincipal />,
        nombre: 'Solicitudes Aprobadas',
        icono: <Icon.Circle />,
        grupo: 'Módulos'
    },
    {
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS,
        componente: <SolicitudesPrincipal />,
        nombre: 'Solicitudes Entregadas',
        icono: <Icon.Circle />,
        grupo: 'Módulos'
    },
    {
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS,
        componente: <SolicitudesPrincipal />,
        nombre: 'Solicitudes Confirmadas',
        icono: <Icon.Circle />,
        grupo: 'Módulos'
    },
    {
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS,
        componente: <SolicitudesPrincipal />,
        nombre: 'Solicitudes Terminadas',
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
