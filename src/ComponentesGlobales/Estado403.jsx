import { Button, Card, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import Logo from "../Archivos/Logos/BellonLogoPrincipal.png";
import LogoIcon from "../Archivos/Logos/BellonLogoSinFondo.png";
import { cerrarAcceso } from "../FuncionesGlobales";
import PiePagina from "./PiePagina";

export default function Estado403() {

    const currentDateTime = new Date();
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    };
    
    return (
        <>
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
                <Container className="mt-7">
                    <Card className="w-50 mx-auto">
                        <Card.Body>
                            <div className="d-flex justify-content-end py-3">
                                <img src={Logo} width="200px" />
                            </div>
                            <div className="d-flex justify-content-between align-items-end mb-4">
                                <h1 className="display-7 fw-bold">
                                    <div className="square-icon bg-danger text-white">
                                        <Icon.ExclamationTriangle />
                                    </div>
                                    ¡Acceso denegado!
                                </h1>
                            </div>
                            <p className="mt-3 text-black fs-5">
                                <b>Fecha y hora:</b>{" "}
                                {currentDateTime.toLocaleString("es-DO", options)}
                            </p>
                            <p className="mt-3 text-black fs-5">
                                <b>Descripción:</b> No tienes permisos suficientes para ver esta
                                página. Esto puede deberse a que no tienes los privilegios
                                necesarios para acceder a este contenido.
                            </p>
                            <div className="mt-4 mb-3 text-center">
                                <Button onClick={() => cerrarAcceso()} variant="primary">
                                    Cerrar Sesión
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
                <PiePagina backgroundClass="bg-white" />
            </Container>
        </>
    );
}
