import React from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import BarraAcciones from '../../ComponentesGlobales/BarraAcciones'
import ListadoLinks from '../../ComponentesGlobales/ListadoLinks'
import { FormularioClasificacionContexto, FormularioClasificacionProveedor } from './Controles/FormularioClasificacionContexto'
import DetalleClasificacion from './Vistas/DetalleClasificacion'
import FormularioClasificacion from './Vistas/FormularioClasificacion'

export default function ClasificacionesPrincipal() {

    return (
        <FormularioClasificacionProveedor>
            <Container fluid>
                <Row>
                    <Col>
                        <ListadoLinks />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BarraAcciones contexto={FormularioClasificacionContexto} />
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <Accordion defaultActiveKey={['formulario', 'lineas']} alwaysOpen flush>
                            <Accordion.Item eventKey="formulario">
                                <Accordion.Header>Formulario</Accordion.Header>
                                <Accordion.Body>

                                    <FormularioClasificacion />

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="lineas">
                                <Accordion.Header>Lineas</Accordion.Header>
                                <Accordion.Body>

                                    <DetalleClasificacion />

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </Col>
                </Row>
            </Container>
        </FormularioClasificacionProveedor>
    )

}
