import * as Icon from "react-bootstrap-icons"
import SolicitudesPrincipal from "../../Modulos/SolicitudesActivas/SolicitudesPrincipal"
import FormularioSolicitudes from "../../Modulos/SolicitudesActivas/Formulario/Vistas/FormularioSolicitudes"

export const rutas = [
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
    
]
