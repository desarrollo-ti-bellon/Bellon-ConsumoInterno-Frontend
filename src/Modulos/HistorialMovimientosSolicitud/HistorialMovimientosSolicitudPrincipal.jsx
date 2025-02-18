import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ListadoLinks from '../../ComponentesGlobales/ListadoLinks'
import HistorialMovimientosSolicitud from './Vistas/HistorialMovimientosSolicitud'
import { HistorialMovimientosSolicitudesProveedor } from './Controles/HistorialMovimientosSolicitudesProveedor'

export default function HistorialMovimientosSolicitudPrincipal() {
    return (
        <HistorialMovimientosSolicitudesProveedor>
            <Container fluid>
                <Row>
                    <Col>
                        <ListadoLinks />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <HistorialMovimientosSolicitud />
                    </Col>
                </Row>
            </Container>
        </HistorialMovimientosSolicitudesProveedor>
    )
}
