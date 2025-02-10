import './style.css';

import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Estado403 from './ComponentesGlobales/Estado403.jsx';
import Estado404 from './ComponentesGlobales/Estado404.jsx';
import EstadoError from './ComponentesGlobales/EstadoError.jsx';
import PantallaPrincipal from './Modulos/PantallaPrincipal.jsx';
import Inicio from './Modulos/Inicio/Inicio.jsx';
import SolicitudesPrincipal from './Modulos/Solicitudes/SolicitudesPrincipal.jsx';
import FormularioSolicitudesPrincipal from './Modulos/Solicitudes/Formulario/FormularioSolicitudesPrincipal.jsx';
import ClasificacionesPrincipal from './Modulos/Clasificaciones/ClasificacionesPrincipal.jsx';
import UsuariosPrincipal from './Modulos/Usuarios/UsuariosPrincipal.jsx';

const esProduccion = (window.location.host.split(':')[0]) != 'localhost' ? true : false;
if (esProduccion) {
    window.console.log = () => { };
}

const rutas = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <EstadoError />,
    },
    {
        path: "/bellon",
        element: <PantallaPrincipal />,
        children: [
            {
                path: import.meta.env.VITE_APP_BELLON_INICIO,
                element: <Inicio />,
            },

            // VISTAS SOLICITUDES ACTIVAS
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS,
                element: <SolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES,
                element: <SolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS,
                element: <SolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS,
                element: <SolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS,
                element: <SolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS,
                element: <SolicitudesPrincipal />,
            },


            // VISTAS HISTORICOS (CONSUMOS INTERNOS YA REALIZADOS)
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS,
                element: <SolicitudesPrincipal />,
            },

            // FORMULARIO DE SOLICITUDES 
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS_FORMULARIO,
                element: <FormularioSolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES_FORMULARIO,
                element: <FormularioSolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS_FORMULARIO,
                element: <FormularioSolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS_FORMULARIO,
                element: <FormularioSolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS_FORMULARIO,
                element: <FormularioSolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS_FORMULARIO,
                element: <FormularioSolicitudesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS_FORMULARIO,
                element: <FormularioSolicitudesPrincipal />,
            },


            // VISTAS MANTENIMIENTOS
            {
                path: import.meta.env.VITE_APP_BELLON_MANTENIMIENTO_CLASIFICACIONES,
                element: <ClasificacionesPrincipal />,
            },
            {
                path: import.meta.env.VITE_APP_BELLON_MANTENIMIENTO_USUARIOS,
                element: <UsuariosPrincipal />,
            },


        ]
    },
    {
        path: "*",
        element: <Estado404 />,
        errorElement: <EstadoError />,
    },
    {
        path: "403",
        element: <Estado403 />,
        errorElement: <EstadoError />,
    }

]);

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <RouterProvider router={rutas} />
    // </StrictMode>,
)
