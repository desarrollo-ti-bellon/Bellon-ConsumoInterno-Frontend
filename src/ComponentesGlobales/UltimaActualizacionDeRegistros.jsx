import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap';

export default function UltimaActualizacionDeRegistros({ contexto }) {

    if (!contexto) {
        return;
    }

    const { state } = useContext(contexto);
    return (
        <Container fluid>
            <Row>
                <Col>
                    <div style={{ float: 'right' }} className='mt-2 mb-2 fs-7 text-capitalize text-black fw-normal'>
                        última Actualización: <span className={state.ultimaActualizacionDeRegistro === 'ninguna' ? 'text-danger' : 'text-primary'}>{state.ultimaActualizacionDeRegistro}</span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
