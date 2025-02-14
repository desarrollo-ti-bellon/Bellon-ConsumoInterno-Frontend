import React, { useRef, useState } from 'react';
import { Badge, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import AGGridTabla from '../../../ComponentesGlobales/AGGridTabla';
import { useNotas } from '../../../ControlesGlobales/Notas/useNotas';
import { formateadorDeFechaYHoraEspanol, formatoMoneda, obtenerRutaUrlActual } from '../../../FuncionesGlobales';
import { useSolicitudes } from '../Controles/useSolicitudes';
import { pagination, paginationPageSize, paginationPageSizeSelector, rowSelection } from '../Modelos/EstadoInicialSolicitudes';

export default function ListadoSolicitudes() {

    const { state, dispatch, eliminarSolicitud, recuperarSolicitudes } = useSolicitudes()
    const navegar = useNavigate();
    const { dispatch: dispatchNotas } = useNotas();
    const gridRef = useRef(null);

    const obtenerReferenciaAgGrid = (ref) => {
        gridRef.current = ref.current;
    };

    const filtrarListado = (filtro) => {
        gridRef.current.api.setGridOption("quickFilterText", filtro);
    };


    const BadgedEstadoSolicitud = (parametros) => {
        return (
            <Badge bg="primary">{parametros.data.estado_solicitud_descripcion ?? 'N/A'}</Badge>
        )
    }

    const hacerNota = (parametros) => {
        console.log(parametros);
        dispatchNotas({ type: "mostrarNotas", payload: { mostrar: true } });
        dispatchNotas({ type: 'mostrarFormularioNotas', payload: { mostrarFormulario: true } });
        dispatchNotas({ type: "actualizarFormulario", payload: { id: 'no_documento', value: parametros.no_documento } });
        dispatchNotas({ type: "actualizarFormulario", payload: { id: 'id_documento', value: parametros.id_cabecera_solicitud } });
    };

    const obtenerIdEstadoSolicitudPorModulo = () => {
        const url = obtenerRutaUrlActual();
        let estadoSolicitudId = null;
        // Usar un objeto para mapear las rutas a los valores de estadoId
        const estadoMap = {
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS]: 'nueva',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES]: 'pendiente',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS]: 'aprobada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS]: 'rechazada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS]: 'entregada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS]: 'confirmada',
            [import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS]: 'terminada',
        };

        // Si la URL no coincide con ninguna, se asigna null
        return estadoSolicitudId = estadoMap[url] || null;
    }

    const BotonesAcciones = (parametros) => {

        const ruta = obtenerRutaUrlActual();
        const rutas = [
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_NUEVAS_FORMULARIO,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_PENDIENTES_FORMULARIO,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_APROBADAS_FORMULARIO,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_RECHAZADAS_FORMULARIO,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_CONFIRMADAS_FORMULARIO,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_ENTREGADAS_FORMULARIO,
            import.meta.env.VITE_APP_BELLON_SOLICITUDES_TERMINADAS_FORMULARIO,
        ];

        const condicion = rutas.includes(ruta);
        return (
            <>
                {!condicion && (<Button title="Editar solicitud" size='sm' variant='outline-primary' style={{ marginLeft: 5 }} onClick={() => navegar(`formulario?accion=editar`, { state: parametros.data })}> <Icon.PencilFill /> </Button>)}
                <Button title="Ver solicitud" size='sm' variant='outline-primary' style={{ marginLeft: 5 }} onClick={() => navegar(`formulario?accion=ver`, { state: parametros.data })}> <Icon.EyeFill /> </Button>
                <Button title="Poner nota" size='sm' variant="outline-primary" style={{ marginLeft: 5 }} onClick={() => hacerNota(parametros.data)} > {" "} <Icon.JournalBookmarkFill size={15} />{" "} </Button>
            </>
        )
    }

    const [columnas] = useState([
        { headerName: "ID", field: "id_cabecera_solicitud", filter: true, flex: 1, },
        { headerName: "Fecha", field: "fecha_creado", valueFormatter: (e) => formateadorDeFechaYHoraEspanol(e.value), filter: true, flex: 1 },
        { headerName: "No Documento", field: "no_documento", filter: true, flex: 1 },
        { headerName: "Creado Por", field: "creado_por", filter: true, flex: 1 },
        { headerName: "Responsable", field: "usuario_responsable", filter: true, flex: 1 },
        { headerName: "Despachador", field: "usuario_despacho", filter: true, flex: 1 },
        { headerName: "Departamento", field: "departamento", filter: true, flex: 1 },
        { headerName: "Estado Solicitud", field: "id_estado_solicitud", cellRenderer: BadgedEstadoSolicitud, filter: true, flex: 1 },
        { headerName: "Clasificacion", field: "clasificacion", filter: true, flex: 1 },
        { headerName: "Sucursal", field: "sucursal", filter: true, flex: 1 },
        { headerName: "Total", field: "total", valueFormatter: (e) => formatoMoneda(e.value, 2), filter: true, flex: 1 },
        { headerName: "Comentario", field: "comentario", filter: true, flex: 1 },
        { headerName: "Acciones", field: "acciones", cellRenderer: (e) => BotonesAcciones(e), filter: true, flex: 1 },
    ]);

    return (
        <Container fluid>
            <Row>
                <Col
                    xs={{ span: 12, order: 2 }}
                    sm={{ span: 12, order: 2 }}
                    md={{ span: 6, order: 1 }}
                    xl={{ span: 5, order: 1 }}
                    className="text-start mt-2 mb-2"
                >
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            <Icon.Search />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Filtrar..."
                            onChange={(e) => filtrarListado(e.target.value)}
                            autoComplete="off"
                        />
                    </InputGroup>
                </Col>
                <Col
                    xs={{ span: 12, order: 1 }}
                    sm={{ span: 12, order: 1 }}
                    md={{ span: 6, order: 2 }}
                    xl={{ span: 7, order: 2 }}
                    className="text-end"
                >
                    <div style={{ float: 'right' }}>
                        <Button hidden={obtenerIdEstadoSolicitudPorModulo() !== 'nueva'} size='md' variant='primary' className='mb-2' onClick={() => navegar('formulario', { state: null })}><Icon.Plus />Nuevo</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AGGridTabla
                        obtenerReferenciaAgGrid={obtenerReferenciaAgGrid}
                        colDefs={columnas}
                        rowData={state.listadoSolicitudes}
                        rowSelection={rowSelection}
                        pagination={pagination}
                        paginationPageSize={paginationPageSize}
                        paginationPageSizeSelector={paginationPageSizeSelector}
                        altura={window.innerHeight - 250}
                    />
                </Col>
            </Row>
        </Container>
    )
}
