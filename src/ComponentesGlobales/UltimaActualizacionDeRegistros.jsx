import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

export default function UltimaActualizacionDeRegistros({ contexto }) {

    if (!contexto) {
        return;
    }

    const [params] = useSearchParams();
    const { state } = useContext(contexto);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div style={{ float: 'right', display: (params.get('modo') === 'vista' ? 'none' : 'block') }} className='mt-2 mb-2 fs-7 text-capitalize text-black fw-normal'>
                        última Actualización: <span className={state.ultimaActualizacionDeRegistro === 'ninguna' ? 'text-danger' : 'text-primary'}>{state.ultimaActualizacionDeRegistro}</span>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
