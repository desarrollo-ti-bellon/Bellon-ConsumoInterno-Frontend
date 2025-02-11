import React from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import CambiarAccionFormulario from '../../../ComponentesGlobales/CambiarAccionFormulario'
import ListadoLinks from '../../../ComponentesGlobales/ListadoLinks'
import UltimaActualizacionDeRegistros from '../../../ComponentesGlobales/UltimaActualizacionDeRegistros'
import { FormularioContexto, FormularioProveedor } from './Controles/FormularioContexto'
import ModalProductos from './Modales/ModalProductos'
import BotonesAcciones from './Vistas/BotonesAcciones'
import DetalleSolicitudes from './Vistas/DetalleSolicitudes'
import FormularioSolicitudes from './Vistas/FormularioSolicitudes'

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
                        <CambiarAccionFormulario />
                        <BotonesAcciones />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <hr />
                        <UltimaActualizacionDeRegistros contexto={FormularioContexto} />
                    </Col>
                </Row>
                <Row>
                    <Accordion defaultActiveKey={['formulario', 'lineas']} alwaysOpen flush>
                        <Accordion.Item eventKey="formulario">
                            <Accordion.Header>Formulario</Accordion.Header>
                            <Accordion.Body>

                                <FormularioSolicitudes />

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="lineas">
                            <Accordion.Header>Lineas</Accordion.Header>
                            <Accordion.Body>

                                <DetalleSolicitudes />

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Container>
        </FormularioProveedor>
    )
}
