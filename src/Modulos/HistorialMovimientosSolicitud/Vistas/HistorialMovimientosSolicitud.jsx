import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import LineaTiempo from '../../../ComponentesGlobales/LineaTiempo'
import { useHistorialMovmientosSolicitudes } from '../Controles/useHistorialMovmientosSolicitudes'

export default function HistorialMovimientosSolicitud() {

    const { state, dispatch } = useHistorialMovmientosSolicitudes();

    return (
        <Container fluid>
            <Row>
                <Col>
                    <LineaTiempo no_documento={state.historialMovimientosSolicitudes[0]?.no_documento} lineas={state.historialMovimientosSolicitudes} />
                </Col>
            </Row>
        </Container>
    )

}
