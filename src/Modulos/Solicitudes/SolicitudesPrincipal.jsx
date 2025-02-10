import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ListadoLinks from '../../ComponentesGlobales/ListadoLinks'
import { SolicitudesProveedor } from './Controles/SolicitudesContexto'
import ModalNuevo from './Modales/ModalNuevo'
import ListadoSolicitudes from './Vistas/ListadoSolicitudes'

export default function SolicitudesPrincipal() {
    return (
        <SolicitudesProveedor>
            <Container fluid>
                <Row>
                    <Col>
                        <ListadoLinks />
                        <ModalNuevo />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListadoSolicitudes />
                    </Col>
                </Row>
            </Container>
        </SolicitudesProveedor>
    )
}
