import React from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useModalConfirmacion } from '../ControlesGlobales/ModalConfirmacion/useModalConfirmacion';

export default function ModalConfirmacion() {

    const { state, dispatch, confirmarModalFuncion } = useModalConfirmacion()

    return (
        <Modal size='md' show={state.mostrar} onHide={() => dispatch({ type: 'limpiarModalConfirmacion' })} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{ display: 'flex' }}>
                    <div style={{ marginRight: 10 }}><Icon.InfoCircle size={25} /></div>
                    <div dangerouslySetInnerHTML={{ __html: '<h5>' + state.mensaje + '</h5>' }}></div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Row>
                    <Col lg={6} md={6} sm={6}>
                        <Button className='w-100' variant="secondary" onClick={() => {
                            confirmarModalFuncion(false);
                            dispatch({ type: 'limpiarModalConfirmacion' })
                        }} >Cancelar</Button>
                    </Col>
                    <Col lg={6} md={6} sm={6} >
                        <Button className='w-100' variant="primary" onClick={() => {
                            confirmarModalFuncion(true);
                            dispatch({ type: 'limpiarModalConfirmacion' })
                        }} >Aceptar</Button>
                    </Col>
                </Row>
            </Modal.Footer>

        </Modal>
    )
}
