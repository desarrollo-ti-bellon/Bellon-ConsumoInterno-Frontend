import React from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import ListadoLinks from '../../ComponentesGlobales/ListadoLinks'
import FormularioClasificacion from './Vistas/FormularioClasificacion'
import DetalleClasificacion from './Vistas/DetalleClasificacion'
import { FormularioClasificacionContexto, FormularioClasificacionProveedor } from './Controles/FormularioClasificacionContexto'
import UltimaActualizacionDeRegistros from '../../ComponentesGlobales/UltimaActualizacionDeRegistros'
import ModalAlerta from '../../ComponentesGlobales/ModalAlerta'

export default function ClasificacionesPrincipal() {

    return (
        <FormularioClasificacionProveedor>
            <Container fluid>
                <Row>
                    <Col>
                        <ListadoLinks />
                        <ModalAlerta />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <UltimaActualizacionDeRegistros contexto={FormularioClasificacionContexto} />
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
