import React, { useState } from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import AGGridTabla from '../../../ComponentesGlobales/AGGridTabla';
import { formateadorDeFechaYHoraEspanol, formatoMoneda, obtenerRutaUrlActual } from '../../../FuncionesGlobales';
import { useSolicitudes } from '../Controles/useSolicitudes';
import { pagination, paginationPageSize, paginationPageSizeSelector, rowSelection } from '../Modelos/EstadoInicialSolicitudes';

export default function ListadoSolicitudes() {

    const { state, dispatch, eliminarSolicitud, recuperarSolicitudes } = useSolicitudes()
    const navegar = useNavigate();

    const BadgedEstadoSolicitud = (parametros) => {
        return (
            <Badge bg="primary">{parametros.data.estado_solicitud_descripcion ?? 'N/A'}</Badge>
        )
    }

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
        return (
            <>
                <Button title="Editar solicitud" size='sm' variant='outline-primary' onClick={() => navegar(`formulario?accion=editar`, { state: parametros.data })}> <Icon.PencilFill /> </Button>
                <Button title="Ver solicitud" size='sm' variant='outline-primary' onClick={() => navegar(`formulario?accion=ver`, { state: parametros.data })}> <Icon.EyeFill /> </Button>
            </>
        )
    }

    const [columnas] = useState([
        { headerName: "ID", field: "id_cabecera_solicitud", flex: 1, filter: true },
        { headerName: "No Documento", field: "no_documento", flex: 1, filter: true },
        { headerName: "Fecha", field: "fecha_creado", valueFormatter: (e) => formateadorDeFechaYHoraEspanol(e.value), flex: 1, filter: true },
        { headerName: "Creado Por", field: "creado_por", flex: 1, filter: true },
        { headerName: "Responsable", field: "usuario_responsable", flex: 1, filter: true },
        { headerName: "Despachador", field: "usuario_despacho", flex: 1, filter: true },
        { headerName: "Departamento", field: "departamento", flex: 1, filter: true },
        { headerName: "Estado Solicitud", field: "id_estado_solicitud", cellRenderer: BadgedEstadoSolicitud, flex: 1, filter: true },
        { headerName: "Clasificacion", field: "clasificacion", flex: 1, filter: true },
        { headerName: "Sucursal", field: "sucursal", flex: 1, filter: true },
        { headerName: "Total", field: "total", valueFormatter: (e) => formatoMoneda(e.value, 2), flex: 1, filter: true },
        { headerName: "Comentario", field: "comentario", flex: 1, filter: true },
        { headerName: "Acciones", field: "acciones", cellRenderer: (e) => BotonesAcciones(e), flex: 1, filter: true },
    ]);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div style={{ float: 'right' }}>
                        <Button hidden={obtenerIdEstadoSolicitudPorModulo() !== 'nueva'} size='md' variant='primary' className='mb-2' onClick={() => navegar('formulario', { state: null })}><Icon.Plus />Nuevo</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AGGridTabla
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
