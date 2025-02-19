import PropTypes from "prop-types";
import { Container, Navbar } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function PiePagina({ backgroundClass = "bg-light" }) {

    const [params] = useSearchParams();

    return (
        <Navbar style={{ display: (params.get('modo') === 'vista' ? 'none' : 'block') }} className={backgroundClass} fixed={"bottom"}>
            <Container fluid>
                <Navbar.Brand className="fw-medium">
                    Copyright © {new Date().getFullYear()} {import.meta.env.VITE_APP_EMPRESA_NOMBRE}
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

PiePagina.propTypes = {
    backgroundClass: PropTypes.string,
};
