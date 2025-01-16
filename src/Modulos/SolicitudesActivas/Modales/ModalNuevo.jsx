import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSolicitudes } from '../Controles/useSolicitudes';
import FormularioSolicitudesPrincipal from '../Formulario/FormularioSolicitudesPrincipal';

export default function ModalNuevo() {

    const { state, dispatch } = useSolicitudes();

    const cerrarModal = () => {
        dispatch({ type: 'mostrarModalAgregarSolicitud', payload: { mostrar: false } })
    }

    return (
        <Modal
            show={state.modalAgregarSolcitudes}
            onHide={cerrarModal}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Solicitud
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormularioSolicitudesPrincipal />
            </Modal.Body>
        </Modal>
    )
}
