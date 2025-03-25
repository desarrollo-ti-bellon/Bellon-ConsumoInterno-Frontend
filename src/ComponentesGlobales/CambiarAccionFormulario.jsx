import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useModalConfirmacion } from "../ControlesGlobales/ModalConfirmacion/useModalConfirmacion";
import { obtenerRutaUrlActual } from "../FuncionesGlobales";

export default function CambiarAccionFormulario() {

    const locacion = useLocation();
    const navegar = useNavigate();
    const [params] = useSearchParams();
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

        if (params.get("modo") === "vista") {
            setOcultarBotones(true);
            return;
        }

        //OCULTAR BOTONES SI EL ESTADO DE LA SOLICITUDES SON ESTAS
        if (locacion.state) {
            const arrEstadoSolicitudes = [
                import.meta.env.VITE_APP_ESTADO_SOLICITUD_PENDIENTE,
                import.meta.env.VITE_APP_ESTADO_SOLICITUD_APROBADA,
                import.meta.env.VITE_APP_ESTADO_SOLICITUD_ENTREGADA,
                import.meta.env.VITE_APP_ESTADO_SOLICITUD_CONFIRMADA,
                import.meta.env.VITE_APP_ESTADO_SOLICITUD_TERMINADA,
                import.meta.env.VITE_APP_ESTADO_SOLICITUD_CANCELAR
            ]
            const condicionOcultarBotones = arrEstadoSolicitudes.includes(locacion.state.id_estado_solicitud.toString());
            if (condicionOcultarBotones) {
                setOcultarBotones(condicionOcultarBotones);
                return;
            }
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

        const rutaActual = obtenerRutaUrlActual();
        const rutas = [
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONSUMOS_INTERNOS_FORMULARIO
        ];
        const validarOcultarBotones = params.get('modo') === 'vista' || rutas.includes(rutaActual);
        setOcultarBotones(validarOcultarBotones);

    }, [locacion]);

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
