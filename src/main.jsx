import './style.css';

import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Estado403 from './ComponentesGlobales/Estado403.jsx';
import Estado404 from './ComponentesGlobales/Estado404.jsx';
import EstadoError from './ComponentesGlobales/EstadoError.jsx';
import PantallaPrincipal from './Modulos/PantallaPrincipal.jsx';
import Inicio from './Modulos/Inicio/Inicio.jsx';
import SolicitudesPrincipal from './Modulos/SolicitudesActivas/SolicitudesPrincipal.jsx';
import FormularioSolicitudesPrincipal from './Modulos/SolicitudesActivas/Formulario/FormularioSolicitudesPrincipal.jsx';

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

            // VISTAS PRINCIPALES
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
          

            // VISTAS HISTORICOS
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS,
                element: <SolicitudesPrincipal />,
            },


            // VISTAS PRINCIPALES-FORMULARIOS 
            {
                path: import.meta.env.VITE_APP_BELLON_SOLICITUDES_FORMULARIO,
                element: <FormularioSolicitudesPrincipal />,
            },


            // VISTAS HISTORICOS-FORMULARIOS 
            {
                path: import.meta.env.VITE_APP_BELLON_HISTORICO_SOLICITUDES_FORMULARIO,
                element: <FormularioSolicitudesPrincipal />,
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
