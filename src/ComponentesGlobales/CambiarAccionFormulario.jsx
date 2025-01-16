import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useModalConfirmacion } from "../ControlesGlobales/ModalConfirmacion/useModalConfirmacion";

export default function CambiarAccionFormulario() {

    const locacion = useLocation();
    const navegar = useNavigate();
    const { dispatch: dispatchModalConfirmacion } = useModalConfirmacion();
    const [bloquearAcciones, setBloquearAcciones] = useState(true);
    const [ocultarBotones, setOcultarBotones] = useState(false);
    const [ocultarBotonNuevo, setOcultarBotonNuevo] = useState(false);

    const cambiarAccionDelFormulario = (accion) => {
        if (accion) {
            navegar(`?accion=${accion}`, { state: locacion.state });
            navegar(0);
        } else {
            dispatchModalConfirmacion({
                type: "mostrarModalConfirmacion",
                payload: {
                    mostrar: true,
                    mensaje:
                        "¿Está seguro de que desea crear un nuevo documento? </br> Los cambios no guardados se perderán.",
                    funcionEjecutar: () => {
                        navegar(``, { state: null });
                        setTimeout(() => {
                            navegar(0);
                        }, 2000);
                    },
                },
            });
            return;
        }
    };

    useEffect(() => {
        console.log("locacion", locacion);
        if (locacion.state) {
            setBloquearAcciones(false);
        }
        const validarHistorico = locacion.pathname.includes("historico");
        if (validarHistorico) {
            setOcultarBotones(true);
        }
        const validarNuevo = locacion.pathname.includes("llegadas");
        if (validarNuevo) {
            setOcultarBotonNuevo(true);
            if (!locacion.state?.id_cabecera_llegada) {
                setBloquearAcciones(true);
            }
        }
    }, []);

    return (
        <Container>
            <div
                style={{
                    textAlign: "center",
                    display: ocultarBotones ? "none" : "block",
                }}
            >
                {!ocultarBotonNuevo && (
                    <Button
                        title="nuevo documento"
                        disabled={bloquearAcciones}
                        className="btn-circle btn-lg m-3"
                        variant="outline-primary"
                        onClick={() => cambiarAccionDelFormulario(null)}
                    >
                        <Icon.PlusLg size={25} />
                    </Button>
                )}
                <Button
                    title="editar documento"
                    disabled={bloquearAcciones}
                    className="btn-circle btn-lg m-3"
                    variant="outline-primary"
                    onClick={() => cambiarAccionDelFormulario("editar")}
                >
                    <Icon.Pencil size={25} />
                </Button>
                <Button
                    title="ver documento"
                    disabled={bloquearAcciones}
                    className="btn-circle btn-lg m-3"
                    variant="outline-primary"
                    onClick={() => cambiarAccionDelFormulario("ver")}
                >
                    <Icon.Eye size={25} />
                </Button>
            </div>
        </Container>
    );
}
