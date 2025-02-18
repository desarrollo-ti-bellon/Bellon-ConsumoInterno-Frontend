import React, { useState } from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import "../ComponentesEstilos/menuVertical.css";
import { useMenuVertical } from "../ControlesGlobales/MenuVertical/menuVerticalHook";
import { obtenerDatosDelLocalStorage } from "../FuncionesGlobales";
import { useEffect } from "react";

export default function MenuVertical() {

    const { state, dispatch, rutas } = useMenuVertical();
    const [renderizarMenu, setRenderizarMenu] = useState({});
    const location = useLocation();
    const [collapsed, setCollapsed] = useState({});
    const [perfil, setPerfil] = useState("");

    const agrupacionModulos = (arreglo, key) => {
        return arreglo.reduce((resultado, elemento) => {
            const valorClave = elemento[key];
            if (!resultado[valorClave]) {
                resultado[valorClave] = [];
            }
            resultado[valorClave].push(elemento);
            return resultado;
        }, {});
    };

    const toggleCollapse = (key) => {
        setCollapsed((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    useEffect(() => {
        const agrupado = agrupacionModulos(rutas, "grupo");
        setRenderizarMenu(agrupado);
        const datosUsuario = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE_PERFIL_USUARIO) ?? null;
        if (datosUsuario) {
            setPerfil(datosUsuario?.posicion.descripcion);
        }
    }, [])

    return (
        <>
            {/* Componente Offcanvas para el menú vertical */}
            <Offcanvas
                className="bellon-offcanvas" // Clase CSS personalizada para el estilo
                show={state.mostrar} // Controla la visibilidad del Offcanvas
                onHide={() =>
                    dispatch({ type: "mostrarMenuVertical", payload: { estado: false } })
                } // Despacha una acción para ocultar el Offcanvas
            >
                {/* Encabezado del Offcanvas con un botón de cierre */}
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <h2 className="display-7 fw-normal text-black">{import.meta.env.VITE_APP_NOMBRE_APLICACION}</h2>
                        <p>
                            {perfil && <span>( {perfil} )</span>}
                        </p>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                {/* Cuerpo del Offcanvas que contiene el menú de navegación */}
                <Offcanvas.Body>
                    <Nav className="flex-column mb-auto nav-pills">
                        <Nav.Item>
                            <Nav.Link
                                as={Link}
                                to="/bellon"
                                className={`mb-2 text-decoration-none d-flex align-items-center fs-6 fw-medium ${location.pathname === "/bellon" ||
                                    location.pathname === "/bellon/"
                                    ? "active fw-semibold fs-5"
                                    : ""
                                    }`}
                            >
                                <Icon.House
                                    className={`me-2 ${location.pathname === "/bellon" ||
                                        location.pathname === "/bellon/"
                                        ? "fs-5"
                                        : "fs-6"
                                        }`}
                                />
                                Inicio
                            </Nav.Link>
                        </Nav.Item>

                        {Object.keys(renderizarMenu)?.map((clave, indice) => (
                            <React.Fragment key={indice}>
                                <span
                                    className="default-cursor mt-2 mb-1 fs-6 text-muted d-flex align-items-center fw-medium text-capitalize"
                                    onClick={() => toggleCollapse(clave)}
                                >
                                    {clave}
                                    {collapsed[clave] ? (
                                        <Icon.ChevronDown className="ms-auto fs-4 pointer-cursor" />
                                    ) : (
                                        <Icon.ChevronUp className="ms-auto fs-4 pointer-cursor" />
                                    )}
                                </span>
                                <hr className="mt-1" />

                                {!collapsed[clave] &&
                                    renderizarMenu[clave]?.map((ruta, indice2) => (
                                        <Nav.Item key={indice2}>
                                            <Nav.Link
                                                as={Link}
                                                to={ruta.ruta}
                                                className={`mb-2 text-decoration-none d-flex align-items-center fs-6 fw-medium ${location.pathname.startsWith(ruta.ruta)
                                                    ? "active fw-semibold fs-5"
                                                    : ""
                                                    }`}
                                                onClick={() =>
                                                    dispatch({
                                                        type: "mostrarMenuVertical",
                                                        payload: { mostrar: false },
                                                    })
                                                }
                                            >
                                                <span
                                                    className={`me-2 ${location.pathname.startsWith(ruta.ruta)
                                                        ? "fs-5"
                                                        : "fs-6"
                                                        }`}
                                                >
                                                    {ruta.icono}
                                                </span>
                                                {ruta.nombre}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                            </React.Fragment>
                        ))}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
