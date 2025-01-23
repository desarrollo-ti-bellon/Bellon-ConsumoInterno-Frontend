import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSolicitudes } from '../Controles/useSolicitudes';
import FormularioSolicitudesPrincipal from '../Formulario/FormularioSolicitudesPrincipal';
import { useEffect } from 'react';

export default function ModalNuevo() {

    const { state, dispatch } = useSolicitudes();

    useEffect(() => {
        if (!state.modalAgregarSolicitudes) {
            return;
        }
    }, [])

    const cerrarModal = () => {
        dispatch({ type: 'mostrarModalAgregarSolicitud', payload: { mostrar: false } })
    }

    return (
        <Modal
            show={state.modalAgregarSolicitudes}
            onHide={cerrarModal}
            className='modal-2xl'
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
