import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ListadoLinks from '../../../ComponentesGlobales/ListadoLinks'
import FormularioSolicitudes from './Vistas/FormularioSolicitudes'
import DetalleSolicitudes from './Vistas/DetalleSolicitudes'
import { FormularioProveedor } from './Controles/FormularioContexto'
import ModalProductos from './Modales/ModalProductos'

export default function FormularioSolicitudesPrincipal() {
    return (
        <FormularioProveedor>
            <Container fluid>
                <Row>
                    <Col>
                        <ListadoLinks />
                        <ModalProductos />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormularioSolicitudes />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DetalleSolicitudes />
                    </Col>
                </Row>
            </Container>
        </FormularioProveedor>
    )
}
