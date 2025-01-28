import React from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import ListadoLinks from '../../ComponentesGlobales/ListadoLinks'
import { FormularioUsuarioContexto, FormularioUsuarioProveedor } from './Controles/FormularioUsuarioProveedor'
import DetalleUsuario from './Vistas/DetalleUsuario'
import FormularioUsuario from './Vistas/FormularioUsuario'

export default function UsuariosPrincipal() {

    return (
        <FormularioUsuarioProveedor>
            <Container fluid>
                <Row>
                    <Col>
                        <ListadoLinks contexto={FormularioUsuarioContexto} />
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <Accordion defaultActiveKey={['formulario', 'lineas']} alwaysOpen flush>
                            <Accordion.Item eventKey="formulario">
                                <Accordion.Header>Formulario</Accordion.Header>
                                <Accordion.Body>

                                    <FormularioUsuario />

                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="lineas">
                                <Accordion.Header>Lineas</Accordion.Header>
                                <Accordion.Body>

                                    <DetalleUsuario />

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </Col>
                </Row>
            </Container>
        </FormularioUsuarioProveedor>
    )

}
