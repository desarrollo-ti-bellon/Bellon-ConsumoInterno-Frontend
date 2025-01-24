import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ListadoLinks from '../../ComponentesGlobales/ListadoLinks'
import FormularioClasificacion from './Vistas/FormularioClasificacion'
import DetalleClasificacion from './Vistas/DetalleClasificacion'
import { FormularioClasificacionProveedor } from './Controles/FormularioClasificacionContexto'

export default function ClasificacionesPrincipal() {

    return (
        <FormularioClasificacionProveedor>
            <Container>
                <Row>
                    <Col>
                        <ListadoLinks />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormularioClasificacion />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DetalleClasificacion />
                    </Col>
                </Row>
            </Container>
        </FormularioClasificacionProveedor>
    )

}
