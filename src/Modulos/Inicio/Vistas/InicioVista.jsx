import React from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import AGGridTabla from "../../../ComponentesGlobales/AGGridTabla";
import CartaActividad from "../../../ComponentesGlobales/CartaActividad";
import { useNotas } from "../../../ControlesGlobales/Notas/useNotas";
import { formateadorDeFechaYHoraEspanol, verDocumento } from "../../../FuncionesGlobales";
import { useInicio } from "../Controles/useInicio";
import { pagination, paginationPageSize, paginationPageSizeSelector, rowSelection } from "../Modelos/InicioModel";

export default function InicioVista() {

    const { state, dispatch } = useInicio();
    const { dispatch: dispatchNotas } = useNotas();
    const { nombreUsuario, actividades, notas, contadorLlegadasActivas, contadorTransitosActivos, contadorLiquidacionesActivas } = state;

    const hacerNota = (formulario) => {
        console.log(formulario);
        dispatchNotas({ type: "mostrarNotas", payload: { mostrar: true } });
        dispatchNotas({ type: "mostrarFormularioNotas", payload: { mostrarFormulario: true } });
        dispatchNotas({ type: "llenarFormulario", payload: { formulario } });
    };

    const BotonesAccionesTabla = (parametros) => {
        return (
            <div>
                <Button
                    title="Ver notas"
                    size={"sm"}
                    variant="outline-info"
                    style={{ marginLeft: 5 }}
                    onClick={() => hacerNota(parametros.data)}
                >
                    {" "}
                    <Icon.EyeFill size={15} />{" "}
                </Button>
            </div>
        );
    };

    const hypervinculoDocumento = (e) => {
        const fila = e.data;
        e.data.id_cabecera_solicitud = fila.id_documento;
        const no_documento = fila.no_documento;
        let titulo = `ver solicitud ${no_documento}`
        return (
            <a href="#" title={titulo} onClick={() => verDocumento(no_documento, fila)}> {e.value}</a>
        )
    }

    const columnas = [
        { headerName: "ID", field: "id_nota", flex: 1 },
        { headerName: "Fecha", field: "fecha_creado", valueFormatter: (e) => formateadorDeFechaYHoraEspanol(e.value), flex: 2 },
        { headerName: "No Documento", field: "no_documento", cellRenderer: hypervinculoDocumento, flex: 2 },
        { headerName: "Nota", field: "descripcion", flex: 2 },
        { headerName: "Creado Por", field: "creado_por", valueFormatter: (e) => e.value?.toLowerCase(), flex: 2 },
        { headerName: "Dirigido A", field: "usuario_destino", valueFormatter: (e) => e.value?.toLowerCase(), flex: 2 },
        { headerName: "Acciones", cellRenderer: BotonesAccionesTabla, flex: 1 },
    ];

    return (
        <Container fluid>
            <Carousel className="black-carousel mt-3 mb-4">
                <Carousel.Item interval={6000}>
                    <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNiMmU5ZWQiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjZmZmZmZmIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+"
                        className="carousel-img"
                    />
                    <Carousel.Caption>
                        <h3 className="text-black display-4 display-md-3 display-sm-2 mb-4">
                            Bienvenido, <span className="fw-normal">{nombreUsuario}</span>.
                        </h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNiMmU5ZWQiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjZmZmZmZmIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+"
                        className="carousel-img"
                    />
                    <Carousel.Caption>
                        <h3 className="text-black display-5 display-md-4 display-sm-3">
                            {import.meta.env.VITE_APP_NOMBRE_APLICACION}
                        </h3>
                        <p className="text-muted fs-5 fst-italic d-none d-lg-block">
                            Se gestionan las solicitudes de consumos internos, incluyendo las solicitudes activas, rechazadas, registradas, agregadas con las
                            mercancías que se solicitaron y el consumo que se hicieron.
                        </p>
                        <p className="text-muted fs-5 fs-md-4 fs-sm-3 fst-italic d-lg-none">
                            Gestión de Solicitudes De Consumos Internos.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <h3 className="display-7 mt-5">Actividades</h3>
            <hr className="my-2 mb-3" style={{ borderTop: "2px solid #000" }} />
            <Row>
                {
                    actividades.map((actividad, index) => (
                        <Col key={index} sm={6} md={4} lg={4} xl={3}>
                            <div className="col d-flex justify-content-center">
                                <CartaActividad
                                    actividad={actividad}
                                />
                            </div>
                        </Col>
                    ))
                }
            </Row>
            <h3 className="display-7 mt-5">Notas</h3>
            <hr className="my-2 mb-3" style={{ borderTop: "2px solid #000" }} />
            <AGGridTabla
                colDefs={columnas}
                rowData={state.notas}
                rowSelection={rowSelection}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                altura={300}
            />
        </Container>
    );
}
