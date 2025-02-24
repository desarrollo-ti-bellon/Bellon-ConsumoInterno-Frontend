import React, { useEffect, useRef, useState } from 'react';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import AGGridTabla from '../../../ComponentesGlobales/AGGridTabla';
import { formateadorDeFechaYHoraEspanol, formatoMoneda, obtenerRutaUrlActual, verDocumento } from '../../../FuncionesGlobales';
import { useHistorialMovmientosSolicitudes } from '../Controles/useHistorialMovmientosSolicitudes';
import { pagination, paginationPageSize, paginationPageSizeSelector, rowSelection } from '../Modelos/EstadoInicialHistorialMovimientosSolicitudes';
import * as Icon from 'react-bootstrap-icons';

export default function HistorialMovimientosSolicitud() {

    const { state, dispatch } = useHistorialMovmientosSolicitudes();
    const [noDocumento, setNoDocumento] = useState('');
    const gridRef = useRef(null);

    const obtenerReferenciaAgGrid = (ref) => {
        gridRef.current = ref.current;
    }

    const BadgedEstadoSolicitud = (parametros) => {
        return (
            <Badge bg="primary">{parametros.data.estado_solicitud_descripcion ?? 'N/A'}</Badge>
        )
    }

    const hypervinculoDocumento = (e) => {

        const url = import.meta.env.VITE_APP_BELLON_HISTORIAL_MOVIMIENTOS_SOLICITUDES_HISTORICO;
        const urlActual = obtenerRutaUrlActual();

        if (url === urlActual) {
            return (
                <span>
                    {e.value}
                </span>
            );
        }

        const fila = e.data;
        const no_documento = fila.no_documento;
        let titulo = `Ver solicitud ${no_documento}`
        return (
            <a href="#" title={titulo} onClick={() => verDocumento(no_documento, fila)}> {e.value}</a>
        )
    }

    const [columnas, setColumnas] = useState([
        { headerName: "ID", field: "indice", filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "No Documento", field: "no_documento", cellRenderer: hypervinculoDocumento, filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Fecha Movimiento", field: "fecha_creado", valueFormatter: (e) => formateadorDeFechaYHoraEspanol(e.value), filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Creado Por", field: "nombre_creado_por", filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Responsable", field: "usuario_responsable", filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Despachador", field: "usuario_despacho", filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Departamento", field: "departamento", filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Estado Solicitud", field: "id_estado_solicitud", cellRenderer: BadgedEstadoSolicitud, filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Clasificacion", field: "clasificacion", filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Sucursal", field: "sucursal", filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Total", field: "total", valueFormatter: (e) => formatoMoneda(e.value, 2), filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
        { headerName: "Comentario", field: "comentario", filter: true, flex: 1, wrapHeaderText: true, autoHeaderHeight: true, minWidth: 100 },
    ]);

    useEffect(() => {
        setNoDocumento(state.historialMovimientosSolicitudes[0]?.no_documento ?? '')
    }, [state])

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h2 className='my-3'>Historial Movimientos Estado Solicitud  <Icon.ArrowRight /> <a href="#" className="primary" style={{ color: "#00b7c3" }} onClick={() => verDocumento(noDocumento, state.historialMovimientosSolicitudes[0])}>{noDocumento}</a></h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* <LineaTiempo no_documento={state.historialMovimientosSolicitudes[0]?.no_documento} lineas={state.historialMovimientosSolicitudes} /> */}
                    <AGGridTabla
                        obtenerReferenciaAgGrid={obtenerReferenciaAgGrid}
                        colDefs={columnas}
                        rowData={state.historialMovimientosSolicitudes}
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
