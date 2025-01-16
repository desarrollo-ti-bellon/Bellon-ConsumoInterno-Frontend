import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useModalErrorRedireccion } from '../ControlesGlobales/ModalErrorRedireccion/useModalErrorRedireccion';

export default function ModalErrorRedireccion() {

    const { state, dispatch } = useModalErrorRedireccion()

    return (
        <Modal size='md' show={state.mostrar} backdrop="static" keyboard={false} onHide={() => dispatch({ type: 'limpiarModalErrorRedireccion' })} centered>

            <Modal.Header>
                <Modal.Title>Aviso sobre documento actual</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: 10 }}><Icon.InfoCircle size={25} /></div>
                    <div ><h5>{state.mensaje}</h5></div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Row>
                    <Col>
                        <Button size='xl' variant="primary" onClick={() => {
                            state.funcionEjecutar();
                            dispatch({ type: 'limpiarModalErrorRedireccion' })
                        }}>Aceptar</Button>
                    </Col>
                </Row>
            </Modal.Footer>

        </Modal>
    )
}
