import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useFormulario } from '../Controles/useFormulario';
import AGGridTabla from '../../../../ComponentesGlobales/AGGridTabla';
import * as Icon from 'react-bootstrap-icons'

export default function DetalleSolicitudes() {

    const { state, dispatch } = useFormulario()
    const [columnasSolicitudes] = useState([
        { field: "id_linea_solicitud_activa", flex: 2 },
        { field: "cabecera_solicitudes_activas_id", flex: 1 },
        { field: "id_producto", flex: 1 },
        { field: "descripcion", flex: 1 },
        { field: "precio", flex: 2 },
        { field: "cantidad", flex: 1 },
    ]);

    const mostrarAgregarProductos = () => {
        dispatch({ type: 'mostrarModalAgregarProductos', payload: { mostrar: true } })
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div style={{ float: 'right', marginBottom: 5 }}>
                        <Button size='md' variant='primary' onClick={() => mostrarAgregarProductos()}><Icon.Plus />Agregar Productos</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AGGridTabla
                        rowData={state.lineas}
                        columnDefs={columnasSolicitudes}
                    />
                </Col>
            </Row>
        </Container>
    )
}
