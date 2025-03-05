import { Button, Card, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import Logo from "../Archivos/Logos/BellonLogoPrincipal.png";
import LogoIcon from "../Archivos/Logos/BellonLogoSinFondo.png";
import { cerrarAcceso } from "../FuncionesGlobales";
import PiePagina from "./PiePagina";
import { useNavigate } from "react-router-dom";

export default function Estado500() {

    const navegar = useNavigate();

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
                {/* Background Image with Blur Effect */}
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
                    {/* Main Card */}
                    <Card className="w-50 mx-auto">
                        <Card.Body>
                            {/* Logo at the Top */}
                            <div className="d-flex justify-content-end py-3">
                                <img src={Logo} width="200px" />
                            </div>

                            {/* Header Message */}
                            <div className="d-flex justify-content-between align-items-end mb-4">
                                <h1 className="display-7 fw-bold">
                                    <div className="square-icon bg-danger text-white">
                                        <Icon.XCircle />
                                    </div>
                                    ¡Error de Servidor!
                                </h1>
                            </div>

                            {/* Date and Time */}
                            <p className="mt-3 text-black fs-5">
                                <b>Fecha y hora:</b>{" "}
                                {currentDateTime.toLocaleString("es-DO", options)}
                            </p>

                            {/* Error Description */}
                            <p className="mt-3 text-black fs-5">
                                <b>Descripción:</b> La aplicación no ha podido conectarse al servidor. Esto puede ser debido a un problema en el servidor o una conexión interrumpida.
                            </p>

                            {/* Close Session Button */}
                            <div className="mt-4 m-3 text-center">
                                <Button className="m-3" onClick={() => cerrarAcceso()} variant="primary">
                                    Cerrar Sesión
                                </Button>
                                <Button className="m-3" onClick={() => navegar(-1)} variant="primary">
                                    Volver atrás
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>

                {/* Footer */}
                <PiePagina backgroundClass="bg-white" />
            </Container>
        </>
    );
}
