import { Container, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LogoIcon from "../Archivos/Imagenes/usuario.png";
import { useMenuVertical } from "../ControlesGlobales/MenuVertical/menuVerticalHook";
import { cerrarAcceso, obtenerDatosDelLocalStorage } from "../FuncionesGlobales";

export default function Cabecera() {

    const navigate = useNavigate();
    const validarSesion = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
    if (!validarSesion) {
        navigate("/");
        return;
    }

    const { state, dispatch } = useMenuVertical();
    const { account } = obtenerDatosDelLocalStorage(import.meta.env.VITE_APP_LOCALSTORAGE_NOMBRE);
    const userFullName = account.name;
    const userEmail = account.username;
    const userName = userEmail.split("@")[0];

    const cerrarSesion = () => {
        cerrarAcceso();
        navigate("/");
    };

    return (
        <Navbar expand={false} className="bg-black" fixed="top">
            <Container fluid className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <Navbar.Toggle
                        aria-controls={`offcanvasNavbar-expand-${state.mostrar}`}
                        onClick={() =>
                            dispatch({
                                type: "mostrarMenuVertical",
                                payload: { estado: true },
                            })
                        }
                    />
                    <Navbar.Brand className="text-white text-uppercase fs-3 align-middle ms-2 d-none d-md-block">
                        Bellón S.A.S
                    </Navbar.Brand>
                </div>
                <div>
                    <NavDropdown
                        title={
                            <>
                                <span className="align-middle fs-5">
                                    <span className="d-none d-sm-inline mx-1 text-capitalize">
                                        <img
                                            src={LogoIcon}
                                            alt="usuario"
                                            width="32"
                                            height="32"
                                            className="rounded-circle mx-1"
                                        />
                                        {userName}
                                    </span>
                                    <span className="d-inline d-sm-none mx-1">
                                        <img
                                            src={LogoIcon}
                                            alt="usuario"
                                            width="32"
                                            height="32"
                                            className="rounded-circle"
                                        />
                                    </span>
                                </span>
                            </>
                        }
                        align="end"
                        className="text-white"
                    >
                        <NavDropdown.Item className="no-action">
                            <img
                                src={LogoIcon}
                                alt="usuario"
                                width="32"
                                height="32"
                                className="rounded-circle mx-2"
                            />
                            <div className="d-inline-block align-middle">
                                {userFullName}
                                <br />
                                <span className="fs-7 text-muted">{userEmail}</span>
                            </div>
                        </NavDropdown.Item>

                        <NavDropdown.Item onClick={() => cerrarSesion()}>
                            Cerrar Sesión
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
            </Container>
        </Navbar>
    );
}
