import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useFormulario } from '../Controles/useFormulario';
import AGGridTabla from '../../../../ComponentesGlobales/AGGridTabla';


export default function ModalProductos() {

    const {state,dispatch} = useFormulario()

    const cerrarModal = () => {
        dispatch({ type: 'mostrarModalAgregarProductos', payload: { mostrar: false } })
    }

    const [columnasSolicitudes] = useState([
        { field: "id_producto", flex: 2 },
        { field: "no_producto", flex: 1 },
        { field: "descripcion", flex: 1 },
        { field: "cantidad", flex: 1 },
        { field: "costo", flex: 2 }
    ]);

    return (
        <Modal
            show={state.modalAgregarProductos}
            onHide={cerrarModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Productos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AGGridTabla
                    rowData={state.listadoProductos}
                    columnDefs={columnasSolicitudes}
                />
            </Modal.Body>
        </Modal>
    )
}
