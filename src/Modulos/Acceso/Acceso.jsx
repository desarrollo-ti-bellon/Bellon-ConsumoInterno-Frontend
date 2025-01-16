import React from "react";
import { Container } from "react-bootstrap";
import LogoIcon from "../../Archivos/Logos/BellonLogoSinFondo.png";
import PiePagina from "../../ComponentesGlobales/PiePagina";
import { AccesoProveedor } from "./Controladores/AccesoProveedor";
import AccesoVista from "./Vistas/AccesoVista";

export default function Acceso() {
    return (
        <>
            <AccesoProveedor>
                <Container>
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url(${LogoIcon})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "25%",
                            backgroundPosition: "left",
                            filter: "blur(5px)",
                            zIndex: -1,
                        }}
                    ></div>
                    <AccesoVista />
                    <PiePagina backgroundClass='bg-white' />
                </Container>
            </AccesoProveedor>
        </>
    );
}
