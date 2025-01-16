import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import AGGridTabla from '../../../ComponentesGlobales/AGGridTabla'
import { useSolicitudes } from '../Controles/useSolicitudes';
import * as Icon from 'react-bootstrap-icons'

export default function ListadoSolicitudes() {

    const { state, dispatch } = useSolicitudes()

    const BotonesAcciones = (parametros) => {
        return (
            <>
                <Button title="ver solicitud" size='sm' variant='outline-primary' onClick={() => ver(parametros)}>     <Icon.EyeFill />   </Button>
                <Button title="editar  solicitud" size='sm' variant='outline-primary' onClick={() => editar(parametros)}>  <Icon.PencilFill />  </Button>
                <Button title="eliminar solicitud" size='sm' variant='outline-primary' onClick={() => eliminar(parametros)}> <Icon.Trash2Fill />  </Button>
                <Button title="recuperar solicitud" size='sm' variant='outline-primary' onClick={() => recuperar(parametros)}> <Icon.ArrowCounterclockwise />  </Button>
            </>
        )
    }

    const [columnasSolicitudes] = useState([
        { field: "id_solicitud", flex: 1 },
        { field: "fecha_creado", flex: 1 },
        { field: "comentario", flex: 1 },
        { field: "creado_por", flex: 1 },
        { field: "modificado_por", flex: 1 },
        { field: "fecha_modificado", flex: 1 },
        { field: "total", flex: 1 },
        { field: "usuario_aprobador", flex: 1 },
        { field: "id_departamento", flex: 1 },
        { field: "usuario_despachador", flex: 1 },
        { field: "usuario_asistente_control", flex: 1 },
        { field: "usuario_asistente_contabilidad", flex: 1 },
        { field: "estado_solicitud", flex: 1 },
        { field: "acciones", cellRenderer: (e) => BotonesAcciones(e.value), flex: 1 },
    ]);

    const mostrarAgregarNuevaSolicitud = () => {
        dispatch({ type: 'mostrarModalAgregarSolicitud', payload: { mostrar: true } })
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div style={{ float: 'right' }}>
                        <Button size='md' variant='primary' className='mb-2' onClick={() => mostrarAgregarNuevaSolicitud()}><Icon.Plus />Nuevo</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AGGridTabla
                        rowData={state.solicitudes}
                        columnDefs={columnasSolicitudes}
                        altura={window.innerHeight - 250}
                    />
                </Col>
            </Row>
        </Container>
    )
}
