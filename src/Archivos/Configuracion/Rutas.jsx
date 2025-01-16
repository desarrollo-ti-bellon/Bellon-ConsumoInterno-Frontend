import * as Icon from "react-bootstrap-icons"
import SolicitudesPrincipal from "../../Modulos/SolicitudesActivas/SolicitudesPrincipal"
import FormularioSolicitudes from "../../Modulos/SolicitudesActivas/Formulario/Vistas/FormularioSolicitudes"

export const rutas = [
    {
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_ACTIVAS,
        componente: <SolicitudesPrincipal />,
        nombre: 'Solicitudes Activas',
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
        ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_REGISTRADAS,
        componente: <SolicitudesPrincipal />,
        nombre: 'Solicitudes Registradas',
        icono: <Icon.Circle />,
        grupo: 'Módulos'
    },
    // {
    //     ruta: import.meta.env.VITE_APP_BELLON_SOLICITUDES_FORMULARIO,
    //     componente: <FormularioSolicitudes />,
    //     nombre: 'Formulario',
    //     icono: <Icon.Circle />,
    //     grupo: 'Fórmularios'
    // },
    {
        ruta: import.meta.env.VITE_APP_BELLON_HISTORICO_SOLICITUDES,
        componente: <SolicitudesPrincipal />,
        nombre: 'Histórico Solicitudes ',
        icono: <Icon.JournalText />,
        grupo: 'Históricos'
    },
]
