import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useModalAlerta } from '../ControlesGlobales/ModalAlerta/useModalAlerta';

export default function ModalAlerta() {

    const { state, dispatch } = useModalAlerta();
    function cerrarModal() {
        dispatch({ type: 'limpiarModalAlerta' })
    }

    return (
        <Modal
            size={state.tamano}
            show={state.mostrar}
            onHide={() => cerrarModal()}
            aria-labelledby="example-modal-sizes-title-sm"
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Alertas!
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div role="alert" dangerouslySetInnerHTML={{ __html: state.mensaje }} />
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => cerrarModal()} variant="primary">Aceptar</Button>
            </Modal.Footer>

        </Modal>
    )
}
