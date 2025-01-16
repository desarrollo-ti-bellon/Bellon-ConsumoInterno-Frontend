import { Button, Card, Container } from "react-bootstrap";
import Logo from "../../../Archivos/Logos/BellonLogoPrincipal.png";
import { useAcceso } from "../Controladores/accesoHook";
import { AccesoContexto } from "../Controladores/AccesoProveedor";

export default function AccesoVista() {
    const { state, dispatch, enviar } = useAcceso(AccesoContexto);

    return (
        <Container className="mt-7">
            <Card className="w-50 mx-auto">
                <Card.Body>
                    <div className="d-flex justify-content-end py-3">
                        <img src={Logo} width="200px" />
                    </div>
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <h1 className="display-7 fw-bold">¡Bienvenido de nuevo!</h1>
                    </div>
                    <p className="mt-3 text-black fs-5">
                        Inicia sesión para disfrutar de todas las funcionalidades de nuestra
                        aplicación. Accede a diversas características y herramientas que
                        mejorarán tu experiencia.
                    </p>
                    <p className="mt-4 text-muted fst-italic fs-5 text-center">
                        ¡No pierdas esta oportunidad y descubre todo lo que hemos preparado
                        para ti!
                    </p>
                    <div className="mt-4 mb-3 text-center">
                        <Button className="btn btn-primary fs-5" onClick={enviar}>
                            Iniciar sesión
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
