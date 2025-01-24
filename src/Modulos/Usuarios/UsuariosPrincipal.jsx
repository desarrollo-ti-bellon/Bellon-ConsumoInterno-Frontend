import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ListadoLinks from '../../ComponentesGlobales/ListadoLinks'
import { FormularioUsuarioProveedor } from './Controles/FormularioUsuarioProveedor'
import FormularioUsuario from './Vistas/FormularioUsuario'
import DetalleUsuario from './Vistas/DetalleUsuario'

export default function UsuariosPrincipal() {

    return (
        <FormularioUsuarioProveedor>
            <Container>
                <Row>
                    <Col>
                        <ListadoLinks />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormularioUsuario />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DetalleUsuario />
                    </Col>
                </Row>
            </Container>
        </FormularioUsuarioProveedor>
    )

}
